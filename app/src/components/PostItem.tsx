import * as React from 'react';
import { Post } from '../graphql/generated';
import { Image, StyleSheet, View } from 'react-native';
import { Avatar, Paragraph, Subheading } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

interface PostProps {
	post: Post;
}

const PostItem: React.FC<PostProps> = ({ post }) => {
	return (
		<>
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
				<Paragraph style={styles.postDescription}>
					{post?.description}
				</Paragraph>
			</View>
		</>
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
});

export default PostItem;
