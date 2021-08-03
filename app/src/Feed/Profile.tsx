import * as React from 'react';
import { View } from 'react-native';

import { useLogoutMutation, useMeQuery } from '../graphql/generated';
import { useApolloClient } from '@apollo/client';
import { MainNavigatorProps } from '../navigation/MainNavigator';
import Box from '../components/Box';
import Text from '../components/Text';
import Button from '../components/Button';

type LogoutProps = MainNavigatorProps;

const Logout: React.FC<LogoutProps> = ({ navigation }: any) => {
	const { data, loading: userLoading } = useMeQuery();
	const [logout, { loading }] = useLogoutMutation();
	const apolloClient = useApolloClient();

	if (userLoading) {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: '#000',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#222',
				}}>
				<Box mb='xl'>
					<Box mb='md'>
						<Text textAlign='center' color='light50'>
							Logged In As:
						</Text>
					</Box>

					<Text textAlign='center' color='light' fontSize={30}>
						{data?.me?.name}
					</Text>
					<Text color='light50' textAlign='center'>
						{data?.me?.email}
					</Text>
				</Box>
				<Button
					onPress={() => {
						return logout({
							update: async () => {
								await apolloClient.resetStore();
								navigation.replace('Login');
							},
						});
					}}>
					{loading ? 'Loading...' : 'Logout'}
				</Button>
			</View>
		</>
	);
};

export default Logout;
