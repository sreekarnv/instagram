import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MeDocument, useLoginMutation } from '../graphql/generated';
import { Formik } from 'formik';
import FormInput from '../components/FormInput';
import { getFormikErrors } from '../utils/formikFieldError';
import { Button } from 'react-native-paper';
import { AuthStackNavProps } from '../navigation/types';

type LoginProps = AuthStackNavProps<'Login'>;

const Login: React.FC<LoginProps> = ({ navigation }) => {
	const [login, { loading }] = useLoginMutation();

	return (
		<View style={styles.container}>
			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={({ email, password }, { setErrors, resetForm }) => {
					login({
						variables: {
							email,
							password,
						},
						update: (cache, { data }) => {
							if (data?.login.errors?.length) {
								let errors = getFormikErrors(data.login.errors);
								setErrors(errors);
							}

							if (data?.login.user) {
								cache.writeQuery({
									query: MeDocument,
									data: {
										__typename: 'Query',
										me: {
											...data?.login.user,
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
						<>
							<View>
								<FormInput
									name='email'
									label='Email'
									keyboardType='email-address'
								/>

								<FormInput name='password' label='Password' secureTextEntry />

								<Button
									mode='contained'
									loading={loading}
									onPress={() => handleSubmit()}>
									Login
								</Button>
							</View>

							<Button
								style={{
									marginTop: 40,
								}}
								mode='outlined'
								onPress={() => navigation.navigate('Register')}>
								Register
							</Button>
						</>
					);
				}}
			</Formik>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		justifyContent: 'center',
	},
});

export default Login;
