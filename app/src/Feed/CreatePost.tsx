import { Formik, getActiveElement } from 'formik';
import * as React from 'react';
import Box from '../components/Box';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import {
	GetAllPostsDocument,
	Post,
	useCreatePostMutation,
} from '../graphql/generated';
import { MainNavigatorProps } from '../navigation/MainNavigator';

type CreatePostProps = MainNavigatorProps;

const CreatePost: React.FC<CreatePostProps> = ({ navigation }) => {
	const [createPost, { loading }] = useCreatePostMutation();

	return (
		<>
			<Box
				backgroundColor='dark'
				height='100%'
				padding='lg'
				justifyContent='center'>
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
								<FormInput name='description' label='Description' />
								<Button onPress={() => handleSubmit()}>
									{loading ? 'Loading....' : 'Create Post'}
								</Button>
							</>
						);
					}}
				</Formik>
			</Box>
		</>
	);
};

export default CreatePost;
