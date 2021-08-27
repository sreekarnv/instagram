import * as React from 'react';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabsParamsList } from './types';
import FeedStackNavigator from './FeedStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import CreatePostNavigator from './CreatePostNavigator';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator<MainTabsParamsList>();

const MainTabsNavigator: React.FC = ({}) => {
	const theme = useTheme();
	return (
		<>
			<Tab.Navigator
				screenOptions={() => {
					return {
						tabBarLabel: () => false,
					};
				}}>
				<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<AntDesign
								name='home'
								color={focused ? theme.colors.primary : 'black'}
								size={24}
							/>
						),
					}}
					name='Feed'
					component={FeedStackNavigator}
				/>
				<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<MaterialIcons
								name='post-add'
								color={focused ? theme.colors.primary : 'black'}
								size={24}
							/>
						),
					}}
					name='CreatePost'
					component={CreatePostNavigator}
				/>
				<Tab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<Feather
								name='user'
								color={focused ? theme.colors.primary : 'black'}
								size={24}
							/>
						),
					}}
					name='Profile'
					component={ProfileStackNavigator}
				/>
			</Tab.Navigator>
		</>
	);
};

export default MainTabsNavigator;
