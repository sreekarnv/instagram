import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	MaterialCommunityIcons,
	MaterialIcons,
	Feather,
} from '@expo/vector-icons';
import Feed from '../Feed/Feed';
import Profile from '../Feed/Profile';
import CreatePost from '../Feed/CreatePost';
import { useTheme } from 'react-native-paper';
import Logout from '../Feed/Logout';

export type AppTabsParamList = {
	Feed: undefined;
	Profile: undefined;
	CreatePost: undefined;
	Logout: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParamList>();

const HomeNavigator = () => {
	const theme = useTheme();

	return (
		<Tab.Navigator>
			<Tab.Screen
				options={{
					tabBarLabel: () => null,
					tabBarIcon: ({ focused }) => (
						<MaterialCommunityIcons
							style={{ color: focused ? theme.colors.primary : 'black' }}
							name={'home-outline'}
							size={24}
						/>
					),
				}}
				name='Feed'
				component={Feed}
			/>
			<Tab.Screen
				options={{
					tabBarLabel: () => null,
					tabBarIcon: ({ focused }) => (
						<MaterialIcons
							name={'post-add'}
							style={{ color: focused ? theme.colors.primary : 'black' }}
							size={24}
						/>
					),
				}}
				name='CreatePost'
				component={CreatePost}
			/>
			<Tab.Screen
				name='Profile'
				options={{
					tabBarLabel: () => null,
					tabBarIcon: ({ focused }) => (
						<>
							<Feather
								name='user'
								size={24}
								style={{ color: focused ? theme.colors.primary : 'black' }}
							/>
						</>
					),
				}}
				component={Profile}
			/>

			<Tab.Screen
				name='Logout'
				options={{
					tabBarLabel: () => null,
					tabBarIcon: () => (
						<>
							<Feather
								name='power'
								size={20}
								style={{ color: theme.colors.error }}
							/>
						</>
					),
				}}
				component={Logout}
			/>
		</Tab.Navigator>
	);
};

export default HomeNavigator;
