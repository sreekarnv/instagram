import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import CreatePost from '../Feed/CreatePost';
import { CreatePostParamsList } from './types';

interface CreatePostNavigatorProps {}

const Stack = createStackNavigator<CreatePostParamsList>();

const CreatePostNavigator: React.FC<CreatePostNavigatorProps> = ({}) => {
	return (
		<>
			<Stack.Navigator>
				<Stack.Screen
					name='CreatePost'
					options={{ title: 'Create Post' }}
					component={CreatePost}
				/>
			</Stack.Navigator>
		</>
	);
};

export default CreatePostNavigator;
