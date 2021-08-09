import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MeDocument, useRegisterMutation } from '../graphql/generated';
import { Formik } from 'formik';
import FormInput from '../components/FormInput';
import { getFormikErrors } from '../utils/formikFieldError';
import { Headline, Button } from 'react-native-paper';
import { MainNavigatorProps } from '../navigation/MainNavigator';

type RegisterProps = MainNavigatorProps;

const Register: React.FC<RegisterProps> = ({ navigation }) => {
	const [register, { loading }] = useRegisterMutation();

	return (
		<View style={styles.container}>
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
						<View style={styles.form}>
							<Headline style={styles.title}>Register</Headline>
							<FormInput name='name' label='Name' />
							<FormInput name='email' label='Email' />
							<FormInput name='password' label='Password' secureTextEntry />
							<FormInput
								name='passwordConfirm'
								label='Password Confirm'
								secureTextEntry
							/>
							<Button
								mode='contained'
								loading={loading}
								onPress={() => handleSubmit()}>
								Register
							</Button>
						</View>
					);
				}}
			</Formik>
			<Button mode='outlined' onPress={() => navigation.navigate('Login')}>
				Login
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 25,
		textAlign: 'center',
		marginBottom: 20,
	},
	form: {
		marginBottom: 30,
	},
});

export default Register;
