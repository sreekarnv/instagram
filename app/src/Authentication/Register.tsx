import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MeDocument, useRegisterMutation } from '../graphql/generated';
import { Formik } from 'formik';
import FormInput from '../components/FormInput';
import { getFormikErrors } from '../utils/formikFieldError';
import { Button, Divider, Headline } from 'react-native-paper';
import { AuthStackNavProps } from '../navigation/types';
import Link from '../components/Link';

type RegisterProps = AuthStackNavProps<'Register'>;

const Register: React.FC<RegisterProps> = ({ navigation }) => {
	const [register, { loading }] = useRegisterMutation();

	return (
		<View style={styles.container}>
			<View />
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
							}
						},
					});
				}}>
				{({ handleSubmit }) => {
					return (
						<View style={styles.form}>
							<Headline style={{ marginBottom: 20, textAlign: 'center' }}>
								Register
							</Headline>
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
			<View>
				<Divider style={{ marginBottom: 20 }} />
				<Link onPress={() => navigation.navigate('Login')}>
					Have an Account ? Click here to Login
				</Link>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'space-between',
	},
	form: {
		marginBottom: 30,
	},
});

export default Register;
