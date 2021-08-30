import { SERVER_URL } from '@env';
import * as React from 'react';
import {
	Post,
	useLikePostMutation,
	useMeQuery,
	useDeletePostMutation,
} from '../graphql/generated';
import {
	Image,
	StyleSheet,
	TouchableOpacity,
	View,
	Dimensions,
} from 'react-native';
import {
	Avatar,
	Menu,
	Paragraph,
	Subheading,
	Text,
	useTheme,
} from 'react-native-paper';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

interface PostProps {
	post: Post;
}

const PostItem: React.FC<PostProps> = ({ post }) => {
	const { data } = useMeQuery();
	const theme = useTheme();
	const [visible, setVisible] = React.useState(false);
	const [likePost] = useLikePostMutation();
	const [show, setShow] = React.useState<boolean>(false);
	const [tap, setTap] = React.useState<number>(0);
	const [deletePost] = useDeletePostMutation({
		variables: {
			id: post.id,
		},
	});

	React.useEffect(() => {
		(async () => {
			if (tap === 2) {
				likePost({
					variables: { postId: post.id },
					update: async (cache) => {
						await cache.reset();
					},
				});
				setTap(0);
			}
		})();
	}, [tap]);

	React.useEffect(() => {
		setTimeout(() => {
			setTap(0);
		}, 200);
	}, [tap]);

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				setTap(tap + 1);
			}}>
			<View style={styles.root}>
				<View style={styles.header}>
					<View style={styles.avatar}>
						{post.user.photo ? (
							<Avatar.Image
								size={35}
								source={{ uri: `${SERVER_URL}/${post.user.photo}` }}
							/>
						) : (
							<Avatar.Icon
								size={35}
								icon={() => {
									return <Feather color='white' size={18} name='user' />;
								}}
							/>
						)}
						<Subheading style={styles.username}>{post?.user.name}</Subheading>
					</View>
					{data?.me?.id === post.user.id && (
						<Menu
							visible={visible}
							onDismiss={() => {
								setVisible(false);
							}}
							anchor={
								<TouchableOpacity
									onPress={() => {
										setVisible(true);
									}}
									style={{ paddingRight: 10 }}>
									<Feather name='more-vertical' size={24} color='black' />
								</TouchableOpacity>
							}>
							<Menu.Item
								titleStyle={{ color: theme.colors.error }}
								onPress={() => {
									return deletePost({
										update: async (cache) => {
											await cache.reset();
										},
									});
								}}
								title='Delete Post'
								icon={() => (
									<MaterialIcons
										color={theme.colors.error}
										name='delete'
										size={20}
									/>
								)}
							/>
						</Menu>
					)}
				</View>
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						source={{
							uri: post.photo?.includes('https://')
								? post.photo!
								: `${SERVER_URL}/${post.photo}`,
						}}
					/>
				</View>
				<View style={styles.cta}>
					<TouchableOpacity
						onPress={() =>
							likePost({
								variables: { postId: post.id },
								update: async (cache) => {
									await cache.reset();
								},
							})
						}
						style={styles.iconBtn}>
						<AntDesign
							color={post.liked ? 'red' : 'black'}
							name={post.liked ? 'heart' : 'hearto'}
							size={25}
						/>
						<Text
							style={{ marginLeft: 10, color: post.liked ? 'red' : 'black' }}>
							{post.numLikes}
						</Text>
					</TouchableOpacity>
				</View>
				{post?.description.length > 100 ? (
					<View>
						<Paragraph style={styles.postDescription}>
							<Paragraph style={styles.descUser}>{post.user.name}- </Paragraph>
							{!show ? post.description.slice(0, 100) : post.description}
							<Text
								onPress={() => setShow(!show)}
								style={{ textDecorationLine: 'underline' }}>
								{' '}
								{show ? 'Hide..' : 'Read More...'}
							</Text>
						</Paragraph>
					</View>
				) : (
					<Paragraph style={styles.postDescription}>
						<Paragraph style={styles.descUser}>{post.user.name}- </Paragraph>
						{post.description}
					</Paragraph>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	root: {
		marginBottom: 20,
	},
	avatar: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	header: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 20,
		paddingHorizontal: 10,
	},
	username: {
		color: 'black',
		fontSize: 14,
		marginLeft: 10,
	},
	imageContainer: {
		marginBottom: 20,
	},
	image: {
		height: height - 400,
		width: '100%',
	},
	postDescription: {
		marginBottom: 20,
		color: 'black',
		padding: 10,
	},
	cta: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingHorizontal: 2,
	},
	iconBtn: {
		marginHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	descUser: { marginRight: 10, fontWeight: 'bold' },
});

export default PostItem;
