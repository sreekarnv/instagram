import React from 'react';
import { Image } from 'react-native';
import Box from './Box';

interface AvatarProps {
	size?: number;
	source?: string;
}

const Avatar: React.FC<AvatarProps> = ({ size = 100, source }) => {
	return (
		<>
			<Box height={size} width={size} overflow='hidden' borderRadius={400}>
				<Image
					style={{
						height: size,
						width: size,
					}}
					height={size}
					width={size}
					source={{ uri: source ?? 'https://source.unsplash.com/random' }}
				/>
			</Box>
		</>
	);
};

export default Avatar;
