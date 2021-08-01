import DataLoader from 'dataloader';
import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
import { Redis } from 'ioredis';
import { User } from './entity/User';

export type IRequest = Request & {
	session: Session &
		SessionData & {
			userId?: string;
		};
};

export type Context = {
	req: IRequest;
	res: Response;
	redis: Redis;
	userLoader: DataLoader<string, User, string>;
};
