import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface DismissKeyboardProps {}

const DismissKeyboard: React.FC<DismissKeyboardProps> = ({ children }) => {
	return (
		<>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}>
				{children}
			</TouchableWithoutFeedback>
		</>
	);
};

export default DismissKeyboard;
