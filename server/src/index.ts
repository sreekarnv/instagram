import 'reflect-metadata';
import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import cors from 'cors';
import env from './config/env';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import session from 'express-session';
import cookieParser from 'cookie-parser';

console.log(`NODE_ENV=${env.NODE_ENV}`);
const PORT = env.PORT || 4000;

const app = express();

(async () => {
	try {
		await createConnection({
			type: 'postgres',
			url: env.DATABASE_URL,
			entities: [User],
			synchronize: env.NODE_ENV === 'development',
			logging: env.NODE_ENV === 'development',
		});

		app.use(cors());
		app.use(cookieParser());
		app.use(
			session({
				secret: env.SESSION_SECRET,
				cookie: {
					httpOnly: true,
					sameSite: 'lax',
					secure: false,
					maxAge: 1000 * 60 * 60 * 60 * 24,
				},
				name: env.COOKIE_NAME,
				saveUninitialized: false,
				resave: false,
			})
		);

		const server = new ApolloServer({
			schema: await buildSchema({
				resolvers: [UserResolver],
				validate: false,
			}),
			context: ({ req, res }) => ({ req, res }),
		});

		await server.start();

		server.applyMiddleware({ app, cors: false });

		app.listen(PORT, () => {
			console.log(`App running on port ${PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
})();
