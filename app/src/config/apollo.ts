import { SERVER_URL } from '@env';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	credentials: 'include',
	// @ts-ignore
	link: createUploadLink({
		uri: `${SERVER_URL}/graphql`,
	}),
});

export default apolloClient;
