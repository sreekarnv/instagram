import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	Int,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { posts } from '../data/posts';
import { Likes } from '../entity/like.entity';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import { CreatePostInputType, PostsResponseType } from '../typeDefs/post.types';
import { ExpressContext } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { getConnection } from 'typeorm';

@Resolver(() => Post)
export class PostResolver {
	@FieldResolver(() => Boolean)
	async liked(
		@Root() post: Post,
		@Ctx() { req, likeLoader }: ExpressContext
	): Promise<boolean> {
		const like = await likeLoader.load({
			postId: post.id,
			userId: req.session.userId!,
		});

		return !!like;
	}

	@FieldResolver(() => Number)
	async numLikes(
		@Root() post: Post,
		@Ctx() { numLikesLoader }: ExpressContext
	): Promise<number> {
		const likes = await numLikesLoader.load({
			postId: post.id,
		});

		return likes?.length || 0;
	}

	@FieldResolver(() => User)
	async user(
		@Root() post: Post,
		@Ctx() { userLoader }: ExpressContext
	): Promise<User> {
		let user = await userLoader.load(post.userId);

		return user!;
	}

	@Query(() => PostsResponseType)
	async getAllPosts(
		@Arg('limit', () => Int, { nullable: true }) givenLimit?: number,
		@Arg('cursor', () => Date, { nullable: true }) cursor?: Date
	): Promise<PostsResponseType> {
		const limit = givenLimit ? Math.min(givenLimit, 20) : 20;

		let query = `
			ORDER BY "createdAt" DESC
		 	LIMIT $1
			`;

		let params: any = [limit + 1];

		if (cursor) {
			query = `
				WHERE "createdAt" < $1
				ORDER BY "createdAt" DESC
				LIMIT $2
			`;
			params = [cursor, limit + 1];
		}

		const postsQuery = await Post.query(
			`
			SELECT * FROM "post"
			${query}
		`,
			[...params]
		);

		const hasMore = postsQuery.length > limit;
		const posts = postsQuery.slice(0, limit);

		return {
			count: posts.length,
			hasMore,
			posts,
		};
	}

	@Mutation(() => Boolean)
	async insertPosts() {
		const newPosts = posts.map((p, i) => {
			const photoSize = 200 + i;
			return {
				photo: `https://source.unsplash.com/random/${photoSize}x${photoSize}`,
				...p,
			};
		});

		await Post.insert([...newPosts]);
		return true;
	}

	@Mutation(() => Boolean)
	async deleteAllPosts() {
		await Post.delete({});
		return true;
	}

	@Authorized()
	@Mutation(() => Post)
	async createPost(
		@Arg('input') { description, photo }: CreatePostInputType,
		@Ctx() { req }: ExpressContext
	) {
		const userId = req.session.userId;
		const post = Post.create({
			description,
			photo,
			userId,
		});
		await post.save();
		return post;
	}

	@Authorized()
	@Mutation(() => Boolean)
	async deletePost(@Arg('id') id: string, @Ctx() { req }: ExpressContext) {
		try {
			await Post.delete({
				id,
				userId: req.session.userId,
			});

			return true;
		} catch (err) {
			return err;
		}
	}

	@Authorized()
	@Mutation(() => Boolean)
	async likePost(
		@Ctx() { req }: ExpressContext,
		@Arg('postId') postId: string
	) {
		getConnection().transaction(async (t) => {
			let likedPostArr = await t.query(
				`
				SELECT * FROM "likes"
				WHERE "userId" = $1 AND "postId" = $2 
				LIMIT 1	
			`,
				[req.session.userId, postId]
			);

			let likedPost = likedPostArr[0];

			if (!likedPost) {
				likedPost = await t.query(
					`
					INSERT INTO "likes" (id, "userId", "postId")
					values ($1, $2, $3)
				`,
					[uuidv4(), req.session.userId, postId]
				);
			} else {
				Likes.query(
					`
					DELETE FROM "likes"
					WHERE "userId" = $1 AND "postId" = $2 
				`,
					[req.session.userId, postId]
				);
			}
		});

		return true;
	}
}
