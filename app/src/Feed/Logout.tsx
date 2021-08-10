import { useApolloClient } from '@apollo/client';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Button, Subheading } from 'react-native-paper';
import Loader from '../components/Loader';
import { useLogoutMutation } from '../graphql/generated';
import { MainNavigatorProps } from '../navigation/MainNavigator';

type LogoutProps = MainNavigatorProps;

const Logout: React.FC<LogoutProps> = ({ navigation }) => {
	const [logout, { loading }] = useLogoutMutation();
	const apolloClient = useApolloClient();
	const [visible, setVisible] = React.useState(true);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<Modal
				visible={visible}
				onDismiss={() => {
					navigation.goBack();
				}}
				contentContainerStyle={styles.modal}>
				<Subheading style={styles.modalText}>
					Are you sure you want to logout ?
				</Subheading>
				<View style={styles.modalCta}>
					<Button
						onPress={() => {
							navigation.goBack();
						}}
						style={{ marginRight: 10 }}
						mode='outlined'>
						No
					</Button>
					<Button
						onPress={() => {
							setVisible(false);
							logout({
								update: async () => {
									await apolloClient.resetStore();
									navigation.replace('Login');
								},
							});
						}}
						mode='contained'>
						Yes
					</Button>
				</View>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	modal: {
		backgroundColor: 'white',
		padding: 20,
		margin: 20,
	},
	modalText: {
		textAlign: 'center',
		marginBottom: 20,
	},
	modalCta: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
});

export default Logout;
