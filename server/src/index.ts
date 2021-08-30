import { Post } from './entity/Post';
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
import { PostResolver } from './resolvers/PostResolver';
import userLoader from './dataloaders/userLoader';
import { likeLoader, numLikesLoader } from './dataloaders/likeLoader';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { Likes } from './entity/Likes';
import { graphqlUploadExpress } from 'graphql-upload';
import path from 'path';

console.log(`NODE_ENV=${env.NODE_ENV}`);
const PORT = env.PORT || 4000;

const app = express();

app.use('/', express.static(path.join(__dirname, '../uploads')));

(async () => {
	try {
		await createConnection({
			type: 'postgres',
			url: env.DATABASE_URL,
			entities: [User, Post, Likes],
			synchronize: env.NODE_ENV === 'development',
			logging: env.NODE_ENV === 'development',
			migrations: ['./migration/*.ts'],
			cli: {
				migrationsDir: 'migration',
			},
		});

		const redisClient = new Redis();
		const RedisStore = connectRedis(session);

		app.use(cors());
		app.use(cookieParser());
		app.use(
			session({
				store: new RedisStore({
					client: redisClient,
					disableTTL: true,
					disableTouch: true,
				}),
				secret: env.SESSION_SECRET,
				cookie: {
					httpOnly: true,
					sameSite: 'lax',
					secure: false,
					maxAge: 1000 * 86400,
				},
				name: env.COOKIE_NAME,
				saveUninitialized: false,
				resave: false,
			})
		);

		app.use('/graphql', graphqlUploadExpress());

		const server = new ApolloServer({
			uploads: false,
			schema: await buildSchema({
				resolvers: [UserResolver, PostResolver],
				validate: false,
			}),
			context: ({ req, res }) => ({
				req,
				res,
				redis: redisClient,
				userLoader: userLoader(),
				likeLoader: likeLoader(),
				numLikesLoader: numLikesLoader(),
			}),
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
