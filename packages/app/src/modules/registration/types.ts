import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RegistrationNavigatorParamList = {
	Details: { avatar: number };
	SelectAvatar: undefined;
};

export type RegistrationStackNavigationProp<
	T extends keyof RegistrationNavigatorParamList
> = NativeStackNavigationProp<RegistrationNavigatorParamList, T>;

export type RegistrationStackRouteProp<
	T extends keyof RegistrationNavigatorParamList
> = RouteProp<RegistrationNavigatorParamList, T>;

export type RegistrationScreenProp<
	T extends keyof RegistrationNavigatorParamList
> = {
	navigation: RegistrationStackNavigationProp<T>;
	route: RegistrationStackRouteProp<T>;
};
