import { Context } from './../types';
import { handleDuplicateError } from './../validation/baseValidation';
import { handleRegisterErrors } from './../validation/userValidation';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entity/User';
import {
	LoginUserInput,
	RegisterUserInput,
	UpdateProfileInputType,
	UserResponse,
} from '../typeDefs/user';
import { handleLoginErrors } from '../validation/userValidation';
import env from '../config/env';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { createWriteStream } from 'fs';

@Resolver()
export class UserResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: Context): Promise<User | undefined> {
		if (req.session.userId) {
			return User.findOne({ id: req.session.userId });
		}

		return undefined;
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg('details') { email, password }: LoginUserInput,
		@Ctx() { req }: Context
	): Promise<UserResponse> {
		const user = await User.findOne({
			where: { email },
		});

		const errors = await handleLoginErrors(user!, { email, password });

		if (errors.length) return { errors };

		req.session.userId = user!.id;

		return { user };
	}

	@Mutation(() => UserResponse)
	async register(
		@Arg('details') details: RegisterUserInput,
		@Ctx() { req }: Context
	): Promise<UserResponse> {
		try {
			const { name, email, password } = details;

			const errors = handleRegisterErrors(details);

			if (errors.length) return { errors };

			const user = User.create({
				name,
				email,
				password,
			});

			await user.save();

			req.session.userId = user.id;

			return { user };
		} catch (err) {
			let error = handleDuplicateError(err);

			return error;
		}
	}

	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: Context): boolean {
		req.session.destroy((err) => {
			if (err) {
				return false;
			}
			return null;
		});

		res.clearCookie(env.COOKIE_NAME);
		return true;
	}

	@Mutation(() => Boolean)
	async updateProfile(
		@Arg('details') { name, email, photo }: UpdateProfileInputType,
		@Ctx() { req }: Context
	): Promise<Boolean> {
		let filename: string | null = null;
		const update: any = { name, email };
		const photoDetails = await photo;

		if (photoDetails) {
			const { createReadStream } = photoDetails;
			filename = `${uuidv4()}.jpg`;

			new Promise(async (resolve, reject) =>
				createReadStream().pipe(
					createWriteStream(
						path.resolve(`${__dirname}/../../uploads/${filename}`)
					)
						.on('finish', () => resolve(true))
						.on('error', () => reject)
				)
			);

			update.photo = filename;
		}

		await User.update({ id: req.session.userId }, update);

		return true;
	}
}
