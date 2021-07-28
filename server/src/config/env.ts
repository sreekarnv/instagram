import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(`${__dirname}/../../.env`) });

export default {
	NODE_ENV: process.env.NODE_ENV!,
	PORT: process.env.PORT!,
	DATABASE_URL: process.env.DATABASE_URL!,
	COOKIE_NAME: process.env.COOKIE_NAME!,
	SESSION_SECRET: process.env.SESSION_SECRET!,
};
