import FormInput from '../components/FormInput';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MeDocument, useRegisterMutation } from '../graphql/generated';
import { getFormikErrors } from '../utils/formikFieldError';
import Box from '../components/Box';
import Text from '../components/Text';
import theme from '../config/theme';
import Button from '../components/Button';

import { MainNavigatorProps } from '../navigation/MainNavigator';

type RegisterProps = MainNavigatorProps;

const Register: React.FC<RegisterProps> = ({ navigation }) => {
	const [register, { loading }] = useRegisterMutation();

	return (
		<SafeAreaView style={styles.container}>
			<Formik
				initialValues={{
					name: '',
					email: '',
					password: '',
					passwordConfirm: '',
				}}
				onSubmit={(
					{ email, password, name, passwordConfirm },
					{ setErrors, resetForm }
				) => {
					register({
						variables: {
							email,
							password,
							passwordConfirm,
							name,
						},
						update: (cache, { data }) => {
							if (data?.register.errors?.length) {
								let errors = getFormikErrors(data.register.errors);
								setErrors(errors);
							}

							if (data?.register.user) {
								cache.writeQuery({
									query: MeDocument,
									data: {
										__typename: 'Query',
										me: {
											...data?.register.user,
										},
									},
								});
								resetForm();
								navigation.navigate('Home', {
									screen: 'Feed',
								});
							}
						},
					});
				}}>
				{({ handleSubmit }) => {
					return (
						<Box marginBottom={'lg'}>
							<Text
								textAlign='center'
								paddingVertical={'md'}
								marginBottom='lg'
								color='light'
								fontSize={25}>
								Register
							</Text>
							<FormInput name='name' label='Name' />
							<FormInput name='email' label='Email' />
							<FormInput name='password' label='Password' secureTextEntry />
							<FormInput
								name='passwordConfirm'
								label='Password Confirm'
								secureTextEntry
							/>
							<Button onPress={() => handleSubmit()}>
								{loading ? 'Loading...' : 'Register'}
							</Button>
						</Box>
					);
				}}
			</Formik>
			<Button color='danger' onPress={() => navigation.navigate('Login')}>
				To Login Page
			</Button>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		backgroundColor: theme.colors.dark,
	},
	title: {
		fontSize: 30,
		textAlign: 'center',
		paddingVertical: 15,
		marginBottom: 20,
	},
	textInput: {
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 4,
		paddingHorizontal: 8,
		marginBottom: 20,
		borderRadius: 3,
	},
	form: {
		marginBottom: 40,
	},
});

export default Register;
