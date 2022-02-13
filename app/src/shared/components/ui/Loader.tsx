import { useTheme } from '@shopify/restyle';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Theme } from '../../../config/theme';
import Box from './Box';

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
	const theme = useTheme<Theme>();

	return (
		<>
			<Box flex={1} justifyContent='center' alignItems='center'>
				<ActivityIndicator size='large' color={theme.colors.secondary} />
			</Box>
		</>
	);
};

export default Loader;
