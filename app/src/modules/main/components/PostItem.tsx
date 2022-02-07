import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Image, Dimensions } from 'react-native';
import { Post } from '../../../graphql/generated';
import Avatar from '../../../shared/components/ui/Avatar';
import Box from '../../../shared/components/ui/Box';
import Text from '../../../shared/components/ui/Text';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

interface PostItemProps {
	post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
	const [show, setShow] = React.useState<boolean>(false);

	return (
		<>
			<Box backgroundColor='white' width='100%'>
				<Box
					paddingHorizontal='s'
					paddingVertical='m'
					flexDirection='row'
					alignItems='center'
					justifyContent='space-between'>
					<Box flexDirection='row' alignItems='center'>
						<Avatar
							source={`${Constants.manifest?.extra?.SERVER_URL}${post.user.photo}`}
							size={50}
						/>
						<Text ml='s' variant='label'>
							{post.user.name}
						</Text>
					</Box>
					<TouchableOpacity
						style={{
							width: 30,
							height: 30,
						}}>
						<Box
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							height={30}
							width={30}>
							<Feather name='more-vertical' size={20} />
						</Box>
					</TouchableOpacity>
				</Box>
				<Box>
					<Image
						style={{ minHeight: 400, width }}
						source={{ uri: post.photo! }}
					/>
				</Box>
				<Box p='m' alignItems='flex-end'>
					<Box flexDirection='row' alignItems='center'>
						<TouchableOpacity>
							<Feather name='heart' size={28} />
						</TouchableOpacity>
						<Text
							color='black'
							style={{ paddingTop: 3 }}
							ml='m'
							variant='label'>
							1
						</Text>
					</Box>
				</Box>
				{post?.description.length > 100 ? (
					<Box px='m' pb='m'>
						<Text>
							<Text variant='label'>{post.user.name}- </Text>
							{!show ? post.description.slice(0, 100) : post.description}
							<Text
								color='secondary'
								onPress={() => setShow(!show)}
								style={{ textDecorationLine: 'underline' }}>
								{' '}
								{show ? 'Hide..' : 'Read More...'}
							</Text>
						</Text>
					</Box>
				) : (
					<Box px='m' pb='m'>
						<Text variant='label'>{post.user.name}- </Text>
						<Text>{post.description}</Text>
					</Box>
				)}
			</Box>
		</>
	);
};

export default PostItem;
