import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, TouchableOpacity } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import ProfileHomeScreen from '../profile/ProfileHomeScreen';
import { ProfileNavigatorParamList } from '../profile/types';
import Feather from '@expo/vector-icons/Feather';
import EditProfileScreen from '../profile/EditProfileScreen';
import EditAvatarScreen from '../profile/EditAvatarScreen';

interface ProfileNavigatorProps {}

const ProfileStack = createNativeStackNavigator<ProfileNavigatorParamList>();

const AuthNavigator: React.FC<ProfileNavigatorProps> = ({}) => {
	return (
		<SafeAreaProvider>
			<ProfileStack.Navigator>
				<ProfileStack.Screen
					options={({ navigation }) => {
						return {
							title: 'Profile',
							headerTitleStyle: {
								fontFamily: 'Poppins-600',
							},
							headerRight: () => {
								return (
									<TouchableOpacity
										onPress={() => navigation.navigate('EditProfile')}>
										<Feather name='edit' size={20} />
									</TouchableOpacity>
								);
							},
						};
					}}
					name='ProfileHome'
					component={ProfileHomeScreen}
				/>

				<ProfileStack.Screen
					options={() => {
						return {
							title: 'Edit Profile',
							headerTitleStyle: {
								fontFamily: 'Poppins-600',
							},
						};
					}}
					name='EditProfile'
					component={EditProfileScreen}
				/>

				<ProfileStack.Screen
					options={() => {
						return {
							title: 'Edit Avatar',
							headerTitleStyle: {
								fontFamily: 'Poppins-600',
							},
						};
					}}
					name='EditAvatar'
					component={EditAvatarScreen}
				/>
			</ProfileStack.Navigator>

			<FlashMessage position='top' statusBarHeight={StatusBar.currentHeight} />
		</SafeAreaProvider>
	);
};

export default AuthNavigator;
