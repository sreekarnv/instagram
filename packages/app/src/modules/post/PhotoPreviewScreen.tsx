import { Feather } from '@expo/vector-icons';
import { ReactNativeFile } from 'apollo-upload-client';
import React from 'react';
import { Image, TextInput, TouchableOpacity } from 'react-native';
import {
	GetAllPostsDocument,
	useCreatePostMutation,
	useGetMeQuery,
} from '../../graphql/generated';
import Box from '../../shared/components/ui/Box';
import Loader from '../../shared/components/ui/Loader';
import DismissKeyboard from '../../shared/components/utils/DismissKeyboard';
import { PostScreenProp } from './types';
import { lookup } from 'react-native-mime-types';
import { showMessage } from 'react-native-flash-message';

interface PhotoPreviewScreenProps extends PostScreenProp<'PhotoPreview'> {}

const PhotoPreviewScreen: React.FC<PhotoPreviewScreenProps> = ({
	route,
	navigation,
}) => {
	const [createPost, { loading }] = useCreatePostMutation();
	const [description, setDescription] = React.useState<string>('');
	const { data } = useGetMeQuery();

	const handleSubmit = async () => {
		const file = new ReactNativeFile({
			uri: route.params.imageUrl,
			type: lookup(route.params.imageUrl) || 'image',
			name: `filename-${data?.user?.name}`,
		});

		try {
			await createPost({
				variables: {
					description,
					photo: file,
				},
				refetchQueries: [
					{
						query: GetAllPostsDocument,
					},
				],
			});

			setDescription('');

			navigation.reset({
				routes: [
					{
						name: 'CapturePhoto',
					},
				],
			});

			navigation.navigate('Feed');
		} catch (err) {
			showMessage({
				message: 'Could not Create Your Post',
				type: 'danger',
			});
		}
	};

	React.useEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<TouchableOpacity onPress={() => handleSubmit()}>
						<Feather name='check' size={20} />
					</TouchableOpacity>
				);
			},
		});
	}, [description]);

	if (loading) {
		return <Loader />;
	}

	return (
		<DismissKeyboard>
			<Box flex={1}>
				<Image style={{ flex: 1 }} source={{ uri: route.params.imageUrl }} />
				<TextInput
					placeholder='Add a caption...'
					multiline
					value={description}
					onChangeText={(text) => setDescription(text)}
					style={{
						width: '100%',
						paddingVertical: 10,
						paddingHorizontal: 15,
					}}
				/>
			</Box>
		</DismissKeyboard>
	);
};

export default PhotoPreviewScreen;
