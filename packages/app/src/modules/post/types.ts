import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { MainNavigatorParamsList } from '../navigation/types';

export type PostNavigatorParamList = {
	CapturePhoto: undefined;
	PhotoPreview: { imageUrl: string };
};

export type PostStackNavigationProp<T extends keyof PostNavigatorParamList> =
	NativeStackNavigationProp<PostNavigatorParamList, T>;

export type PostStackRouteProp<T extends keyof PostNavigatorParamList> =
	RouteProp<PostNavigatorParamList, T>;

export type PostScreenProp<T extends keyof PostNavigatorParamList> = {
	navigation: CompositeNavigationProp<
		PostStackNavigationProp<T>,
		NativeStackNavigationProp<MainNavigatorParamsList>
	>;
	route: PostStackRouteProp<T>;
};
