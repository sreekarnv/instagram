import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';

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
	// @ts-ignore
	link: createUploadLink({
		uri: `${Constants.manifest?.extra?.SERVER_URL}/graphql`,
	}),
});

export default client;
