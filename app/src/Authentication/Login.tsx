import React from 'react';
import {Button, Text, View} from "react-native";

const Login = ({ navigation }: any) => {
    return (
        <View>
            <Text>This is the Login Screen</Text>
            <Button title={"To Register Page"} onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

export default Login;