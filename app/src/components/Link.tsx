import * as React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { Caption } from 'react-native-paper';

interface LinkProps {
	onPress: (event: GestureResponderEvent) => void;
}

const Link: React.FC<LinkProps> = ({ children, onPress }) => {
	return (
		<>
			<TouchableOpacity onPress={onPress}>
				<Caption
					style={{
						fontSize: 15,
						textDecorationLine: 'underline',
						textAlign: 'center',
					}}>
					{children}
				</Caption>
			</TouchableOpacity>
		</>
	);
};

export default Link;
