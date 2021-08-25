import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import Loader from '../components/Loader';
import { useMeQuery } from '../graphql/generated';
import AuthStackNavigator from './AuthStackNavigator';
import MainTabsNavigator from './MainTabsNavigator';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = ({}) => {
	const { loading, data } = useMeQuery();

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<NavigationContainer>
				{data?.me ? <MainTabsNavigator /> : <AuthStackNavigator />}
			</NavigationContainer>
		</>
	);
};

export default Navigation;
