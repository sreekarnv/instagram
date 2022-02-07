import { useTheme } from '@shopify/restyle';
import React from 'react';
import Box from '../ui/Box';
import Text from '../ui/Text';
import FeatherIcon from '@expo/vector-icons/Feather';
import {
	KeyboardTypeOptions,
	ReturnKeyTypeOptions,
	TextInput,
} from 'react-native';
import { FormikErrors, FormikTouched } from 'formik';

interface FormInputProps {
	name: string;
	keyboardType?: KeyboardTypeOptions;
	icon: typeof FeatherIcon['name'];
	label: string;
	returnKeyType?: ReturnKeyTypeOptions;
	errors?: FormikErrors<{
		[key: string]: string;
	}>;
	touched?: FormikTouched<{
		[key: string]: string;
	}>;
	handleChange: {
		(e: React.ChangeEvent<any>): void;
		<T = string | React.ChangeEvent<any>>(
			field: T
		): T extends React.ChangeEvent<any>
			? void
			: (e: string | React.ChangeEvent<any>) => void;
	};
	handleBlur: {
		(e: React.FocusEvent<any, Element>): void;
		<T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
	};
	value: string;
	required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
	name,
	keyboardType = 'default',
	icon,
	label,
	returnKeyType = 'next',
	value,
	errors,
	handleBlur,
	handleChange,
	touched,
	required = true,
}) => {
	const theme = useTheme();

	return (
		<>
			<Box
				mb='m'
				padding='s'
				elevation={0}
				borderRadius={2}
				backgroundColor='white'>
				<Box flexDirection='row'>
					<Text
						color={
							errors && touched && errors[name] && touched[name]
								? 'danger'
								: 'black'
						}
						variant='label'
						mr='s'>
						{label}
					</Text>
					{required && <Text color='secondary'>*</Text>}
				</Box>
				<Box
					flexDirection='row'
					borderBottomWidth={0.95}
					style={{
						borderBottomColor:
							errors && touched && errors[name] && touched[name]
								? theme.colors.danger
								: theme.colors.gray,
					}}
					alignItems='center'>
					<Box mr='s'>
						<FeatherIcon
							name={icon as any}
							size={20}
							color={
								errors && touched && errors[name] && touched[name]
									? theme.colors.danger
									: theme.colors.gray
							}
						/>
					</Box>

					<Box flex={1} m='s'>
						<TextInput
							keyboardType={keyboardType}
							returnKeyType={returnKeyType}
							style={{
								fontFamily: 'Poppins-600',
								textAlignVertical: 'center',
								lineHeight: 28,
								paddingVertical: 4,
								fontSize: 20,
							}}
							secureTextEntry={name.startsWith('password')}
							value={value}
							onBlur={handleBlur(name)}
							onChangeText={handleChange(name)}
						/>
					</Box>
				</Box>
				{errors && touched && errors[name] && touched[name] ? (
					<Text color='danger' variant='formError'>
						{errors[name]}
					</Text>
				) : null}
			</Box>
		</>
	);
};

export default FormInput;
