import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Form from '../Post/Form';
import SelectPicture from '../Post/SelectPicture';
import { CreatePostParamsList } from './types';

interface CreatePostNavigatorProps {}

const Stack = createStackNavigator<CreatePostParamsList>();

const CreatePostNavigator: React.FC<CreatePostNavigatorProps> = ({}) => {
	return (
		<>
			<Stack.Navigator>
				<Stack.Screen
					name='SelectPicture'
					options={{ title: 'Create Post' }}
					component={SelectPicture}
				/>
				<Stack.Screen
					name='Form'
					options={{ title: 'Create Post' }}
					component={Form}
				/>
			</Stack.Navigator>
		</>
	);
};

export default CreatePostNavigator;
