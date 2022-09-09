import { Field, InputType } from 'type-graphql';

@InputType('RegisterUserInput')
export class RegisterUserInputType {
	@Field()
	email!: string;

	@Field()
	password!: string;

	@Field()
	passwordConfirm!: string;
}

@InputType('LoginUserInput')
export class LoginUserInputType {
	@Field()
	email!: string;

	@Field()
	password!: string;
}

@InputType('UpdateHasRegisteredInput')
export class UpdateHasRegisteredInputType {
	@Field()
	name!: string;

	@Field({ nullable: true })
	phone?: string;

	@Field()
	photo!: string;
}

@InputType('UpdateUserDetailsInput')
export class UpdateUserDetailsInputType {
	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	phone?: string;
}
