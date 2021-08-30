import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
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
	EditProfile: { submit?: React.MutableRefObject<any> };
};

export type CreatePostParamsList = {
	SelectPicture: undefined;
	Form: { imageUrl: string; submit?: React.MutableRefObject<any> };
};

export type ProfileScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<MainTabsParamsList, 'Profile'>,
	CompositeNavigationProp<
		StackNavigationProp<CreatePostParamsList, 'Form'>,
		BottomTabNavigationProp<MainTabsParamsList, 'Profile'>
	>
>;

// Nav Props
export type AuthStackNavProps<T extends keyof AuthStackParamsList> = {
	navigation: StackNavigationProp<AuthStackParamsList, T>;
	route: RouteProp<AuthStackParamsList, T>;
};

export type ProfileStackNavProps<T extends keyof ProfileStackParamsList> = {
	navigation: ProfileScreenNavigationProp;
	route: RouteProp<ProfileStackParamsList, T>;
};

export type CreatePostStackNavProps<T extends keyof CreatePostParamsList> = {
	navigation: StackNavigationProp<CreatePostParamsList, T>;
	route: RouteProp<CreatePostParamsList, T>;
};
