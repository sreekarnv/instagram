import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CreatePostInput = {
  description: Scalars['String'];
  photo: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  deleteAllPosts: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteUsers: Scalars['Boolean'];
  insertPosts: Scalars['Boolean'];
  insertUsers: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  loginUser: User;
  logout: Scalars['Boolean'];
  registerUser: User;
  updateHasRegistered: User;
  updateUserDetails: User;
  updateUserPhotoAvatar: User;
  updateUsersPhoto: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationLikePostArgs = {
  postId: Scalars['String'];
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationUpdateHasRegisteredArgs = {
  input: UpdateHasRegisteredInput;
};


export type MutationUpdateUserDetailsArgs = {
  input: UpdateUserDetailsInput;
};


export type MutationUpdateUserPhotoAvatarArgs = {
  avatar: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  liked: Scalars['Boolean'];
  numLikes: Scalars['Float'];
  photo?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type PostsResponseType = {
  __typename?: 'PostsResponseType';
  count: Scalars['Float'];
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Query = {
  __typename?: 'Query';
  getAllPosts: PostsResponseType;
  getAllUsers: Array<User>;
  getMe?: Maybe<User>;
  getPost: Post;
  getUserIds: Array<Scalars['String']>;
};


export type QueryGetAllPostsArgs = {
  cursor?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetPostArgs = {
  postId: Scalars['String'];
};

export type RegisterUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type UpdateHasRegisteredInput = {
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  photo: Scalars['String'];
};

export type UpdateUserDetailsInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  hasRegistered: Scalars['Boolean'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type MinUserFragment = { __typename?: 'User', id: string, email: string, photo?: string | null | undefined, name?: string | null | undefined };

export type PostFragment = { __typename?: 'Post', id: string, description: string, createdAt: any, photo?: string | null | undefined, liked: boolean, numLikes: number, user: { __typename?: 'User', id: string, email: string, photo?: string | null | undefined, name?: string | null | undefined } };

export type UserFragment = { __typename?: 'User', hasRegistered: boolean, phone?: string | null | undefined, id: string, email: string, photo?: string | null | undefined, name?: string | null | undefined };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: boolean };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', user: { __typename?: 'User', hasRegistered: boolean, phone?: string | null | undefined, id: string, email: string, photo?: string | null | undefined, name?: string | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', user: { __typename?: 'User', hasRegistered: boolean, phone?: string | null | undefined, id: string, email: string, photo?: string | null | undefined, name?: string | null | undefined } };

export type UpdateUserDetailsMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserDetailsMutation = { __typename?: 'Mutation', updateUserDetails: { __typename?: 'User', hasRegistered: boolean, phone?: string | null | undefined, id: string, email: string, photo?: string | null | undefined, name?: string | null | undefined } };

export type UpdateUserHasRegisteredMutationVariables = Exact<{
  name: Scalars['String'];
  photo: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserHasRegisteredMutation = { __typename?: 'Mutation', user: { __typename?: 'User', hasRegistered: boolean, phone?: string | null | undefined, id: string, email: string, photo?: string | null | undefined, name?: string | null | undefined } };

export type UpdateUserPhotoAvatarMutationVariables = Exact<{
  avatar: Scalars['String'];
}>;


export type UpdateUserPhotoAvatarMutation = { __typename?: 'Mutation', user: { __typename?: 'User', hasRegistered: boolean, phone?: string | null | undefined, id: string, email: string, photo?: string | null | undefined, name?: string | null | undefined } };

export type GetAllPostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['DateTime']>;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', query: { __typename?: 'PostsResponseType', count: number, hasMore: boolean, posts: Array<{ __typename?: 'Post', id: string, description: string, createdAt: any, photo?: string | null | undefined, liked: boolean, numLikes: number, user: { __typename?: 'User', id: string, email: string, photo?: string | null | undefined, name?: string | null | undefined } }> } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', user?: { __typename?: 'User', hasRegistered: boolean, phone?: string | null | undefined, id: string, email: string, photo?: string | null | undefined, name?: string | null | undefined } | null | undefined };

export type GetMeDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeDetailQuery = { __typename?: 'Query', user?: { __typename?: 'User', createdAt: any, hasRegistered: boolean, phone?: string | null | undefined, id: string, email: string, photo?: string | null | undefined, name?: string | null | undefined } | null | undefined };

export type GetPostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: string, description: string, createdAt: any, photo?: string | null | undefined, liked: boolean, numLikes: number, user: { __typename?: 'User', id: string, email: string, photo?: string | null | undefined, name?: string | null | undefined } } };

export const MinUserFragmentDoc = gql`
    fragment minUser on User {
  id
  email
  photo
  name
}
    `;
export const PostFragmentDoc = gql`
    fragment post on Post {
  id
  description
  createdAt
  photo
  liked
  numLikes
  user {
    ...minUser
  }
}
    ${MinUserFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment user on User {
  ...minUser
  hasRegistered
  phone
}
    ${MinUserFragmentDoc}`;
export const LikePostDocument = gql`
    mutation LikePost($postId: String!) {
  likePost(postId: $postId)
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  user: loginUser(input: {email: $email, password: $password}) {
    ...user
  }
}
    ${UserFragmentDoc}`;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $password: String!, $passwordConfirm: String!) {
  user: registerUser(
    input: {password: $password, passwordConfirm: $passwordConfirm, email: $email}
  ) {
    ...user
  }
}
    ${UserFragmentDoc}`;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      passwordConfirm: // value for 'passwordConfirm'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const UpdateUserDetailsDocument = gql`
    mutation UpdateUserDetails($name: String, $email: String, $phone: String) {
  updateUserDetails(input: {name: $name, email: $email, phone: $phone}) {
    ...user
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserDetailsMutationFn = Apollo.MutationFunction<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>;

/**
 * __useUpdateUserDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateUserDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserDetailsMutation, { data, loading, error }] = useUpdateUserDetailsMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useUpdateUserDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>(UpdateUserDetailsDocument, options);
      }
export type UpdateUserDetailsMutationHookResult = ReturnType<typeof useUpdateUserDetailsMutation>;
export type UpdateUserDetailsMutationResult = Apollo.MutationResult<UpdateUserDetailsMutation>;
export type UpdateUserDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateUserDetailsMutation, UpdateUserDetailsMutationVariables>;
export const UpdateUserHasRegisteredDocument = gql`
    mutation UpdateUserHasRegistered($name: String!, $photo: String!, $phone: String) {
  user: updateHasRegistered(input: {name: $name, phone: $phone, photo: $photo}) {
    ...user
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserHasRegisteredMutationFn = Apollo.MutationFunction<UpdateUserHasRegisteredMutation, UpdateUserHasRegisteredMutationVariables>;

/**
 * __useUpdateUserHasRegisteredMutation__
 *
 * To run a mutation, you first call `useUpdateUserHasRegisteredMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserHasRegisteredMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserHasRegisteredMutation, { data, loading, error }] = useUpdateUserHasRegisteredMutation({
 *   variables: {
 *      name: // value for 'name'
 *      photo: // value for 'photo'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useUpdateUserHasRegisteredMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserHasRegisteredMutation, UpdateUserHasRegisteredMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserHasRegisteredMutation, UpdateUserHasRegisteredMutationVariables>(UpdateUserHasRegisteredDocument, options);
      }
export type UpdateUserHasRegisteredMutationHookResult = ReturnType<typeof useUpdateUserHasRegisteredMutation>;
export type UpdateUserHasRegisteredMutationResult = Apollo.MutationResult<UpdateUserHasRegisteredMutation>;
export type UpdateUserHasRegisteredMutationOptions = Apollo.BaseMutationOptions<UpdateUserHasRegisteredMutation, UpdateUserHasRegisteredMutationVariables>;
export const UpdateUserPhotoAvatarDocument = gql`
    mutation UpdateUserPhotoAvatar($avatar: String!) {
  user: updateUserPhotoAvatar(avatar: $avatar) {
    ...user
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserPhotoAvatarMutationFn = Apollo.MutationFunction<UpdateUserPhotoAvatarMutation, UpdateUserPhotoAvatarMutationVariables>;

/**
 * __useUpdateUserPhotoAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateUserPhotoAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPhotoAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPhotoAvatarMutation, { data, loading, error }] = useUpdateUserPhotoAvatarMutation({
 *   variables: {
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useUpdateUserPhotoAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPhotoAvatarMutation, UpdateUserPhotoAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPhotoAvatarMutation, UpdateUserPhotoAvatarMutationVariables>(UpdateUserPhotoAvatarDocument, options);
      }
export type UpdateUserPhotoAvatarMutationHookResult = ReturnType<typeof useUpdateUserPhotoAvatarMutation>;
export type UpdateUserPhotoAvatarMutationResult = Apollo.MutationResult<UpdateUserPhotoAvatarMutation>;
export type UpdateUserPhotoAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateUserPhotoAvatarMutation, UpdateUserPhotoAvatarMutationVariables>;
export const GetAllPostsDocument = gql`
    query GetAllPosts($limit: Int, $cursor: DateTime) {
  query: getAllPosts(limit: $limit, cursor: $cursor) {
    count
    hasMore
    posts {
      ...post
    }
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
      }
export function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  user: getMe {
    ...user
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetMeDetailDocument = gql`
    query GetMeDetail {
  user: getMe {
    ...user
    createdAt
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetMeDetailQuery__
 *
 * To run a query within a React component, call `useGetMeDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeDetailQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeDetailQuery(baseOptions?: Apollo.QueryHookOptions<GetMeDetailQuery, GetMeDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeDetailQuery, GetMeDetailQueryVariables>(GetMeDetailDocument, options);
      }
export function useGetMeDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeDetailQuery, GetMeDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeDetailQuery, GetMeDetailQueryVariables>(GetMeDetailDocument, options);
        }
export type GetMeDetailQueryHookResult = ReturnType<typeof useGetMeDetailQuery>;
export type GetMeDetailLazyQueryHookResult = ReturnType<typeof useGetMeDetailLazyQuery>;
export type GetMeDetailQueryResult = Apollo.QueryResult<GetMeDetailQuery, GetMeDetailQueryVariables>;
export const GetPostDocument = gql`
    query GetPost($postId: String!) {
  post: getPost(postId: $postId) {
    ...post
  }
}
    ${PostFragmentDoc}`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;