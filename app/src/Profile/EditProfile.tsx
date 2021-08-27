import { Formik } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import FormInput from '../components/FormInput';
import Loader from '../components/Loader';
import { useMeQuery, useUpdateProfileMutation } from '../graphql/generated';
import { ProfileStackNavProps } from '../navigation/types';

const EditProfile: React.FC<ProfileStackNavProps<'EditProfile'>> = ({
	navigation,
}) => {
	const { data } = useMeQuery();
	const submit = React.useRef<any>();
	const [update, { loading }] = useUpdateProfileMutation();

	React.useEffect(() => {
		navigation.setParams({ submit });
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<View
				style={{
					paddingVertical: 30,
					paddingHorizontal: 20,
					flex: 1,
				}}>
				<Formik
					onSubmit={({ name, email }) => {
						return update({
							variables: {
								name,
								email,
							},
							update: (cache) => {
								return cache.reset();
							},
						});
					}}
					initialValues={{
						name: data?.me?.name || '',
						email: data?.me?.email || '',
					}}>
					{({ handleSubmit }) => {
						submit.current = handleSubmit;
						return (
							<>
								<FormInput name='name' label='Name' />
								<FormInput name='email' label='Email' />
							</>
						);
					}}
				</Formik>
			</View>
		</>
	);
};

export default EditProfile;
