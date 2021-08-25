import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import { AuthStackParamsList } from './types';

interface AuthStackNavigatorProps {}

const Stack = createStackNavigator<AuthStackParamsList>();

const AuthStackNavigator: React.FC<AuthStackNavigatorProps> = ({}) => {
	return (
		<>
			<Stack.Navigator>
				<Stack.Screen name='Login' component={Login} />
				<Stack.Screen name='Register' component={Register} />
			</Stack.Navigator>
		</>
	);
};

export default AuthStackNavigator;
