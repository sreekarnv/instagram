import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import React from 'react';
import { Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import {
	GetMeDocument,
	useGetMeQuery,
	useUpdateUserDetailsMutation,
} from '../../graphql/generated';
import FormInput from '../../shared/components/form/FormInput';
import Box from '../../shared/components/ui/Box';
import Loader from '../../shared/components/ui/Loader';
import DismissKeyboard from '../../shared/components/utils/DismissKeyboard';
import { ProfileScreenProp } from './types';

interface EditProfileScreenProps extends ProfileScreenProp<'EditProfile'> {}

const { height } = Dimensions.get('window');

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
	navigation,
}) => {
	const { data, loading: getMeLoading } = useGetMeQuery();
	const [updateDetails, { loading }] = useUpdateUserDetailsMutation();

	if (loading || getMeLoading) {
		return <Loader />;
	}

	return (
		<>
			<SafeAreaView style={{ height }}>
				<DismissKeyboard>
					<Box flex={1} justifyContent='space-between' paddingHorizontal={'l'}>
						<Box>
							<Formik
								initialValues={{
									email: data?.user?.email || '',
									name: data?.user?.name || '',
									phone: data?.user?.phone || '',
								}}
								onSubmit={async (values, { resetForm }) => {
									try {
										await updateDetails({
											variables: { ...values },
											update: (cache, { data }) => {
												cache.writeQuery({
													query: GetMeDocument,
													data: {
														user: {
															__typename: 'User',
															hasRegistered: true,
															...data?.updateUserDetails,
														},
													},
												});
											},
										});

										navigation.navigate('ProfileHome');
									} catch (err: any) {
										showMessage({
											message: 'Update Profile Failed',
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
									errors,
									touched,
									handleChange,
									handleBlur,
									values,
									handleSubmit,
								}) => {
									React.useLayoutEffect(() => {
										navigation.setOptions({
											headerRight: () => {
												return (
													<TouchableOpacity onPress={() => handleSubmit()}>
														<Feather name='check' size={20} />
													</TouchableOpacity>
												);
											},
										});
									}, []);

									return (
										<>
											<Box>
												<Box mt='xl'>
													<FormInput
														label='Email'
														icon='mail'
														name='email'
														required={false}
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
														label='Phone'
														icon='phone'
														keyboardType='number-pad'
														required={false}
														name='phone'
														{...{
															errors,
															touched,
															handleChange,
															handleBlur,
														}}
														value={values.phone}
													/>

													<FormInput
														returnKeyType='send'
														label='Name'
														icon='user'
														required={false}
														name='name'
														{...{
															errors,
															touched,
															handleChange,
															handleBlur,
														}}
														value={values.name}
													/>
												</Box>
											</Box>
										</>
									);
								}}
							</Formik>
						</Box>
					</Box>
				</DismissKeyboard>
			</SafeAreaView>
		</>
	);
};

export default EditProfileScreen;
