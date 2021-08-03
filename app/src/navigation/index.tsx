import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import MainNavigator from './MainNavigator';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = ({}) => {
	return (
		<>
			<NavigationContainer>
				<MainNavigator />
			</NavigationContainer>
		</>
	);
};

export default Navigation;
