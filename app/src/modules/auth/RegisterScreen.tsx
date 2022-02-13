import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Box from '../../shared/components/ui/Box';
import Link from '../../shared/components/ui/Link';
import Text from '../../shared/components/ui/Text';
import GradientButton from '../../shared/components/ui/GradientButton';
import { AuthScreenProp } from './types';
import { Dimensions } from 'react-native';
import { Formik } from 'formik';
import FormInput from '../../shared/components/form/FormInput';
import { showMessage } from 'react-native-flash-message';
import * as Yup from 'yup';
import {
	GetMeDocument,
	useRegisterUserMutation,
} from '../../graphql/generated';
import DismissKeyboard from '../../shared/components/utils/DismissKeyboard';

interface RegisterScreenProps extends AuthScreenProp<'Register'> {}

const { height } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required('user must provide their email')
		.email('please provide a valid email')
		.trim(),
	password: Yup.string()
		.required('user must provide a password')
		.min(6, 'password must contain atleast 6 characters'),
	passwordConfirm: Yup.string()
		.required('users must confirm their password')
		.when('password', {
			is: (val: string) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf([Yup.ref('password')], 'passwords do not match'),
		}),
});

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
	const [registerUser] = useRegisterUserMutation({});

	return (
		<>
			<SafeAreaView style={{ height }}>
				<DismissKeyboard>
					<Box
						flex={1}
						justifyContent='space-between'
						paddingHorizontal={'l'}
						paddingVertical='xl'>
						<Box flex={1}>
							<Box>
								<Text variant='title1'>Register</Text>
								<Text color='gray' variant='body'>
									Please sign up to continue
								</Text>
							</Box>
							<Formik
								validationSchema={validationSchema}
								initialValues={{
									email: '',
									password: '',
									passwordConfirm: '',
								}}
								onSubmit={async (values, { resetForm }) => {
									try {
										await registerUser({
											variables: {
												...values,
											},
											update: (cache, { data }) => {
												cache.writeQuery({
													query: GetMeDocument,
													data: {
														user: {
															__typename: 'User',
															...data?.user,
														},
													},
												});
											},
										});

										resetForm();
									} catch (err: any) {
										showMessage({
											message: 'Register Failed',
											description:
												err.message || 'Could not create your account',
											type: 'danger',
											duration: 2000,
											textStyle: {
												fontFamily: 'Poppins-500',
											},
											titleStyle: {
												fontFamily: 'Poppins-700',
											},
											icon: {
												icon: 'warning',
												position: 'right',
											},
										});
									}
								}}>
								{({
									handleSubmit,
									errors,
									touched,
									handleChange,
									handleBlur,
									values,
									isSubmitting,
								}) => (
									<>
										<Box>
											<Box mt='m'>
												<FormInput
													label='Email'
													icon='mail'
													name='email'
													keyboardType='email-address'
													returnKeyType='next'
													{...{
														errors,
														touched,
														handleChange,
														handleBlur,
													}}
													value={values.email}
												/>

												<FormInput
													returnKeyType='next'
													label='Password'
													icon='key'
													name='password'
													{...{
														errors,
														touched,
														handleChange,
														handleBlur,
													}}
													value={values.password}
												/>

												<FormInput
													label='Password Confirm'
													icon='key'
													name='passwordConfirm'
													returnKeyType='default'
													{...{
														errors,
														touched,
														handleChange,
														handleBlur,
													}}
													value={values.passwordConfirm}
												/>
											</Box>
											<Box alignSelf='flex-end'>
												<GradientButton onPress={() => handleSubmit()}>
													{isSubmitting ? 'Loading...' : 'Register'}
												</GradientButton>
											</Box>
										</Box>
									</>
								)}
							</Formik>
						</Box>
						<Box>
							<Link
								onPress={() => navigation.navigate('Login')}
								text={['Have an account?  Click here to login']}
								textAlign='center'
							/>
						</Box>
					</Box>
				</DismissKeyboard>
			</SafeAreaView>
		</>
	);
};

export default RegisterScreen;
