import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CapturePhotoScreen from '../post/CapturePhotoScreen';
import PhotoPreviewScreen from '../post/PhotoPreviewScreen';
import { PostNavigatorParamList } from '../post/types';

interface PostNavigatorProps {}

const Post = createNativeStackNavigator<PostNavigatorParamList>();

const PostNavigator: React.FC<PostNavigatorProps> = ({}) => {
	return (
		<>
			<Post.Navigator
				screenOptions={{
					title: 'Create Post',
					headerTitleStyle: {
						fontFamily: 'Poppins-600',
					},
				}}>
				<Post.Screen name='CapturePhoto' component={CapturePhotoScreen} />
				<Post.Screen
					options={{ title: 'Preview' }}
					name='PhotoPreview'
					component={PhotoPreviewScreen}
				/>
			</Post.Navigator>
		</>
	);
};

export default PostNavigator;
