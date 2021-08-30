import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Form from '../Post/Form';
import SelectPicture from '../Post/SelectPicture';
import { CreatePostParamsList } from './types';

interface CreatePostNavigatorProps {}

const Stack = createStackNavigator<CreatePostParamsList>();

const CreatePostNavigator: React.FC<CreatePostNavigatorProps> = ({}) => {
	const theme = useTheme();

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
					options={({ route, navigation }) => {
						return {
							title: 'Create Post',
							headerRight: () => {
								return (
									<>
										<TouchableOpacity
											onPress={async () => {
												await route.params.submit?.current();
												navigation.goBack();
											}}
											style={{ paddingRight: 18 }}>
											<Feather
												name='send'
												size={20}
												color={theme.colors.primary}
											/>
										</TouchableOpacity>
									</>
								);
							},
						};
					}}
					// options={{   }}
					component={Form}
				/>
			</Stack.Navigator>
		</>
	);
};

export default CreatePostNavigator;
