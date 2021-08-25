import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Profile from '../Feed/Profile';
import { ProfileStackParamsList } from './types';

interface ProfileStackNavigatorProps {}

const Stack = createStackNavigator<ProfileStackParamsList>();

const ProfileStackNavigator: React.FC<ProfileStackNavigatorProps> = ({}) => {
	return (
		<>
			<Stack.Navigator>
				<Stack.Screen name='Profile' component={Profile} />
			</Stack.Navigator>
		</>
	);
};

export default ProfileStackNavigator;
