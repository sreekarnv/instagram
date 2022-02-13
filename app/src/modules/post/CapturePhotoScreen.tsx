import React from 'react';
import Text from '../../shared/components/ui/Text';
import { useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Loader from '../../shared/components/ui/Loader';
import { PostScreenProp } from './types';

const { height, width } = Dimensions.get('window');

interface CapturePhotoScreenProps extends PostScreenProp<'CapturePhoto'> {}

const CapturePhotoScreen: React.FC<CapturePhotoScreenProps> = ({
	navigation,
}) => {
	const isFocused = useIsFocused();
	const [hasPermission, setHasPermission] = React.useState<any>(null);
	const cameraRef = React.useRef<Camera>(null);
	const [type, setType] = React.useState(Camera.Constants.Type.back);

	React.useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <Loader />;
	}

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<>
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
							navigation.navigate('PhotoPreview', { imageUrl: data!.uri });
						}}>
						<View
							style={{
								borderWidth: 3,
								borderColor: 'white',
								borderRadius: 300,
							}}>
							<Entypo name='controller-record' size={45} color='white' />
						</View>
					</TouchableOpacity>
				</View>
			</>
		</>
	);
};

export default CapturePhotoScreen;
