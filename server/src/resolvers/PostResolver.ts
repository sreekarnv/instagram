import {
	Arg,
	Ctx,
	FieldResolver,
	Int,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { CreatePostInputType } from '../typeDefs/post';
import { Context } from '../types';
import { Likes } from '../entity/Likes';
import { v4 as uuidv4 } from 'uuid';
import { getConnection } from 'typeorm';
import { createWriteStream } from 'fs';
import path from 'path';

@Resolver(() => Post)
export class PostResolver {
	@FieldResolver(() => Boolean)
	async liked(
		@Root() post: Post,
		@Ctx() { req, likeLoader }: Context
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
		@Ctx() { numLikesLoader }: Context
	): Promise<number> {
		const likes = await numLikesLoader.load({
			postId: post.id,
		});

		return likes?.length || 0;
	}

	@FieldResolver(() => User)
	async user(
		@Root() post: Post,
		@Ctx() { userLoader }: Context
	): Promise<User> {
		let user = await userLoader.load(post.userId);

		return user;
	}

	@Query(() => [Post])
	async getAllPosts(
		@Arg('limit', () => Int) givenLimit: number,
		@Arg('cursor', () => Date, { nullable: true }) cursor: number
	): Promise<Post[]> {
		const limit = Math.min(givenLimit, 20);
		let query = `
			ORDER BY "createdAt" DESC
		 	LIMIT $1
			`;

		let params = [limit];
		if (cursor) {
			query = `
				WHERE "createdAt" < $1
				ORDER BY "createdAt" DESC
				LIMIT $2
			`;
			params = [cursor, limit];
		}

		return await Post.query(
			`
			SELECT * FROM "post"
			${query}
		`,
			[...params]
		);
	}

	@Query(() => [Post])
	async getUserPosts(
		@Ctx() { req }: Context,
		@Arg('limit', () => Int) givenLimit: number,
		@Arg('cursor', () => Date, { nullable: true }) cursor: number
	) {
		const limit = Math.min(givenLimit, 20);
		let query = `
			WHERE "userId" = $1
			ORDER BY "createdAt" DESC
		 	LIMIT $2
			`;

		let params = [req.session.userId, limit];
		if (cursor) {
			query = `
				WHERE "createdAt" < $1 AND "userId" = $2
				ORDER BY "createdAt" DESC
				LIMIT $3
			`;
			params = [cursor, req.session.userId, limit];
		}

		return await Post.query(
			`
			SELECT * FROM "post"
			${query}
		`,
			[...params]
		);
	}

	@Mutation(() => Post)
	async createPost(
		@Ctx() { req }: Context,
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
				photo: filename,
				userId: req.session.userId,
			}).save();

			return post;
		} catch (err) {
			return err;
		}
	}

	@Mutation(() => Boolean)
	async deletePost(@Arg('id') id: string) {
		try {
			await Post.delete({
				id,
			});

			return true;
		} catch (err) {
			return err;
		}
	}

	@Query(() => Post, { nullable: true })
	async getPost(@Arg('id') id: string, @Ctx() { redis }: Context) {
		let postData = await redis.get(`post-${id}`);
		let post;

		if (postData) {
			post = JSON.parse(postData);
			post.createdAt = new Date(post.createdAt);
			post.updatedAt = new Date(post.updatedAt);
		}

		if (!post) {
			post = await Post.findOne({ where: { id } });
			await redis.set(`post-${id}`, JSON.stringify(post));
		}

		return post;
	}

	@Mutation(() => Boolean)
	async likePost(@Ctx() { req }: Context, @Arg('postId') postId: string) {
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
