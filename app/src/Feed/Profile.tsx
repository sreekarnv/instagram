import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	Button,
	Subheading,
	Title,
	Avatar,
	Paragraph,
} from 'react-native-paper';
import { MainNavigatorProps } from '../navigation/MainNavigator';
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

type ProfileProps = MainNavigatorProps;

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
	const { data, loading } = useMeQuery();
	const [logout] = useLogoutMutation();
	const apolloClient = useApolloClient();
	const { data: posts, loading: postsLoading } = useGetUserPostsQuery({
		variables: {
			limit: 10,
		},
	});

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
						style={{ marginBottom: 20 }}
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
				{postsLoading && (
					<View>
						<Paragraph>Loading...</Paragraph>
					</View>
				)}
				<View style={{ flex: 1 }}>
					{posts?.getUserPosts && (
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
});

export default Profile;
