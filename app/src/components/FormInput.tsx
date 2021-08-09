import { useField } from 'formik';
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet, Text, View, TextInputProps } from 'react-native';

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
				/>
				{error && <Text style={styles.error}>{error}</Text>}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	error: {
		color: 'red',
		textTransform: 'capitalize',
	},
});

export default FormInput;
