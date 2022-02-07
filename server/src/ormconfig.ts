import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const config: ConnectionOptions = {
	type: 'postgres',
	url: process.env.DATABASE_URL!,
	entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
	migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
	cli: {
		migrationsDir: 'migrations',
	},
	logging: true,
};

export = config;
