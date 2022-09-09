import React from 'react';
import { FlatList } from 'react-native';
import {
	GetAllPostsDocument,
	useGetAllPostsQuery,
} from '../../graphql/generated';
import Box from '../../shared/components/ui/Box';
import Text from '../../shared/components/ui/Text';
import PostItem from './components/PostItem';

interface FeedScreenProps {}

const FeedScreen: React.FC<FeedScreenProps> = ({}) => {
	const { loading, data, fetchMore } = useGetAllPostsQuery({
		variables: {
			limit: 4,
		},
	});

	if (loading) {
		return (
			<Box pt='xl' px='m' flex={1} alignItems='center'>
				<Text variant='label' textAlign='center'>
					Loading Feed...
				</Text>
			</Box>
		);
	}

	return (
		<Box>
			<FlatList
				data={data?.query?.posts}
				renderItem={({ item }) => <PostItem key={item.id} post={item as any} />}
				onEndReached={async () => {
					if (data?.query.hasMore) {
						await fetchMore({
							query: GetAllPostsDocument,
							variables: {
								id: data?.query.posts[data?.query.posts.length - 1].id,
								cursor:
									data?.query?.posts[data?.query?.posts.length - 1]?.createdAt,
							},
						});
					}
				}}
			/>
		</Box>
	);
};

export default FeedScreen;
