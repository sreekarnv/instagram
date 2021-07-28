import React from 'react';
import Navigation from './src/navigation';
import apolloClient from './src/config/apollo';
import { ApolloProvider } from '@apollo/client';

const App: React.FC = () => {
	return (
		<ApolloProvider client={apolloClient}>
			<Navigation />
		</ApolloProvider>
	);
};

export default App;
