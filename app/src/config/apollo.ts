import env from './env';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	credentials: 'include',
	uri: env.SERVER_URL,
});

export default apolloClient;
