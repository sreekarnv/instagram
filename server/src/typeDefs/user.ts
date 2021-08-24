import { Field, InputType, ObjectType } from 'type-graphql';
import { User } from '../entity/User';
import { FieldError } from './error';

@InputType('LoginUserInput')
export class LoginUserInput {
	@Field()
	email!: string;

	@Field()
	password!: string;
}

@InputType('RegisterUserInput')
export class RegisterUserInput {
	@Field()
	email!: string;

	@Field()
	name!: string;

	@Field()
	password!: string;

	@Field()
	passwordConfirm!: string;
}

@ObjectType()
export class UserResponse {
	@Field(() => User, { nullable: true })
	user?: User;

	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];
}

@InputType('UpdateProfileInputType')
export class UpdateProfileInputType {
	@Field()
	email!: string;

	@Field()
	name!: string;
}
