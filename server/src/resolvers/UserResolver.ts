import { Context } from './../types';
import { handleDuplicateError } from './../validation/baseValidation';
import { handleRegisterErrors } from './../validation/userValidation';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entity/User';
import {
	LoginUserInput,
	RegisterUserInput,
	UserResponse,
} from '../typeDefs/user';
import { handleLoginErrors } from '../validation/userValidation';
import env from '../config/env';

@Resolver()
export class UserResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: Context): Promise<User | undefined> {
		return User.findOne({ id: req.session.userId });
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
	async logout(@Ctx() { req, res }: Context): Promise<boolean> {
		return new Promise((resolve) =>
			req.session.destroy((err) => {
				res.clearCookie(env.COOKIE_NAME);
				if (err) {
					console.log(err);
					resolve(false);
					return;
				}

				resolve(true);
			})
		);
	}
}
