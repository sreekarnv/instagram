import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { Subheading, Title } from 'react-native-paper';
import { useMeQuery } from '../graphql/generated';
import { MainNavigatorProps } from '../navigation/MainNavigator';
import Loader from '../components/Loader';
import { Avatar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

type ProfileProps = MainNavigatorProps;

const Profile: React.FC<ProfileProps> = () => {
	const { data, loading } = useMeQuery();

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<View style={styles.root}>
				<View style={styles.user}>
					<Avatar.Icon
						icon={() => {
							return <Feather name='user' size={35} color='#fff' />;
						}}
					/>
					<View style={styles.userInfo}>
						<Title>{data?.me?.name}</Title>
						<Subheading>{data?.me?.email}</Subheading>
					</View>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	user: {
		margin: 15,
		borderRadius: 10,
		elevation: 5,
		backgroundColor: '#fff',
		paddingVertical: 20,
		paddingHorizontal: 10,
		flexDirection: 'row',
	},
	userInfo: {
		marginLeft: 15,
	},
	logout: {
		margin: 10,
	},
});

export default Profile;
