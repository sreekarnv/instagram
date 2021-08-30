import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { Avatar, TouchableRipple, useTheme } from 'react-native-paper';
import FormInput from '../components/FormInput';
import Loader from '../components/Loader';
import { useMeQuery, useUpdateProfileMutation } from '../graphql/generated';
import { ProfileStackNavProps } from '../navigation/types';
import * as ImagePicker from 'expo-image-picker';
import * as mime from 'react-native-mime-types';
import { ReactNativeFile } from 'apollo-upload-client';
import { SERVER_URL } from '@env';

const EditProfile: React.FC<ProfileStackNavProps<'EditProfile'>> = ({
	navigation,
}) => {
	const { data } = useMeQuery();
	const theme = useTheme();
	const submit = React.useRef<any>();
	const [permission, setPermission] = React.useState(false);
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);

	const [updateProfile, { loading }] = useUpdateProfileMutation();

	React.useEffect(() => {
		navigation.setParams({ submit });
	}, []);

	React.useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { granted } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				setPermission(granted);
			}
		})();
	}, []);

	if (loading) {
		return <Loader />;
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			setImageUrl(result.uri);
		}
	};

	return (
		<>
			<View
				style={{
					paddingVertical: 30,
					paddingHorizontal: 20,
					flex: 1,
				}}>
				<Formik
					onSubmit={async ({ name, email }) => {
						let vars: any = {
							name,
							email,
						};
						if (permission) {
							if (imageUrl) {
								vars.photo = new ReactNativeFile({
									uri: imageUrl,
									type: mime.lookup(imageUrl) || 'image',
									name: `filename-${data?.me?.name}`,
								});
							}

							await updateProfile({
								variables: {
									...vars,
								},
								update: async (cache) => {
									await cache.reset();
								},
							});
						}
					}}
					initialValues={{
						name: data?.me?.name || '',
						email: data?.me?.email || '',
					}}>
					{({ handleSubmit }) => {
						submit.current = handleSubmit;
						return (
							<>
								<View
									style={{
										justifyContent: 'center',
										flexDirection: 'row',
										marginBottom: 30,
									}}>
									<View
										style={{
											alignItems: 'flex-end',
										}}>
										{imageUrl ? (
											<Avatar.Image size={100} source={{ uri: imageUrl }} />
										) : (
											<>
												{data?.me?.photo ? (
													<Avatar.Image
														size={100}
														source={{ uri: `${SERVER_URL}/${data.me.photo}` }}
													/>
												) : (
													<Avatar.Icon
														size={100}
														icon={() => {
															return (
																<Feather color='white' size={50} name='user' />
															);
														}}
													/>
												)}
											</>
										)}
										<>
											{imageUrl ? (
												<TouchableRipple
													onPress={() => {
														setImageUrl(null);
													}}
													style={{
														position: 'absolute',
														backgroundColor: 'white',
														padding: 8,
														borderRadius: 200,
														zIndex: 30,
														bottom: -5,
														right: -5,
													}}>
													<MaterialIcons
														color={theme.colors.primary}
														name='delete'
														size={17}
													/>
												</TouchableRipple>
											) : (
												<TouchableRipple
													onPress={() => {
														return pickImage();
													}}
													style={{
														position: 'absolute',
														backgroundColor: 'white',
														padding: 8,
														borderRadius: 200,
														zIndex: 30,
														bottom: -5,
														right: -5,
													}}>
													<Feather
														color={theme.colors.primary}
														name='edit-2'
														size={17}
													/>
												</TouchableRipple>
											)}
										</>
									</View>
								</View>
								<FormInput name='name' label='Name' />
								<FormInput name='email' label='Email' />
							</>
						);
					}}
				</Formik>
			</View>
		</>
	);
};

export default EditProfile;
