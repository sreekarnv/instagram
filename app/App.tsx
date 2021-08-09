import React from 'react';
import Navigation from './src/navigation';
import apolloClient from './src/config/apollo';
import { ApolloProvider } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { Provider as ThemeProvider } from 'react-native-paper';

const App: React.FC = () => {
	return (
		<ApolloProvider client={apolloClient}>
			<ThemeProvider>
				<StatusBar style='dark' />
				<Navigation />
			</ThemeProvider>
		</ApolloProvider>
	);
};

export default App;
