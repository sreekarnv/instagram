import { Likes } from './../entity/like.entity';
import DataLoader from 'dataloader';

export const likeLoader = () => {
	return new DataLoader<{ postId: string; userId?: string }, Likes | Likes[]>(
		async (ids) => {
			const res = await Likes.find(ids as any);

			let likesMap: Record<string, Likes> = {};
			res.forEach(
				(l: Likes) => (likesMap[`${l.postId}__${l.userId}` as any] = l)
			);

			return ids.map((l) => likesMap[`${l.postId}__${l.userId}` as any]);
		}
	);
};

export const numLikesLoader = () => {
	return new DataLoader<{ postId: string; userId?: string }, Likes[]>(
		async (ids) => {
			const res = await Likes.find(ids as any);

			let likesMap: Record<string, Likes[]> = {};

			res.forEach((l: Likes) => {
				if (!likesMap[`${l.postId}`]) {
					likesMap[`${l.postId}`] = [];
				}

				likesMap[`${l.postId}`].push(l);
			});

			return ids.map((l) => likesMap[`${l.postId}`]);
		}
	);
};
