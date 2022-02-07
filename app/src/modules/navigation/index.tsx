import React from 'react';
import { useGetMeQuery } from '../../graphql/generated';
import Text from '../../shared/components/ui/Text';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import RegistrationNavigator from './RegistrationNavigator';

interface NavigatorProps {}

const Navigator: React.FC<NavigatorProps> = ({}) => {
	const { data, loading } = useGetMeQuery();

	console.log(data);

	if (loading) {
		return <Text>Loading...</Text>;
	}

	return (
		<>
			{data?.user ? (
				data.user.hasRegistered ? (
					<MainNavigator />
				) : (
					<RegistrationNavigator />
				)
			) : (
				<AuthNavigator />
			)}
		</>
	);
};

export default Navigator;
