import React from 'react';
import Navigation from './src/navigation';
import apolloClient from './src/config/apollo';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@shopify/restyle';
import theme from './src/config/theme';
import { StatusBar } from 'expo-status-bar';

const App: React.FC = () => {
	return (
		<ApolloProvider client={apolloClient}>
			<StatusBar style='light' />
			<ThemeProvider theme={theme}>
				<Navigation />
			</ThemeProvider>
		</ApolloProvider>
	);
};

export default App;
