import React from "react";  
import { SafeAreaView } from "react-native-web";
import LoginSimple from "./src/pantallas/Login";
import Principal from "./src/pantallas/Principal";
import Usuarios from "./src/pantallas/Crear_usuario";



export default function App (){
  return(<SafeAreaView style={{flex:1, backgroundColor: "#fff"}}>
    <Usuarios/>
  </SafeAreaView>);

}