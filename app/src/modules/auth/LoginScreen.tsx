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
import * as Yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import {
	GetBaseMeDocument,
	useLoginUserMutation,
} from '../../graphql/generated';
import DismissKeyboard from '../../shared/components/utils/DismissKeyboard';

const { height } = Dimensions.get('window');

interface LoginScreenProps extends AuthScreenProp<'Login'> {}

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required('user must provide their email')
		.email('Please provide a valid email')
		.trim(),
	password: Yup.string().required('user must provide a password'),
});

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
	const [loginUser] = useLoginUserMutation();

	return (
		<SafeAreaView style={{ height }}>
			<DismissKeyboard>
				<Box
					flex={1}
					justifyContent='space-between'
					paddingHorizontal={'l'}
					paddingVertical='xl'>
					<Box>
						<Box>
							<Text variant='title1'>Login</Text>
							<Text color='gray' variant='body'>
								Please sign in to continue
							</Text>
						</Box>
						<Formik
							validationSchema={validationSchema}
							initialValues={{ email: '', password: '' }}
							onSubmit={async (values, { resetForm }) => {
								try {
									await loginUser({
										variables: { ...values },
										update: (cache, { data }) => {
											console.log(data);
											cache.writeQuery({
												query: GetBaseMeDocument,
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
										message: 'Login Failed',
										description: err.message || 'Something Went Wrong',
										type: 'danger',
										duration: 4000,
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

									resetForm();
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
										<Box mt='xl'>
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
												returnKeyType='send'
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
										</Box>
										<Box alignSelf='flex-end'>
											<GradientButton onPress={() => handleSubmit()}>
												{isSubmitting ? 'Loading...' : 'Login'}
											</GradientButton>
										</Box>
									</Box>
								</>
							)}
						</Formik>
					</Box>
					<Box>
						<Link
							onPress={() => navigation.navigate('Register')}
							text={['Not Registered?', 'Click here to create your account']}
							textAlign='center'
						/>
					</Box>
				</Box>
			</DismissKeyboard>
		</SafeAreaView>
	);
};

export default LoginScreen;
