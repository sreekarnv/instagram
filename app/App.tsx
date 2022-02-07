import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import client from './src/config/apollo';
import theme from './src/config/theme';
import { useFonts } from 'expo-font';
import Text from './src/shared/components/ui/Text';
import Navigator from './src/modules/navigation';

export default function App() {
	const [loaded] = useFonts({
		'Poppins-300': require('./assets/fonts/Poppins-300.ttf'),
		'Poppins-400': require('./assets/fonts/Poppins-400.ttf'),
		'Poppins-500': require('./assets/fonts/Poppins-500.ttf'),
		'Poppins-600': require('./assets/fonts/Poppins-600.ttf'),
		'Poppins-700': require('./assets/fonts/Poppins-700.ttf'),
		'Poppins-800': require('./assets/fonts/Poppins-800.ttf'),
	});

	if (!loaded) {
		return <Text>Loading...</Text>;
	}

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<NavigationContainer>
					<Navigator />
				</NavigationContainer>
			</ThemeProvider>
		</ApolloProvider>
	);
}
