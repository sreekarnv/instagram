import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Box from './Box';
import Text from './Text';

interface GradientButtonProps {
	onPress: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({
	onPress,
	children,
}) => {
	return (
		<>
			<LinearGradient
				style={{ borderRadius: 100 }}
				end={{ x: 1, y: 0 }}
				start={{ x: 0, y: 0 }}
				colors={['#facc15', '#fac00e', '#f9b50a', '#f7a909', '#f59e0b']}>
				<TouchableOpacity
					onPress={onPress}
					style={{
						paddingVertical: 10,
						paddingHorizontal: 25,
						borderRadius: 500,
					}}>
					<Box>
						<Text variant='button'>{children}</Text>
					</Box>
				</TouchableOpacity>
			</LinearGradient>
		</>
	);
};

export default GradientButton;
