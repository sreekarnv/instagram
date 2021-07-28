import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import AuthNavigator from './AuthNavigator';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = ({}) => {
	return (
		<>
			<NavigationContainer>
				<AuthNavigator />
			</NavigationContainer>
		</>
	);
};

export default Navigation;
