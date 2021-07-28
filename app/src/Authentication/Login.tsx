import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthScreenProps } from '../navigation/AuthNavigator';
import { MeDocument, useLoginMutation } from '../graphql/generated';
import { Formik } from 'formik';
import FormInput from '../components/FormInput';
import { getFormikErrors } from '../utils/formikFieldError';

const Login = ({ navigation }: AuthScreenProps) => {
	const [login, { loading }] = useLoginMutation();

	return (
		<SafeAreaView style={styles.container}>
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
								navigation.navigate('Home');
							}
						},
					});
				}}>
				{({ handleSubmit }) => {
					return (
						<>
							<View style={styles.form}>
								<Text style={styles.title}>Login</Text>

								<FormInput name='email' label='Email' />
								<FormInput name='password' label='Password' secureTextEntry />

								<Button
									title={loading ? 'Loading...' : 'Login'}
									onPress={handleSubmit}
								/>
							</View>
						</>
					);
				}}
			</Formik>
			<Button
				title={'To Register Page'}
				onPress={() => navigation.replace('Register')}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
	},
	title: {
		fontSize: 30,
		textAlign: 'center',
		paddingVertical: 15,
		marginBottom: 20,
	},
	form: {
		marginBottom: 40,
	},
});

export default Login;
