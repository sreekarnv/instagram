import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { Button, Subheading, Title } from 'react-native-paper';
import { useMeQuery } from '../graphql/generated';
import { MainNavigatorProps } from '../navigation/MainNavigator';
import Loader from '../components/Loader';
import { useLogoutMutation } from '../graphql/generated';
import { Avatar } from 'react-native-paper';
import { useApolloClient } from '@apollo/client';
import { Feather } from '@expo/vector-icons';

type ProfileProps = MainNavigatorProps;

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
	const { data, loading } = useMeQuery();
	const [logout] = useLogoutMutation();
	const apolloClient = useApolloClient();

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
				<View style={styles.logout}>
					<Button
						onPress={async () => {
							logout({
								update: async () => {
									await apolloClient.resetStore();
									navigation.replace('Login');
								},
							});
						}}
						mode='contained'>
						Logout
					</Button>
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
		paddingHorizontal: 15,
	},
});

export default Profile;
