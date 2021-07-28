import { User } from '../entity/User';
import { FieldError } from '../typeDefs/error';
import { LoginUserInput, RegisterUserInput } from '../typeDefs/user';
import { handleRequiredErrors } from './baseValidation';

export const handleLoginErrors = async (
	user: User,
	{ email, password }: LoginUserInput
) => {
	let errors: FieldError[] = handleRequiredErrors({ email, password });
	if (errors.length) return errors;

	if (!user || !(await user.verifyPassword(user.password, password))) {
		errors.push(
			{
				field: 'email',
				message: 'invalid credentials',
			},
			{
				field: 'password',
				message: 'invalid credentials',
			}
		);

		return errors;
	}

	return errors;
};

export const handleRegisterErrors = ({
	email,
	password,
	name,
	passwordConfirm,
}: RegisterUserInput) => {
	let errors: FieldError[] = handleRequiredErrors({
		email,
		password,
		name,
		passwordConfirm,
	});
	if (errors.length) return errors;

	if (password !== passwordConfirm) {
		errors.push(
			{
				field: 'password',
				message: 'passwords do not match',
			},
			{
				field: 'passwordConfirm',
				message: 'passwords do not match',
			}
		);

		return errors;
	}

	return errors;
};
