import DataLoader from 'dataloader';
import { User } from '../entity/user.entity';

const userLoader = () => {
	return new DataLoader<string, User>(async (ids) => {
		const res = await User.findByIds(ids as string[]);
		const userMap: Record<string, User> = {};
		res.forEach((u: User) => (userMap[u.id] = u));
		const users = ids.map((userId) => userMap[userId]);

		return users;
	});
};

export default userLoader;
