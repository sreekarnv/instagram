import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import theme from '../../config/theme';
import {
	GetMeDocument,
	useUpdateUserHasRegisteredMutation,
} from '../../graphql/generated';
import FormInput from '../../shared/components/form/FormInput';
import Box from '../../shared/components/ui/Box';
import DismissKeyboard from '../../shared/components/utils/DismissKeyboard';
import { RegistrationScreenProp } from './types';

interface DetailsScreenProps extends RegistrationScreenProp<'Details'> {}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation, route }) => {
	const [updateDetails] = useUpdateUserHasRegisteredMutation();
	const [avatar] = React.useState(route.params.avatar || 1);

	return (
		<>
			<DismissKeyboard>
				<Box flex={1}>
					<Box padding='m'>
						<Formik
							onSubmit={async (values, { resetForm }) => {
								try {
									await updateDetails({
										variables: {
											name: values.name,
											phone: values.phone,
											photo: `/uploads/avatars/avatar-${avatar}.png`,
										},
										update: (cache, { data }) => {
											cache.writeQuery({
												query: GetMeDocument,
												data: {
													user: {
														__typename: 'User',
														email: data?.user.email,
														hasRegistered: data?.user.hasRegistered,
														id: data?.user.id,
													},
												},
											});
										},
									});
								} catch (err: any) {
									console.log({ ...err });
								}

								resetForm();
							}}
							initialValues={{
								phone: '',
								name: '',
							}}>
							{({
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								values,
							}) => {
								React.useLayoutEffect(() => {
									navigation.setOptions({
										headerRight: () => {
											return (
												<TouchableOpacity onPress={() => handleSubmit()}>
													<Feather
														color={theme.colors.secondary}
														name='save'
														size={23}
													/>
												</TouchableOpacity>
											);
										},
									});
								}, []);

								return (
									<Box>
										<FormInput
											returnKeyType='next'
											label='Name'
											icon='user'
											name='name'
											{...{
												errors,
												touched,
												handleChange,
												handleBlur,
											}}
											value={values.name}
										/>

										<FormInput
											returnKeyType='next'
											label='Phone'
											icon='phone'
											name='phone'
											{...{
												errors,
												touched,
												handleChange,
												handleBlur,
											}}
											value={values.phone}
										/>
									</Box>
								);
							}}
						</Formik>
					</Box>
				</Box>
			</DismissKeyboard>
		</>
	);
};

export default DetailsScreen;
