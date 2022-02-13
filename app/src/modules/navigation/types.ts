import { NavigatorScreenParams } from '@react-navigation/native';
import { PostNavigatorParamList } from '../post/types';
import { ProfileNavigatorParamList } from '../profile/types';

export type MainNavigatorParamsList = {
	Feed: undefined;
	Post: NavigatorScreenParams<PostNavigatorParamList>;
	Profile: NavigatorScreenParams<ProfileNavigatorParamList>;
};
