import { Post, useGetAllPostsQuery } from '../graphql/generated';
import * as React from 'react';
import { Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Box from '../components/Box';
import Text from '../components/Text';
import theme from '../config/theme';
import { FlatList } from 'react-native-gesture-handler';
import PostItem from '../components/PostItem';
import { MainNavigatorProps } from '../navigation/MainNavigator';

type HomePageProps = MainNavigatorProps;

const Feed: React.FC<HomePageProps> = ({ navigation }) => {
	const { data: posts } = useGetAllPostsQuery({
		variables: {
			limit: 10,
		},
	});

	return (
		<>
			<SafeAreaView
				style={{
					backgroundColor: theme.colors.dark,
					flex: 1,
					paddingHorizontal: 20,
					paddingVertical: 10,
				}}>
				<Box marginBottom={'md'}>
					<Text color='light' fontSize={30}>
						Feed
					</Text>
				</Box>

				<View style={{ marginBottom: 30 }}>
					<Button
						title='Go to Logout'
						onPress={() => {
							navigation.navigate('Home', {
								screen: 'Logout',
							});
						}}
					/>
				</View>

				<View style={{ flex: 1 }}>
					{posts?.getAllPosts && (
						<FlatList
							data={posts?.getAllPosts}
							renderItem={({ item }: { item: Post }) => {
								return <PostItem post={item} />;
							}}
							keyExtractor={(p) => p.id}
						/>
					)}
				</View>
			</SafeAreaView>
		</>
	);
};

export default Feed;
