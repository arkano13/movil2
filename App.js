import React from "react";  
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginSimple from "./src/pantallas/Login";
import Principal from "./src/pantallas/Principal";
import Usuarios from "./src/pantallas/Crear_usuario";
import Examen from "./src/pantallas/Examen"
import Dispositivos from "./src/pantallas/DispositivosScreen";
import Bitacora from "./src/pantallas/Bitacora";



const Stack = createNativeStackNavigator();


export default function App (){
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >

        <Stack.Screen name="Login" component={LoginSimple} />
        <Stack.Screen name= "Examen" component={Examen}/>
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Usuarios" component={Usuarios} />
         <Stack.Screen name="Dispositivos" component={Dispositivos} />
        <Stack.Screen name="Bitacora" component={Bitacora} />
   

      </Stack.Navigator>
    </NavigationContainer>
  );

}