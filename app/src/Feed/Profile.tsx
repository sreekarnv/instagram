import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Subheading, Title, Avatar } from 'react-native-paper';
import Loader from '../components/Loader';
import {
	Post,
	useGetUserPostsQuery,
	useLogoutMutation,
	useMeQuery,
} from '../graphql/generated';
import { useApolloClient } from '@apollo/client';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import PostItem from '../components/PostItem';

const Profile: React.FC = () => {
	const { data, loading } = useMeQuery();
	const [logout, { loading: logoutLoading }] = useLogoutMutation();
	const apolloClient = useApolloClient();
	const { data: posts, loading: postsLoading } = useGetUserPostsQuery({
		variables: {
			limit: 10,
		},
	});

	if (loading || logoutLoading || postsLoading) {
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
						style={{ marginBottom: 20 }}
						onPress={() => {
							return logout({
								update: async () => {
									await apolloClient.resetStore();
								},
							});
						}}
						mode='contained'>
						Logout
					</Button>
				</View>
				<View style={{ flex: 1 }}>
					{posts?.getUserPosts.length && (
						<FlatList
							data={posts?.getUserPosts}
							renderItem={({ item }: { item: Post }) => {
								return <PostItem post={item} />;
							}}
							keyExtractor={(p) => p.id}
						/>
					)}
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
		paddingVertical: 10,
	},
	empty: {
		textAlign: 'center',
	},
});

export default Profile;
