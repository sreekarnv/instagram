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
import { data } from '../data';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { CreatePostInputType } from '../typeDefs/post';
import { Context } from '../types';
import { v4 as uuidv4 } from 'uuid';

@Resolver(() => Post)
export class PostResolver {
	@FieldResolver(() => User)
	async user(@Root() post: Post, @Ctx() { userLoader, redis }: Context) {
		let userData = (await redis.get(`user-${post.userId}`)) as any;
		let user;

		if (userData) {
			user = JSON.parse(userData);
		}

		if (!user) {
			let user = await userLoader.load(post.userId);
			await redis.set(`user-${post.userId}`, JSON.stringify(user));
		}

		return user;
	}

	@Query(() => [Post])
	async getAllPosts(
		@Arg('limit', () => Int) givenLimit: number,
		@Arg('cursor', () => Date, { nullable: true }) cursor: number
	): Promise<Post[]> {
		const limit = Math.min(givenLimit, 10);
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

	@Mutation(() => Post)
	async createPost(
		@Ctx() { req, redis }: Context,
		@Arg('details') { description, photo }: CreatePostInputType
	) {
		try {
			const post = await Post.create({
				description,
				photo,
				userId: req.session.userId,
			}).save();

			redis.set(`post-${post.id}`, JSON.stringify(post));

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

	@Query(() => Boolean)
	async insertPost() {
		const iData = data.map((e) => {
			return {
				...e,
				id: uuidv4(),
			};
		});

		await Post.insert(iData);
		return true;
	}
}
