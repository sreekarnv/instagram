import { useField } from 'formik';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface FormInputProps {
	name: string;
	label: string;
	secureTextEntry?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
	label,
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
					secureTextEntry={secureTextEntry}
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
		borderColor: 'black',
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 3,
	},
	error: {
		color: 'red',
		textTransform: 'capitalize',
	},
});

export default FormInput;
