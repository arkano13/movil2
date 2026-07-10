// src/Login.js - Formulario de autenticación de usuario
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomInput from '../componentes/CustomInput';
import CustomButton from '../componentes/CustomButton';
import CustomAlert from '../componentes/CustomAlert';
import { API_URLS } from '../config/config';
import BitacoraServices from '../componentes/Bitacora';
import  AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertData, setAlertData] = useState({
    visible:false,
    title:"",
    message:"",
    _callback:null
  });

  const [conexionBD, setConexionBD] = useState({
    estado:"verificando",
    mensaje:"verificando conexion...",
    datos:null
  });

  const showCustomAlert=(title, message, callback)=>{
      setAlertData({visible:true,title, message, _callback:callback});
    }

  const handleLogin = async () => {
    if (!username || !password) {
      showCustomAlert('Campos vacios','Por favor ingrese usuario y contraseña.');
      return;
    }
    //navigation.navigate('Bienvenido', { user: username });
    try{
      const respuesta = await fetch(API_URLS.LOGIN,{
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
       body: JSON.stringify({usuario_nombre: username, usuario_clave: password}),
      });
      const textoRespuesta = await respuesta.text();
      console.log("Respuesta del servidor",textoRespuesta);

      const data = JSON.parse(textoRespuesta);

      if (data.exito) {

        await AsyncStorage.setItem('user_id', String(data.usuario.id));
        console.log("usuarioId",data.usuario.id);
        const resultDispo = await BitacoraServices.registrarDispositivo();
        //Llamar a Guardar Evento en Bitacora
        await BitacoraServices.registrarEvento({
                  accion: "LOGIN",
                  usuario_id: data.usuario.id,
                  estado_operacion: "EXITOSO",
                  mensaje_error: null
                });
        navigation.navigate('Home2', { user: data.usuario });
      } else {
        showCustomAlert('Error', data.mensaje);
      }
    }catch(error){
      console.error("Error",error);
    }
  };

  //metodo para verificar conexion a base de datos
  const verificarConexionBD = async() => {
    setConexionBD ({estado:"verificando",mensaje:"Verificando conexion...",datos:null});

    try {
      const respuesta = await fetch (API_URLS.CHECKBD,{
        method:'GET',
        headers:{'Accept':'application/json'},
      });

      const textoRespuesta = await respuesta.text();
      console.log(textoRespuesta);
      if(!respuesta.ok){
        throw new Error(`Erro http: ${respuesta.status}`);
      }
      const data = JSON.parse(textoRespuesta);
      if(data.conectado){
        setConexionBD ({estado:"Conectado",mensaje:"Conexion establecida.",datos:data});
        showCustomAlert('Exito','Conexion satisfactoria.');
        
      }
    } catch (error) {
      console.error("Error de conexion",error.message);
      setConexionBD({estado:"error", mensaje:"Sin conexión al servidor.", datos:null});
    }
  }
  //---------------------------------------------------

  useEffect(()=>{verificarConexionBD();},[]);

  return (
    <View style={styles.container}>

      {/* Avatar */}
      <Image
        source={require('../assets/usuario.png')}
        style={styles.avatar}
      />

      {/* Campos reutilizables */}
      <CustomInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <CustomInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {/* Botón principal */}
      {/* Mensaje de estado de conexión */}
      {conexionBD.estado === "verificando" && (
        <Text style={styles.statusText}>Verificando conexión...</Text>
      )}

      {conexionBD.estado === "error" && (
        <Text style={styles.errorText}>{conexionBD.mensaje}</Text>
      )}

      {/* Botón principal - solo visible si hay conexión */}
      {conexionBD.estado === "Conectado" && (
        <CustomButton title="Entrar" onPress={handleLogin} />
      )}

      {/* Botón principal */}

      {/* Olvidé contraseña */}
      <TouchableOpacity style={styles.forgotBtn}>
        <Text style={styles.forgotText}>Forgot Password</Text>
      </TouchableOpacity>

      {/* Botones sociales */}
      <CustomButton
        title="Sign in with Facebook"
        backgroundColor="#eef0fb"
        textColor="#3b5bdb"
        onPress={() => Alert.alert('Facebook', 'Próximamente')}
      />
      <CustomButton
        title="Sign in with Google"
        backgroundColor="#fdf0f0"
        textColor="#e03131"
        onPress={() => Alert.alert('Google', 'Próximamente')}
      />
      <CustomButton
        title="Sign in with Apple"
        backgroundColor="#f0f0f0"
        textColor="#222"
        onPress={() => Alert.alert('Apple', 'Próximamente')}
      />

      {/* Enlace a registro */}
      <TouchableOpacity onPress={() => navigation.navigate('CreacionUsuario')}>
        <Text style={styles.registerLink}>
          No tienes cuenta, <Text style={styles.registerLinkBold}>Crear uno?</Text>
        </Text>
      </TouchableOpacity>

      {/* ✅ CustomAlert con alertData */}
      <CustomAlert
        visible={alertData.visible}
        title={alertData.title}
        message={alertData.message}
        onConfirm={() => {
          setAlertData({ ...alertData, visible: false });
          if (alertData._callback) alertData._callback();
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 28,
    backgroundColor: '#ddd',
  },
  forgotBtn: {
    marginBottom: 14,
  },
  forgotText: {
    color: '#888',
    fontSize: 14,
  },
  registerLink: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  registerLinkBold: {
    color: '#3b5bdb',
    fontWeight: '600',
  },
  statusText: {
    color: '#888',
    fontSize: 13,
    marginBottom: 10,
  },
  errorText: {
    color: '#e03131',
    fontSize: 13,
    marginBottom: 10,
    textAlign: 'center',
  },
});