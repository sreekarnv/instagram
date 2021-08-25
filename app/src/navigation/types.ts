import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Params List
export type MainTabsParamsList = {
	Feed: undefined;
	CreatePost: undefined;
	Profile: undefined;
};

export type AuthStackParamsList = {
	Login: undefined;
	Register: undefined;
};

export type FeedStackParamsList = {
	Feed: undefined;
};

export type ProfileStackParamsList = {
	Profile: undefined;
};

export type CreatePostParamsList = {
	CreatePost: undefined;
};

// Nav Props
export type AuthStackNavProps<T extends keyof AuthStackParamsList> = {
	navigation: StackNavigationProp<AuthStackParamsList, T>;
	route: RouteProp<AuthStackParamsList, T>;
};
