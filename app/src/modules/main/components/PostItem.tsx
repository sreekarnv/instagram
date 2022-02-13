import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import {
	TouchableOpacity,
	Image,
	Dimensions,
	ActivityIndicator,
	TouchableWithoutFeedback,
} from 'react-native';
import {
	GetPostDocument,
	Post,
	useLikePostMutation,
} from '../../../graphql/generated';
import Avatar from '../../../shared/components/ui/Avatar';
import Box from '../../../shared/components/ui/Box';
import Text from '../../../shared/components/ui/Text';
import Constants from 'expo-constants';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../../config/theme';

const { width } = Dimensions.get('window');

interface PostItemProps {
	post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
	const [show, setShow] = React.useState<boolean>(false);
	const theme = useTheme<Theme>();
	const [likePost, { loading }] = useLikePostMutation();
	const [tap, setTap] = React.useState<number>(0);

	const handleLikePost = async () => {
		try {
			await likePost({
				variables: {
					postId: post.id,
				},
				update: (cache) => {
					cache.writeQuery({
						query: GetPostDocument,
						data: {
							__typename: 'Post',
							post: {
								...post,
								liked: !post.liked,
								numLikes: post.liked ? post.numLikes - 1 : post.numLikes + 1,
							},
						},
					});
				},
			});
		} catch (err) {}
	};

	React.useEffect(() => {
		(async () => {
			if (tap === 2) {
				await handleLikePost();
				setTap(0);
			}
		})();
	}, [tap]);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setTap(0);
		}, 200);

		return () => clearTimeout(timer);
	}, [tap]);

	return (
		<>
			<TouchableWithoutFeedback
				onPress={() => {
					setTap(tap + 1);
				}}>
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
							source={{
								uri: `${Constants.manifest?.extra?.SERVER_URL}${post.photo!}`,
							}}
						/>
					</Box>
					<Box p='m' alignItems='flex-end'>
						<Box flexDirection='row' alignItems='center'>
							<TouchableOpacity onPress={() => handleLikePost()}>
								{!loading ? (
									<>
										{post.liked ? (
											<FontAwesome
												name='heart'
												color={theme.colors.primary}
												size={28}
											/>
										) : (
											<FontAwesome name='heart-o' color={'black'} size={28} />
										)}
									</>
								) : (
									<>
										<ActivityIndicator color={theme.colors.secondary} />
									</>
								)}
							</TouchableOpacity>
							<Box width={30}>
								<Text
									color='black'
									style={{ paddingTop: 3 }}
									ml='m'
									variant='label'>
									{post.numLikes}
								</Text>
							</Box>
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
			</TouchableWithoutFeedback>
		</>
	);
};

export default PostItem;
