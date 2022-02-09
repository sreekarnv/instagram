import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import {
	GetMeDocument,
	useGetMeQuery,
	useUpdateUserPhotoAvatarMutation,
} from '../../graphql/generated';
import Avatar from '../../shared/components/ui/Avatar';
import Box from '../../shared/components/ui/Box';
import Loader from '../../shared/components/ui/Loader';
import Text from '../../shared/components/ui/Text';
import { ProfileScreenProp } from './types';

interface EditAvatarScreenProps extends ProfileScreenProp<'EditAvatar'> {}

const EditAvatarScreen: React.FC<EditAvatarScreenProps> = ({ navigation }) => {
	const { data, loading: userLoading } = useGetMeQuery();
	const [selected, setSelected] = React.useState<number>(1);
	const [updatePhoto, { loading }] = useUpdateUserPhotoAvatarMutation();

	React.useEffect(() => {
		if (data?.user?.photo?.split('-')[1]) {
			setSelected(parseInt(data?.user?.photo?.split('-')[1]));
		}
	}, [data]);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<TouchableOpacity
						onPress={async () => {
							try {
								await updatePhoto({
									variables: { avatar: `avatar-${selected}.png` },
									update: (cache, { data }) => {
										cache.writeQuery({
											query: GetMeDocument,
											data: {
												user: {
													__typename: 'User',
													...data?.user,
												},
											},
										});
									},
								});

								navigation.navigate('ProfileHome');
							} catch (err: any) {
								showMessage({
									message: 'Update Profile Failed',
									description: err.message || 'Something Went Wrong',
									type: 'danger',
									duration: 4000,
									textStyle: {
										fontFamily: 'Poppins-500',
									},
									titleStyle: {
										fontFamily: 'Poppins-700',
									},
									icon: {
										icon: 'warning',
										position: 'right',
									},
								});
							}
						}}>
						<Feather name='check' size={20} />
					</TouchableOpacity>
				);
			},
		});
	}, [selected]);

	if (loading || userLoading) {
		return <Loader />;
	}

	return (
		<>
			<Box p='m' flexDirection={'row'} flexWrap={'wrap'} alignItems={'center'}>
				{Array(4)
					.fill(0)
					.map((_, i) => (
						<Box alignItems={'center'} mb='xl' width={'50%'} key={i}>
							<TouchableOpacity onPress={() => setSelected(i + 1)}>
								<Box
									borderWidth={4}
									borderColor={selected === i + 1 ? 'primary' : 'transparent'}
									borderRadius={200}
									padding={'s'}>
									<Avatar
										source={`${
											Constants.manifest?.extra?.SERVER_URL
										}/uploads/avatars/avatar-${i + 1}.png`}
									/>
								</Box>
								<Box mt='s'>
									<Text textAlign='center' variant='label'>
										Avatar {i + 1}
									</Text>
								</Box>
							</TouchableOpacity>
						</Box>
					))}
			</Box>

			<Box mt='xl' alignItems={'center'} justifyContent={'center'}>
				<Text textAlign='center' variant='title3'>
					Currently Selected
				</Text>
				<Text textAlign='center' color='secondary' variant='title2'>
					Avatar {selected}
				</Text>
			</Box>
		</>
	);
};

export default EditAvatarScreen;
