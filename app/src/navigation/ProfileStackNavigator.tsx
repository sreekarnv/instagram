import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Loader from '../components/Loader';
import Profile from '../Profile/Profile';
import { useLogoutMutation, useMeQuery } from '../graphql/generated';
import { ProfileStackParamsList } from './types';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Menu, Divider, useTheme } from 'react-native-paper';
import EditProfile from '../Profile/EditProfile';

const Stack = createStackNavigator<ProfileStackParamsList>();

const ProfileStackNavigator: React.FC = ({}) => {
	const theme = useTheme();
	const { data, loading } = useMeQuery();
	const [logout, { loading: logoutLoading }] = useLogoutMutation();
	const [visible, setVisible] = React.useState(false);

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);

	if (loading || logoutLoading) {
		return <Loader />;
	}

	return (
		<>
			<Stack.Navigator>
				<Stack.Screen
					options={({ navigation }) => {
						return {
							title: data?.me?.name,
							headerRight: () => (
								<>
									<Menu
										visible={visible}
										onDismiss={closeMenu}
										anchor={
											<TouchableOpacity
												onPress={openMenu}
												style={{ paddingRight: 10 }}>
												<Feather name='more-vertical' size={24} color='black' />
											</TouchableOpacity>
										}>
										<Menu.Item
											onPress={() => {
												navigation.navigate('EditProfile', {});
												closeMenu();
											}}
											title='Edit Profile'
											icon={() => <Feather name='edit' size={20} />}
										/>
										<Divider />
										<Menu.Item
											onPress={() => {
												return logout({
													update: (cache) => {
														return cache.reset();
													},
												});
											}}
											title='Logout'
											icon={() => (
												<MaterialIcons
													name='logout'
													size={20}
													style={{ color: theme.colors.error }}
												/>
											)}
											titleStyle={{ color: theme.colors.error }}
										/>
									</Menu>
								</>
							),
						};
					}}
					name='Profile'
					component={Profile}
				/>

				<Stack.Screen
					options={({ route, navigation }) => {
						return {
							headerRight: () => {
								return (
									<>
										<TouchableOpacity
											onPress={async () => {
												await route.params.submit?.current();
												navigation.goBack();
											}}
											style={{ paddingRight: 10 }}>
											<Feather
												name='check'
												size={24}
												color={theme.colors.primary}
											/>
										</TouchableOpacity>
									</>
								);
							},
						};
					}}
					name='EditProfile'
					component={EditProfile}
				/>
			</Stack.Navigator>
		</>
	);
};

export default ProfileStackNavigator;
