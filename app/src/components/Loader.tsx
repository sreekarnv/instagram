import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
	return (
		<View style={styles.root}>
			<ActivityIndicator />
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
});

export default Loader;
