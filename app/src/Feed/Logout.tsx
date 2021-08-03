import * as React from 'react';
import { Button, View } from 'react-native';

import { useLogoutMutation } from '../graphql/generated';
import { useApolloClient } from '@apollo/client';
import { MainNavigatorProps } from '../navigation/MainNavigator';

type LogoutProps = MainNavigatorProps;

const Logout: React.FC<LogoutProps> = ({ navigation }: any) => {
	const [logout, { loading }] = useLogoutMutation();
	const apolloClient = useApolloClient();

	return (
		<>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Button
					title={loading ? 'Loading...' : 'Logout'}
					onPress={() => {
						return logout({
							update: async () => {
								await apolloClient.resetStore();
								navigation.navigate('Login');
							},
						});
					}}
				/>
			</View>
		</>
	);
};

export default Logout;
