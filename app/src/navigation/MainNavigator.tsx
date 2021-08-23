import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import { useMeQuery } from '../graphql/generated';
import HomeNavigator, { AppTabsParamList } from './HomeNavigator';

import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Loader from '../components/Loader';

export type MainStackParamList = {
	Login: undefined;
	Register: undefined;
	Home: NavigatorScreenParams<AppTabsParamList>;
};

export type MainScreenRouteProp = RouteProp<
	MainStackParamList,
	'Register' | 'Home' | 'Login'
>;

export type RegisterScreenNavigationProp = StackNavigationProp<
	MainStackParamList,
	'Register' | 'Home' | 'Login'
>;

export type MainNavigatorProps = {
	route: MainScreenRouteProp;
	navigation: RegisterScreenNavigationProp;
};

const MainStackNavigator = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
	const { loading, data } = useMeQuery();

	if (loading) {
		return <Loader />;
	}

	return (
		<MainStackNavigator.Navigator
			initialRouteName={data?.me?.id ? 'Home' : 'Login'}>
			<MainStackNavigator.Screen name='Login' component={Login} />
			<MainStackNavigator.Screen name='Register' component={Register} />
			<MainStackNavigator.Screen
				options={{
					title: 'Instagram',
					headerLeft: () => null,
				}}
				name='Home'
				component={HomeNavigator}
			/>
		</MainStackNavigator.Navigator>
	);
};

export default MainNavigator;
