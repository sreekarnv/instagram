import * as React from 'react';
import { Post, useLikePostMutation } from '../graphql/generated';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Paragraph, Subheading, Text } from 'react-native-paper';
import { AntDesign, Feather } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface PostProps {
	post: Post;
}

const PostItem: React.FC<PostProps> = ({ post }) => {
	const [likePost] = useLikePostMutation();

	return (
		<TouchableWithoutFeedback>
			<View style={styles.root}>
				<View style={styles.header}>
					<Avatar.Icon
						size={35}
						icon={() => {
							return <Feather color='white' size={18} name='user' />;
						}}
					/>
					<Subheading style={styles.username}>{post?.user.name}</Subheading>
				</View>
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={{ uri: post.photo! }} />
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
				<Paragraph style={styles.postDescription}>
					{post?.description}
				</Paragraph>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	root: {
		marginBottom: 20,
	},
	header: {
		alignItems: 'center',
		flexDirection: 'row',
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
		height: 300,
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
});

export default PostItem;
