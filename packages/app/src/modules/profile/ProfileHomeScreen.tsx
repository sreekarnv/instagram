import React from 'react';
import { Feather } from '@expo/vector-icons';
import {
	GetMeDocument,
	useGetMeDetailQuery,
	useLogoutMutation,
} from '../../graphql/generated';
import Avatar from '../../shared/components/ui/Avatar';
import Box from '../../shared/components/ui/Box';
import GradientButton from '../../shared/components/ui/GradientButton';
import Text from '../../shared/components/ui/Text';
import Constants from 'expo-constants';
import { ProfileScreenProp } from './types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../config/theme';
import Loader from '../../shared/components/ui/Loader';

interface ProfileHomeScreenProps extends ProfileScreenProp<'ProfileHome'> {}

const ProfileHomeScreen: React.FC<ProfileHomeScreenProps> = ({
	navigation,
}) => {
	const { data, loading } = useGetMeDetailQuery();
	const [logoutUser, { loading: logoutLoading }] = useLogoutMutation();
	const theme = useTheme<Theme>();

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<Box padding={'l'}>
				{data && (
					<Box alignItems='center' mb='xl'>
						<Box mb='m' position='relative'>
							<Avatar
								source={`${Constants.manifest?.extra?.SERVER_URL}${data.user?.photo}`}
							/>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('EditAvatar');
								}}
								style={[
									styles.editButton,
									{ backgroundColor: theme.colors.secondary },
								]}>
								<Feather name='edit-2' size={20} />
							</TouchableOpacity>
						</Box>
						<Box>
							<Text textAlign='center' variant='title3'>
								{data.user?.name}
							</Text>
							<Text textAlign='center' variant='link'>
								{data.user?.email}
							</Text>
						</Box>
					</Box>
				)}
				<Box justifyContent='center' alignItems='center'>
					<GradientButton
						onPress={() =>
							logoutUser({
								update: async (cache) => {
									cache.writeQuery({
										query: GetMeDocument,
										data: {
											__typename: 'User',
											user: null,
										},
									});
								},
							})
						}>
						{logoutLoading ? 'Loading...' : 'Logout'}
					</GradientButton>
				</Box>
			</Box>
		</>
	);
};

const styles = StyleSheet.create({
	editButton: {
		position: 'absolute',
		bottom: -10,
		right: -10,
		padding: 8,
		borderRadius: 10,
	},
});

export default ProfileHomeScreen;
