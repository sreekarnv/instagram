import React from 'react';
import { useGetMeQuery } from '../../graphql/generated';
import Loader from '../../shared/components/ui/Loader';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import RegistrationNavigator from './RegistrationNavigator';

interface NavigatorProps {}

const Navigator: React.FC<NavigatorProps> = ({}) => {
	const { data, loading } = useGetMeQuery();

	if (loading) {
		return <Loader />;
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
