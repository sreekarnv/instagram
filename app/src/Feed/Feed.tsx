import { Post, useGetAllPostsQuery } from '../graphql/generated';
import * as React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PostItem from '../components/PostItem';
import { MainNavigatorProps } from '../navigation/MainNavigator';

type FeedProps = MainNavigatorProps;

const Feed: React.FC<FeedProps> = () => {
	const { data: posts } = useGetAllPostsQuery({
		variables: {
			limit: 8,
		},
	});

	return (
		<>
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
		</>
	);
};

export default Feed;
