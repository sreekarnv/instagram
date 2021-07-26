import React from "react";
import { StyleSheet, View } from 'react-native';
import Login from "./src/Authentication/Login";
import Register from "./src/Authentication/Register";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name={"Login"} component={Login} />
          <Stack.Screen name={"Register"} component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;