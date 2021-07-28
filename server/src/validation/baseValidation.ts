import { FieldError } from '../typeDefs/error';

export const handleRequiredErrors = (body: any) => {
	const errors: FieldError[] = [];

	Object.keys(body).forEach((e) => {
		if (!body[e]) {
			errors.push({
				field: e,
				message: 'This is a required field',
			});
		}
	});

	return errors;
};

export const handleDuplicateError = (err: any) => {
	if (err.code === '23505') {
		const field = err.detail.match(/\(([^)]+)\)/)[1];
		return {
			errors: [
				{
					field,
					message: `${err.table} with this ${field} already exists`,
				},
			],
		};
	}

	return err;
};
