import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { UserResolver } from './resolvers/user.resolver';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { customAuthChecker } from './middleware/auth';
import config from './ormconfig';
import { PostResolver } from './resolvers/post.resolver';
import userLoader from './dataloaders/userLoader';
import path from 'path';
import { likeLoader, numLikesLoader } from './dataloaders/likeLoader';

dotenv.config();

console.log(`NODE_ENV=${process.env.NODE_ENV}`);
const PORT = process.env.PORT || 4000;

(async () => {
	try {
		const connection = await createConnection(config);

		connection.runMigrations();

		const app = express();

		app.use(
			'/uploads/avatars',
			express.static(path.join(__dirname, '../uploads', 'avatars'))
		);

		app.set('trust proxy', 1);
		app.use(
			cors({
				credentials: true,
			})
		);

		app.use(cookieParser());
		app.use(
			cookieSession({
				name: 'auth.session',
				httpOnly: true,
				secret: 'my-secret',
				maxAge: 1000 * 60 * 60 * 24 * 7,
			})
		);

		const server = new ApolloServer({
			schema: await buildSchema({
				resolvers: [UserResolver, PostResolver],
				validate: false,
				authChecker: customAuthChecker,
			}),
			plugins: [
				process.env.NODE_ENV === 'production'
					? ApolloServerPluginLandingPageDisabled()
					: ApolloServerPluginLandingPageGraphQLPlayground(),
			],
			context: ({ req, res }) => ({
				req,
				res,
				userLoader: userLoader(),
				likeLoader: likeLoader(),
				numLikesLoader: numLikesLoader(),
			}),
		});

		await server.start();

		server.applyMiddleware({ app });

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
})();
