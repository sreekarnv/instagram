import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../entity/user.entity';
import {
	LoginUserInputType,
	RegisterUserInputType,
	UpdateHasRegisteredInputType,
	UpdateUserDetailsInputType,
} from '../typeDefs/user.types';
import { ExpressContext } from '../types';
import { users } from '../data/users';
import { validateEmail } from '../utils/validateEmail';

@Resolver(() => User)
export class UserResolver {
	@Query(() => [User])
	getAllUsers(@Ctx() { req }: ExpressContext): Promise<User[]> {
		console.log(req.session);
		return User.find();
	}

	@Mutation(() => Boolean)
	async insertUsers() {
		const newUsers = users.map((user) => {
			return {
				password:
					'$argon2i$v=19$m=4096,t=3,p=1$itI9Mg9UlOajBnXTJDo$3s34HpE8FzKHajiNASh5MSyitAWwywn3i4zT82vc4cM',
				hasRegistered: true,
				...user,
			};
		});

		const user = await User.insert([...newUsers]);

		return !!user;
	}

	@Mutation(() => Boolean)
	async updateUsersPhoto() {
		const users = await User.find();

		users.forEach(async (u) => {
			const randomNumber = Math.floor(Math.random() * 4) + 1;
			u.photo = `/uploads/avatars/avatar-${randomNumber}.png`;
			await u.save();
		});

		return true;
	}

	@Query(() => [String])
	async getUserIds() {
		const ids = await getConnection()
			.createQueryBuilder()
			.select('id')
			.from(User, 'user')
			.getRawMany();

		const userIds = ids.map((id) => id.id);
		return userIds;
	}

	@Mutation(() => Boolean)
	async deleteUsers(): Promise<boolean> {
		await User.delete({});

		return true;
	}

	@Query(() => User, { nullable: true })
	async getMe(@Ctx() { req }: ExpressContext): Promise<User | null> {
		const user = await User.findOne({ where: { id: req.session.userId } });

		if (!user) {
			return null;
		}

		return user;
	}

	@Mutation(() => User)
	async registerUser(
		@Arg('input')
		{ email, password, passwordConfirm }: RegisterUserInputType,
		@Ctx() { req }: ExpressContext
	): Promise<User> {
		if (password !== passwordConfirm) {
			throw new Error('Passwords do not match');
		}

		if (!validateEmail(email)) {
			throw new Error('Email is not valid');
		}

		try {
			const user = await User.create({
				email,
				password,
			}).save();

			req.session.userId = user.id;

			return user;
		} catch (err: any) {
			if (err.code === '23505') {
				throw new Error('Email is already in use');
			} else {
				throw new Error(err);
			}
		}
	}

	@Mutation(() => User)
	async loginUser(
		@Arg('input') { email, password }: LoginUserInputType,
		@Ctx() { req }: ExpressContext
	): Promise<User> {
		if (!validateEmail(email)) {
			throw new Error('Email is not valid');
		}

		const user = await User.createQueryBuilder()
			.addSelect(['id', 'email', '"hasRegistered"', 'name'])
			.where('email=:email', { email })
			.getOne();

		if (!user || !(await user.verifyPassword(user.password, password))) {
			throw new Error('Invalid Credentials! Email or Password is incorrect');
		}

		req.session.userId = user.id;

		return user;
	}

	@Mutation(() => Boolean)
	async logout(@Ctx() { req }: ExpressContext): Promise<boolean> {
		req.session = null as any;

		return true;
	}

	@Mutation(() => User)
	async updateHasRegistered(
		@Arg('input') { phone, name, photo }: UpdateHasRegisteredInputType,
		@Ctx() { req }: ExpressContext
	) {
		const user = await getConnection()
			.createQueryBuilder()
			.update(User)
			.set({
				name,
				phone,
				photo,
				hasRegistered: true,
			})
			.where('id = :id', { id: req.session.userId })
			.returning(['id', 'name', 'email', 'phone', 'photo', 'hasRegistered'])
			.execute();

		return user.raw[0];
	}

	@Mutation(() => User)
	async updateUserDetails(
		@Arg('input') data: UpdateUserDetailsInputType,
		@Ctx() { req }: ExpressContext
	) {
		Object.keys(data).forEach((d) => {
			if (!d || !(data as any)[d].length) {
				delete (data as any)[d];
			}
		});

		if (Object.keys(data).length === 0) {
			throw new Error('No data provided');
		}

		const user = await getConnection()
			.createQueryBuilder()
			.update(User)
			.set({ ...data } as any)
			.where('id = :id', { id: req.session.userId })
			.returning(['id', 'name', 'email', 'phone', 'hasRegistered', 'photo'])
			.execute();

		return user.raw[0];
	}

	@Mutation(() => User)
	async updateUserPhotoAvatar(
		@Arg('avatar') avatar: string,
		@Ctx() { req }: ExpressContext
	) {
		const user = await getConnection()
			.createQueryBuilder()
			.update(User)
			.set({ photo: `/uploads/avatars/${avatar}` } as any)
			.where('id = :id', { id: req.session.userId })
			.returning(['id', 'name', 'email', 'phone', 'hasRegistered', 'photo'])
			.execute();

		return user.raw[0];
	}
}
