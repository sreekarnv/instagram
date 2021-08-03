import * as React from 'react';
import Box from './Box';
import { Post } from '../graphql/generated';
import Text from './Text';
import Button from './Button';
import { Image } from 'react-native';

interface PostProps {
	post: Post;
}

const PostItem: React.FC<PostProps> = ({ post }) => {
	return (
		<>
			<Box
				borderRadius='sm'
				backgroundColor='black'
				marginBottom='md'
				padding='md'>
				<Box justifyContent='flex-end' flexDirection='row'>
					<Text marginBottom='lg' color='light50' fontSize={18}>
						{post?.user.name}
					</Text>
				</Box>
				<Box marginBottom='md'>
					<Image
						style={{
							height: 300,
							width: '100%',
						}}
						source={{ uri: post.photo! }}
					/>
				</Box>
				<Text marginBottom='lg' color='light'>
					{post?.description}
				</Text>
				<Box flexDirection='row' alignItems='center' justifyContent='flex-end'>
					<Text color='danger' marginRight='sm'>
						20
					</Text>
					<Button>Like</Button>
				</Box>
			</Box>
		</>
	);
};

export default PostItem;
