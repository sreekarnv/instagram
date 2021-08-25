import * as React from 'react';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabsParamsList } from './types';
import FeedStackNavigator from './FeedStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import CreatePostNavigator from './CreatePostNavigator';

const Tab = createBottomTabNavigator<MainTabsParamsList>();

const MainTabsNavigator: React.FC = ({}) => {
	return (
		<>
			<Tab.Navigator
				screenOptions={{
					tabBarLabel: () => false,
				}}>
				<Tab.Screen
					options={{
						tabBarIcon: () => <AntDesign name='home' size={24} />,
					}}
					name='Feed'
					component={FeedStackNavigator}
				/>
				<Tab.Screen
					options={{
						tabBarIcon: () => <MaterialIcons name='post-add' size={24} />,
					}}
					name='CreatePost'
					component={CreatePostNavigator}
				/>
				<Tab.Screen
					options={{
						tabBarIcon: () => <Feather name='user' size={24} />,
					}}
					name='Profile'
					component={ProfileStackNavigator}
				/>
			</Tab.Navigator>
		</>
	);
};

export default MainTabsNavigator;
