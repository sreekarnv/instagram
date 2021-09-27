import { SERVER_URL } from '@env';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					getAllPosts: {
						keyArgs: false,
						merge(
							existing = {
								__typename: 'PostsResponse',
								hasNext: true,
								posts: [],
							},
							incoming
						) {
							let updated: any = {
								__typename: 'PostsResponse',
								hasNext: true,
								posts: [],
							};

							if (!existing?.posts?.length) {
								return incoming;
							}

							if (existing?.posts[0].__ref === incoming?.posts[0].__ref) {
								return existing;
							}

							updated.hasNext = incoming.hasNext;
							updated.posts = [...existing.posts, ...incoming.posts];
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
		uri: `${SERVER_URL}/graphql`,
	}),
});

export default apolloClient;
