import { FieldError } from '../graphql/generated';

export const getFormikErrors = (errs: any) => {
	let errors: any = {};
	errs.forEach((err: FieldError) => {
		(errors as any)[err.field] = err.message;
	});

	return errors;
};
