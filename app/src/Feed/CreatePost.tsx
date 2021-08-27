import { Formik } from 'formik';
import * as React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import FormInput from '../components/FormInput';
import { useCreatePostMutation } from '../graphql/generated';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const CreatePost: React.FC = () => {
	const [createPost, { loading }] = useCreatePostMutation();
	const isFocused = useIsFocused();
	const [hasPermission, setHasPermission] = React.useState<any>(null);
	const cameraRef = React.useRef<Camera>(null);
	const [type, setType] = React.useState(Camera.Constants.Type.back);

	React.useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	if (!hasPermission) {
		return <Text>No access to camera</Text>;
	}

	return (
		<>
			<View style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					{isFocused && (
						<Camera
							ratio='16:9'
							ref={cameraRef}
							style={{ height, width, aspectRatio: 9 / 16 }}
							type={type}
						/>
					)}
				</View>
				<TouchableOpacity
					style={{
						position: 'absolute',
						bottom: 35,
						left: 35,
					}}
					onPress={() => {
						setType(
							type === Camera.Constants.Type.back
								? Camera.Constants.Type.front
								: Camera.Constants.Type.back
						);
					}}>
					<Feather name='repeat' style={{ color: 'white' }} size={24} />
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						position: 'absolute',
						bottom: 22,
						left: '43%',
					}}
					onPress={async () => {
						const data = await cameraRef.current?.takePictureAsync();
						console.log(data);
					}}>
					<View
						style={{ borderWidth: 3, borderColor: 'white', borderRadius: 300 }}>
						<Entypo name='controller-record' size={45} color='white' />
					</View>
				</TouchableOpacity>

				{/* <Formik
					initialValues={{
						description: '',
					}}
					onSubmit={async ({ description }, { resetForm }) => {
						await createPost({
							variables: {
								description,
								photo: 'https://source.unsplash.com/random/256x266',
							},
							update: () => {
								resetForm();
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
				</Formik> */}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		margin: 20,
	},
	button: {
		flex: 0.1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 18,
		color: 'white',
	},
});

export default CreatePost;
