import { useApolloClient } from '@apollo/client';
import * as React from 'react';
import Loader from '../components/Loader';
import { useLogoutMutation } from '../graphql/generated';
import { MainNavigatorProps } from '../navigation/MainNavigator';

type LogoutProps = MainNavigatorProps;

const Logout: React.FC<LogoutProps> = ({ navigation }) => {
	const [logout] = useLogoutMutation();
	const apolloClient = useApolloClient();

	React.useEffect(() => {
		logout({
			update: async () => {
				await apolloClient.resetStore();
				navigation.replace('Login');
			},
		});
	}, [logout]);

	return (
		<>
			<Loader />
		</>
	);
};

export default Logout;
