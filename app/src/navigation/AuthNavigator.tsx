import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
	createStackNavigator,
	StackNavigationProp,
} from '@react-navigation/stack';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import Home from '../Feed/Home';

type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
	Home: undefined;
};

type AuthScreenRouteProp = RouteProp<
	AuthStackParamList,
	'Register' | 'Login' | 'Home'
>;

type AuthScreenNavigationProp = StackNavigationProp<
	AuthStackParamList,
	'Register' | 'Login' | 'Home'
>;

export type AuthScreenProps = {
	route: AuthScreenRouteProp;
	navigation: AuthScreenNavigationProp;
};

const AuthStackNavigator = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
	return (
		<AuthStackNavigator.Navigator headerMode='none'>
			<AuthStackNavigator.Screen name='Login' component={Login} />
			<AuthStackNavigator.Screen name='Register' component={Register} />
			<AuthStackNavigator.Screen name='Home' component={Home} />
		</AuthStackNavigator.Navigator>
	);
};

export default AuthNavigator;
