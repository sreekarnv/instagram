import { Formik } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import FormInput from '../components/FormInput';
import { useCreatePostMutation } from '../graphql/generated';
import { MainNavigatorProps } from '../navigation/MainNavigator';

type CreatePostProps = MainNavigatorProps;

const CreatePost: React.FC<CreatePostProps> = ({ navigation }) => {
	const [createPost, { loading }] = useCreatePostMutation();

	return (
		<>
			<View
				style={{
					height: '100%',
					padding: 25,
					justifyContent: 'center',
				}}>
				<Formik
					initialValues={{
						description: '',
					}}
					onSubmit={async ({ description }, { resetForm }) => {
						await createPost({
							variables: {
								description,
								photo: 'http://dummyimage.com/256x226.png/5fa2dd/ffffff',
							},
							update: () => {
								resetForm();
								navigation.navigate('Home', {
									screen: 'Feed',
								});
							},
						});
					}}>
					{({ handleSubmit }) => {
						return (
							<>
								<FormInput multiline name='description' label='Description' />
								<Button mode='outlined' onPress={() => handleSubmit()}>
									{loading ? 'Loading....' : 'Create Post'}
								</Button>
							</>
						);
					}}
				</Formik>
			</View>
		</>
	);
};

export default CreatePost;
