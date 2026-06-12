import React from "react";  
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSimple from "./src/pantallas/Login";
import Principal from "./src/pantallas/Principal";
import Usuarios from "./src/pantallas/Crear_usuario";

const Stack = createNativeStackNavigator();


export default function App (){
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginSimple} />
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Usuarios" component={Usuarios} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}