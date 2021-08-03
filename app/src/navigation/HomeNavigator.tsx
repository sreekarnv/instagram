import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feed from '../Feed/Feed';
import Profile from '../Feed/Profile';
import CreatePost from '../Feed/CreatePost';

export type AppTabsParamList = {
	Feed: undefined;
	Profile: undefined;
	CreatePost: undefined;
};

const AppTabsNavigator = createBottomTabNavigator<AppTabsParamList>();

const AppNavigator = () => {
	return (
		<AppTabsNavigator.Navigator
			tabBarOptions={{
				tabStyle: {
					borderColor: 'transparent',
					padding: 10,
					backgroundColor: 'black',
				},
			}}>
			<AppTabsNavigator.Screen name='Feed' component={Feed} />
			<AppTabsNavigator.Screen
				options={{
					title: 'Post',
				}}
				name='CreatePost'
				component={CreatePost}
			/>
			<AppTabsNavigator.Screen name='Profile' component={Profile} />
		</AppTabsNavigator.Navigator>
	);
};

export default AppNavigator;
