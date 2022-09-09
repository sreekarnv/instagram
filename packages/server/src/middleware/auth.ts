import { ExpressContext } from 'apollo-server-express';
import { AuthChecker } from 'type-graphql';

export const customAuthChecker: AuthChecker<ExpressContext> = async ({
	context,
}) => {
	const { req } = context;

	if (!req?.session?.userId) {
		return false;
	}

	return true;
};
