import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

type ButtonProps = RectButtonProps;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<>
			<RectButton
				style={{ ...styles.button, backgroundColor: 'purple' }}
				{...props}>
				<Text style={styles.text}>{children}</Text>
			</RectButton>
		</>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'purple',
		borderWidth: 2,
		borderRadius: 30,
		padding: 5,
	},
	text: {
		textAlign: 'center',
		fontSize: 16,
		color: '#f2f2f2',
	},
});

export default Button;
