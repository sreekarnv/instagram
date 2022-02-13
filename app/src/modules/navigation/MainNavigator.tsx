import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CreatePostScreen from '../main/CreatePostScreen';
import FeedScreen from '../main/FeedScreen';
import ProfileScreen from '../main/ProfileScreen';

interface FeedNavigatorProps {}

const FeedTab = createBottomTabNavigator();

const FeedNavigator: React.FC<FeedNavigatorProps> = ({}) => {
	const theme = useTheme();

	return (
		<SafeAreaProvider>
			<FeedTab.Navigator
				screenOptions={{
					headerTitleStyle: {
						fontFamily: 'Poppins-600',
					},
				}}>
				<FeedTab.Screen
					options={{
						tabBarIcon: ({ focused }) => (
							<Feather
								color={focused ? theme.colors.primary : theme.colors.gray}
								name='home'
								size={25}
							/>
						),
						tabBarShowLabel: false,
					}}
					name='Feed'
					component={FeedScreen}
				/>

				<FeedTab.Screen
					options={{
						headerShown: false,
						tabBarIcon: ({ focused }) => (
							<Feather
								color={focused ? theme.colors.primary : theme.colors.gray}
								name='edit'
								size={25}
							/>
						),
						tabBarShowLabel: false,
					}}
					name='MainCreatePost'
					component={CreatePostScreen}
				/>

				<FeedTab.Screen
					options={{
						headerShown: false,
						tabBarShowLabel: false,

						tabBarIcon: ({ focused }) => (
							<Feather
								color={focused ? theme.colors.primary : theme.colors.gray}
								name='user'
								size={25}
							/>
						),
					}}
					name='Profile'
					component={ProfileScreen}
				/>
			</FeedTab.Navigator>
		</SafeAreaProvider>
	);
};

export default FeedNavigator;
