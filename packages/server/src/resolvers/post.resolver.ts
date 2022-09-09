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
import { createWriteStream } from 'fs';
import { Likes } from '../entity/like.entity';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import { CreatePostInputType, PostsResponseType } from '../typeDefs/post.types';
import { ExpressContext } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { getConnection } from 'typeorm';
import path from 'path';
import { posts } from '../data/posts';
// import { users } from '../data/users';

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

	@Mutation(() => Boolean)
	async insertData() {
		// await User.insert(users);
		await Post.insert(posts);

		return true;
	}

	@Mutation(() => Post)
	async createPost(
		@Ctx() { req }: ExpressContext,
		@Arg('details') { description, photo }: CreatePostInputType
	) {
		const { createReadStream } = await photo;
		const filename = `${uuidv4()}.jpg`;
		new Promise(async (resolve, reject) =>
			createReadStream().pipe(
				createWriteStream(
					path.resolve(`${__dirname}/../../uploads/${filename}`)
				)
					.on('finish', () => resolve(true))
					.on('error', () => reject)
			)
		);

		try {
			const post = await Post.create({
				description,
				photo: `/uploads/${filename}`,
				userId: req.session.userId,
			}).save();

			return post;
		} catch (err) {
			return err;
		}
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

	@Query(() => Post)
	async getPost(@Arg('postId') postId: string) {
		const post = await Post.findOne({ where: { id: postId } });

		if (!post) {
			throw new Error('couldnt find your post');
		}

		return post;
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
