import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';

export type IRequest = Request & {
	session: Session &
		SessionData & {
			userId?: string;
		};
};

export type Context = {
	req: IRequest;
	res: Response;
};
