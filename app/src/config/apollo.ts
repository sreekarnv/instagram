import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const client = new ApolloClient({
	uri: `${Constants.manifest?.extra?.SERVER_URL}/graphql`,
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					getAllPosts: {
						keyArgs: false,
						merge(existing, incoming) {
							if (!existing || !existing.posts) return incoming;

							const updated = {
								__typename: 'PostsResponseType',
								...incoming,
								posts: [...existing.posts, ...incoming.posts],
							};

							return updated;
						},
					},
				},
			},
		},
	}),
	credentials: 'include',
});

export default client;
