import { useField } from 'formik';
import * as React from 'react';
import { TextInput, Paragraph, useTheme } from 'react-native-paper';
import { StyleSheet, View, TextInputProps } from 'react-native';

interface FormInputProps {
	name: string;
	label: string;
	secureTextEntry?: boolean;
	multiline?: boolean;
	keyboardType?: TextInputProps['keyboardType'];
}

const FormInput: React.FC<FormInputProps> = ({
	label,
	keyboardType = 'default',
	secureTextEntry = false,
	multiline = false,
	...props
}) => {
	const theme = useTheme();
	const [{ value }, { error }, { setValue }] = useField<any>(props);

	return (
		<>
			<View style={{ marginBottom: 20 }}>
				<TextInput
					multiline={multiline}
					mode='outlined'
					label={label}
					value={value}
					secureTextEntry={secureTextEntry}
					keyboardType={keyboardType}
					onChangeText={(t) => {
						setValue(t);
					}}
					error={!!error}
				/>
				{error && (
					<Paragraph style={[styles.error, { color: theme.colors.error }]}>
						{error}
					</Paragraph>
				)}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	error: {
		textTransform: 'capitalize',
	},
});

export default FormInput;
