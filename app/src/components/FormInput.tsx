import { useField } from 'formik';
import * as React from 'react';
import { StyleSheet, Text, TextInputProps, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import theme from '../config/theme';

interface FormInputProps {
	name: string;
	label: string;
	secureTextEntry?: boolean;
	keyboardType?: TextInputProps['keyboardType'];
}

const FormInput: React.FC<FormInputProps> = ({
	label,
	keyboardType = 'default',
	secureTextEntry = false,
	...props
}) => {
	const [{ value }, { error }, { setValue }] = useField<any>(props);

	return (
		<>
			<View style={{ marginBottom: 20 }}>
				<TextInput
					placeholder={label}
					style={styles.textInput}
					value={value}
					placeholderTextColor={theme.colors.light50}
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
	textInput: {
		borderWidth: 1,
		borderColor: theme.colors.light,
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 3,
		color: theme.colors.light,
	},
	error: {
		color: theme.colors.danger,
		textTransform: 'capitalize',
	},
});

export default FormInput;
