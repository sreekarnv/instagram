import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as React from 'react';
import { Image, View } from 'react-native';
import FormInput from '../components/FormInput';
import { useCreatePostMutation, useMeQuery } from '../graphql/generated';
import {
	CreatePostStackNavProps,
	ProfileScreenNavigationProp,
} from '../navigation/types';
import { ReactNativeFile } from 'apollo-upload-client';
import Loader from '../components/Loader';
import * as mime from 'react-native-mime-types';

const Form: React.FC<CreatePostStackNavProps<'Form'>> = ({ route }) => {
	const [createPost, { loading }] = useCreatePostMutation();
	const { data } = useMeQuery();
	const submit = React.useRef<any>();

	const navigation = useNavigation<ProfileScreenNavigationProp>();

	React.useEffect(() => {
		navigation.setParams({ submit });
	}, []);

	if (loading) {
		return <Loader />;
	}

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
						backgroundColor: 'rgba(255, 255,255, 0.75)',
					}}>
					<Formik
						initialValues={{
							description: '',
						}}
						onSubmit={async ({ description }) => {
							const file = new ReactNativeFile({
								uri: route.params.imageUrl,
								type: mime.lookup(route.params.imageUrl) || 'image',
								name: `filename-${data?.me?.name}`,
							});

							await createPost({
								variables: {
									description,
									photo: file,
								},

								update: async (cache) => {
									await cache.reset();
									navigation.reset({
										routes: [
											{
												name: 'Feed',
											},
										],
									});
								},
							});
						}}>
						{({ handleSubmit }) => {
							submit.current = handleSubmit;
							return (
								<>
									<FormInput
										multiline
										mode='flat'
										style={{ backgroundColor: 'transparent' }}
										name='description'
										label='Description'
									/>
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
