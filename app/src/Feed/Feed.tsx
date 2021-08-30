import { Post, useGetAllPostsQuery } from '../graphql/generated';
import * as React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PostItem from '../components/PostItem';

const Feed: React.FC = () => {
	const { data: posts, fetchMore } = useGetAllPostsQuery({
		variables: {
			limit: 8,
		},
	});

	return (
		<>
			<View style={{ flex: 1 }}>
				{posts?.getAllPosts.posts && (
					<FlatList
						data={posts?.getAllPosts.posts}
						renderItem={({ item }: { item: Post }) => {
							return <PostItem post={item} />;
						}}
						keyExtractor={(p) => p.id}
						onEndReached={async () => {
							if (posts.getAllPosts.hasNext) {
								await fetchMore({
									variables: {
										limit: 8,
										cursor:
											posts.getAllPosts.posts![
												posts.getAllPosts.posts!.length - 1
											].createdAt,
									},
								});
							}
						}}
					/>
				)}
			</View>
		</>
	);
};

export default Feed;
