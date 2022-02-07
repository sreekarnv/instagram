import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from '../auth/LoginScreen';
import RegisterScreen from '../auth/RegisterScreen';
import { AuthNavigatorParamList } from '../auth/types';
import { StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';

interface AuthNavigatorProps {}

const AuthStack = createNativeStackNavigator<AuthNavigatorParamList>();

const AuthNavigator: React.FC<AuthNavigatorProps> = ({}) => {
	return (
		<SafeAreaProvider>
			<AuthStack.Navigator screenOptions={{ headerShown: false }}>
				<AuthStack.Screen name='Login' component={LoginScreen} />
				<AuthStack.Screen name='Register' component={RegisterScreen} />
			</AuthStack.Navigator>

			<FlashMessage position='top' statusBarHeight={StatusBar.currentHeight} />
		</SafeAreaProvider>
	);
};

export default AuthNavigator;
