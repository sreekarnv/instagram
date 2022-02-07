import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type ProfileNavigatorParamList = {
	ProfileHome: undefined;
	EditProfile: undefined;
	EditAvatar: undefined;
};

export type ProfileStackNavigationProp<
	T extends keyof ProfileNavigatorParamList
> = NativeStackNavigationProp<ProfileNavigatorParamList, T>;

export type ProfileStackRouteProp<T extends keyof ProfileNavigatorParamList> =
	RouteProp<ProfileNavigatorParamList, T>;

export type ProfileScreenProp<T extends keyof ProfileNavigatorParamList> = {
	navigation: ProfileStackNavigationProp<T>;
	route: ProfileStackRouteProp<T>;
};
