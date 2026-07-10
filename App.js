import React from "react";  
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSimple from "./src/pantallas/Login";
import Principal from "./src/pantallas/Principal";
import Usuarios from "./src/pantallas/Crear_usuario";
import Dispositivos from "./src/pantallas/DispositivosScreen";
import Bitacora from "./src/pantallas/Bitacora";
import Home2 from "./src/pantallas/Home2";
import ControlAccesos from "./src/pantallas/ControlAccesos";

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
        <Stack.Screen name="CreacionUsuario" component={Usuarios} />
        <Stack.Screen name="Dispositivos" component={Dispositivos} />
        <Stack.Screen name="Bitacora" component={Bitacora} />
        <Stack.Screen name="Home2" component={Home2} />
        <Stack.Screen name="ControlAccesos" component={ControlAccesos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}