import * as React from 'react';
import { StyleSheet } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RectButton } from 'react-native-gesture-handler';
import theme from '../config/theme';
import Text from './Text';

type ButtonProps = RectButtonProps & {
	color?: 'primary' | 'danger' | 'dark' | 'light' | 'light50';
};

const Button: React.FC<ButtonProps> = ({
	children,
	color = 'primary',
	...props
}) => {
	return (
		<>
			<RectButton
				style={{ ...styles.button, backgroundColor: theme.colors[color] }}
				{...props}>
				<Text style={styles.text}>{children}</Text>
			</RectButton>
		</>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: theme.colors.primary,
		borderWidth: 2,
		borderRadius: 30,
		padding: theme.spacing.sm,
	},
	text: {
		textAlign: 'center',
		fontSize: 16,
		color: theme.colors.light,
	},
});

export default Button;
