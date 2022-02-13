import Feather from '@expo/vector-icons/Feather';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DetailsScreen from '../registration/DetailsScreen';
import SelectAvatarScreen from '../registration/SelectAvatar';
import { RegistrationNavigatorParamList } from '../registration/types';

interface RegistrationNavigatorProps {}

const RegistrationStack =
	createNativeStackNavigator<RegistrationNavigatorParamList>();

const RegistrationNavigator: React.FC<RegistrationNavigatorProps> = ({}) => {
	return (
		<SafeAreaProvider>
			<RegistrationStack.Navigator
				screenOptions={{
					headerTitleStyle: {
						fontFamily: 'Poppins-600',
					},
				}}>
				<RegistrationStack.Screen
					options={{
						title: 'Select Avatar',
					}}
					name='SelectAvatar'
					component={SelectAvatarScreen}
				/>
				<RegistrationStack.Screen
					options={{
						title: 'Your Details',
					}}
					name='Details'
					component={DetailsScreen}
				/>
			</RegistrationStack.Navigator>
		</SafeAreaProvider>
	);
};

export default RegistrationNavigator;
