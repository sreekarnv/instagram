import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feed from '../Feed/Feed';
import Logout from '../Feed/Logout';

export type AppTabsParamList = {
	Feed: undefined;
	Logout: undefined;
};

const AppTabsNavigator = createBottomTabNavigator<AppTabsParamList>();

const AppNavigator = () => {
	return (
		<AppTabsNavigator.Navigator>
			<AppTabsNavigator.Screen name='Feed' component={Feed} />
			<AppTabsNavigator.Screen name='Logout' component={Logout} />
		</AppTabsNavigator.Navigator>
	);
};

export default AppNavigator;
