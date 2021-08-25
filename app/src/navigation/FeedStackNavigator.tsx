import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Feed from '../Feed/Feed';
import { FeedStackParamsList } from './types';

const Stack = createStackNavigator<FeedStackParamsList>();

const FeedStackNavigator: React.FC = () => {
	return (
		<>
			<Stack.Navigator>
				<Stack.Screen name='Feed' component={Feed} />
			</Stack.Navigator>
		</>
	);
};

export default FeedStackNavigator;
