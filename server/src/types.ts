import { Stream } from 'stream';
import DataLoader from 'dataloader';
import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
import { Redis } from 'ioredis';
import { User } from './entity/User';
import { Likes } from './entity/Likes';

export type IRequest = Request & {
	session: Session &
		SessionData & {
			userId?: string;
		};
};

export class Upload {
	encoding!: string;
	filename!: string;
	mimetype!: string;
	createReadStream!: () => Stream;
}


export type Context = {
	req: IRequest;
	res: Response;
	redis: Redis;
	userLoader: DataLoader<string, User, string>;
	likeLoader: DataLoader<
		{
			postId: string;
			userId?: string | undefined;
		},
		Likes | Likes[],
		{
			postId: string;
			userId?: string | undefined;
		}
	>;
	numLikesLoader: DataLoader<
		{
			postId: string;
			userId?: string | undefined;
		},
		Likes[],
		{
			postId: string;
			userId?: string | undefined;
		}
	>;
};
