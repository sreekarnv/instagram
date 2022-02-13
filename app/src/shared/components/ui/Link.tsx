import { ResponsiveValue } from '@shopify/restyle';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Theme } from '../../../config/theme';
import Text from './Text';

interface LinkProps {
	text: string[];
	onPress: () => void;
	textAlign?: ResponsiveValue<
		'center' | 'auto' | 'left' | 'right' | 'justify' | undefined,
		Theme
	>;
}

const Link: React.FC<LinkProps> = ({ onPress, text, textAlign = 'auto' }) => {
	return (
		<>
			<TouchableOpacity onPress={onPress}>
				{text.map((line, index) => (
					<Text textAlign={textAlign} key={index} variant='link'>
						{line}
					</Text>
				))}
			</TouchableOpacity>
		</>
	);
};

export default Link;
