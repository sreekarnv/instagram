import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthScreenProps } from '../navigation/AuthNavigator';
import { MeDocument, useLoginMutation } from '../graphql/generated';
import { Formik } from 'formik';
import FormInput from '../components/FormInput';
import { getFormikErrors } from '../utils/formikFieldError';
import Box from '../components/Box';
import Text from '../components/Text';
import theme from '../config/theme';

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
							<Box marginBottom={'lg'}>
								<Text
									color='light'
									textAlign='center'
									paddingVertical={'md'}
									marginBottom='lg'
									fontSize={25}>
									Login
								</Text>
								<FormInput
									name='email'
									label='Email'
									keyboardType='email-address'
								/>
								<FormInput name='password' label='Password' secureTextEntry />

								<Button
									color={theme.colors.primary}
									title={loading ? 'Loading...' : 'Login'}
									onPress={handleSubmit}
								/>
							</Box>
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
		backgroundColor: theme.colors.dark,
	},
});

export default Login;
