import DataLoader from 'dataloader';
import { Request, Response } from 'express';
import { Likes } from '../entity/like.entity';
import { User } from '../entity/user.entity';

export type IRequest = Request &
	CookieSessionInterfaces.CookieSessionRequest & {
		session: {
			userId?: string;
		};
	};

export type ExpressContext = {
	req: IRequest;
	res: Response;
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
