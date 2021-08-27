import { Formik } from 'formik';
import * as React from 'react';
import { Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import FormInput from '../components/FormInput';
import { useCreatePostMutation } from '../graphql/generated';
import { CreatePostStackNavProps } from '../navigation/types';

const Form: React.FC<CreatePostStackNavProps<'Form'>> = ({ route }) => {
	const [createPost, { loading }] = useCreatePostMutation();

	return (
		<>
			<View style={{ flex: 1 }}>
				<Image style={{ flex: 1 }} source={{ uri: route.params.imageUrl }} />
				<View
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: '100%',
						backgroundColor: 'rgba(255, 255,255, 0.45)',
					}}>
					<Formik
						initialValues={{
							description: '',
						}}
						onSubmit={({ description }) => {
							const formData = new FormData();
							formData.append('photo', route.params.imageUrl);
							return createPost({
								variables: {
									description,
									photo: formData,
								},
							});
						}}>
						{({ handleSubmit }) => {
							return (
								<>
									<FormInput
										multiline
										mode='flat'
										style={{ backgroundColor: 'transparent' }}
										name='description'
										label='Description'
									/>
									<Button
										onPress={() => {
											handleSubmit();
										}}>
										Submit
									</Button>
								</>
							);
						}}
					</Formik>
				</View>
			</View>
		</>
	);
};

export default Form;
