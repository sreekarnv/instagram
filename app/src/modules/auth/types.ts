import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type AuthNavigatorParamList = {
	Login: undefined;
	Register: undefined;
};

export type AuthStackNavigationProp<T extends keyof AuthNavigatorParamList> =
	NativeStackNavigationProp<AuthNavigatorParamList, T>;

export type AuthStackRouteProp<T extends keyof AuthNavigatorParamList> =
	RouteProp<AuthNavigatorParamList, T>;

export type AuthScreenProp<T extends keyof AuthNavigatorParamList> = {
	navigation: AuthStackNavigationProp<T>;
	route: AuthStackRouteProp<T>;
};
