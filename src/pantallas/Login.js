import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import CustomAlert from '../componentes/CustomAlert';
import { API_URLS } from '../config/config';
import BitacoraService from '../componentes/Bitacora';

export default function App() {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigation = useNavigation();

  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    message: "",
    _callback: null
  });

  const [conexionBD, setConexionBD] = useState({
    estado: "verificando",
    mensaje: "Verificando conexión...",
    datos: null
  });

  const showCustomAlert = (title, message, callback = null) => {
    setAlert({
      visible: true,
      title,
      message,
      _callback: callback
    });
  };

  // =========================
  // CHECK BD
  // =========================
  const verificarConexion = async () => {
    try {

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const respuesta = await fetch(API_URLS.CHECKBD, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await respuesta.json();

      if (data.conectado) {
        setConexionBD({
          estado: "conectado",
          mensaje: "Conexión establecida",
          datos: data
        });

        showCustomAlert(
          "Conexión Exitosa",
          "La conexión con la Base de Datos fue establecida correctamente."
        );

        await BitacoraService.registrarDispositivo();

      } else {
        setConexionBD({
          estado: "desconectado",
          mensaje: "No existe conexión con la Base de Datos",
          datos: null
        });
      }

    } catch (error) {
      const mensaje = error.name === 'AbortError'
        ? "Tiempo de espera agotado"
        : "No existe conexión con la Base de Datos";

      setConexionBD({
        estado: "desconectado",
        mensaje,
        datos: null
      });
    }
  };

  useEffect(() => {
    verificarConexion();
  }, []);

  // =========================
  // LOGIN
  // =========================
  const manejaLogin = async () => {

    if (!user.trim() || !pass.trim()) {
      showCustomAlert("Campos Vacíos", "Escriba Usuario y Clave");
      return;
    }

    try {

      // ✅ Body como string puro + Content-Length para garantizar compatibilidad en APK
      const bodyString = JSON.stringify({
        usuario_nombre: user.trim(),
        usuario_clave: pass
      });

      const respuesta = await fetch(API_URLS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Content-Length': String(bodyString.length)
        },
        body: bodyString
      });

      const textoRaw = await respuesta.text();

      let data;
      try {
        data = JSON.parse(textoRaw);
      } catch (e) {
        showCustomAlert("Error", `Respuesta inválida: ${textoRaw}`);
        return;
      }

      if (!respuesta.ok && respuesta.status !== 401) {
        showCustomAlert("Error", data.mensaje || "Error de autenticación");
        return;
      }

      if (data.exito) {

        await BitacoraService.registrarEvento({
          accion: "Login",
          estado_operacion: "EXITOSO",
          mensaje_error: null
        });

        showCustomAlert(
          "Bienvenido",
          data.mensaje,
          () => navigation.navigate("Principal")
        );

      } else {
        showCustomAlert(
          "Acceso denegado",
          data.mensaje || "Usuario o contraseña incorrectos"
        );
      }

    } catch (error) {
      showCustomAlert(
        "Error de conexión",
        `Detalle: ${error.message}`
      );
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Text style={styles.logo}>👤</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={user}
        onChangeText={setUser}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={pass}
        secureTextEntry
        onChangeText={setPass}
      />

      {/* MENSAJE CONEXIÓN */}
      {conexionBD.estado !== "conectado" && (
        <Text style={styles.errorConexion}>
          {conexionBD.mensaje}
        </Text>
      )}

      {/* BOTÓN SOLO SI HAY CONEXIÓN */}
      {conexionBD.estado === "conectado" && (
        <TouchableOpacity
          style={styles.btn}
          onPress={manejaLogin}
        >
          <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() =>
          showCustomAlert("Recuperar contraseña", "Función en desarrollo")
        }
      >
        <Text style={styles.forgot}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.facebookBtn}>
        <Text style={styles.facebookText}>
          Iniciar sesión con Facebook
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleBtn}>
        <Text style={styles.googleText}>
          Iniciar sesión con Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appleBtn}>
        <Text style={styles.appleText}>
          Iniciar sesión con Apple
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Usuarios")}
      >
        <Text style={styles.register}>
          No tienes cuenta, ¿Crear una?
        </Text>
      </TouchableOpacity>

      <CustomAlert
        visible={alert.visible}
        title={alert.title}
        message={alert.message}
        onConfirm={() => {
          const callback = alert._callback;
          setAlert({ ...alert, visible: false });
          if (callback) callback();
        }}
      />

      <StatusBar style="auto" />

    </View>
  );
}

// =========================
// ESTILOS (NO TOCADOS)
// =========================
const styles = StyleSheet.create({


container: {
  flex: 1,
  backgroundColor: "#edf2f7",
  justifyContent: "center",
  paddingHorizontal: 25,
},

logoContainer: {
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 40,
},

logo: {
  fontSize: 90,
},

input: {
  width: "100%",
  borderWidth: 1,
  borderColor: "#dbe2ea",
  backgroundColor: "#ffffff",
  padding: 15,
  marginBottom: 15,
  borderRadius: 14,
  fontSize: 16,
  elevation: 2,
},

errorConexion: {
  color: "#dc2626",
  textAlign: "center",
  marginBottom: 15,
  fontWeight: "bold",
},

btn: {
  width: "100%",
  backgroundColor: "#2563eb",
  padding: 16,
  borderRadius: 14,
  alignItems: "center",
  marginTop: 5,
  elevation: 3,
},

btnText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 17,
},

forgot: {
  textAlign: "center",
  color: "#2563eb",
  fontWeight: "600",
  marginTop: 18,
  marginBottom: 22,
},

facebookBtn: {
  width: "100%",
  backgroundColor: "#1877F2",
  padding: 15,
  borderRadius: 14,
  alignItems: "center",
  marginBottom: 12,
  elevation: 2,
},

facebookText: {
  color: "#fff",
  fontWeight: "bold",
},

googleBtn: {
  width: "100%",
  backgroundColor: "#fff",
  borderWidth: 1,
  borderColor: "#e5e7eb",
  padding: 15,
  borderRadius: 14,
  alignItems: "center",
  marginBottom: 12,
  elevation: 1,
},

googleText: {
  color: "#db4437",
  fontWeight: "bold",
},

appleBtn: {
  width: "100%",
  backgroundColor: "#111827",
  padding: 15,
  borderRadius: 14,
  alignItems: "center",
  marginBottom: 20,
  elevation: 2,
},

appleText: {
  color: "#fff",
  fontWeight: "bold",
},

register: {
  textAlign: "center",
  color: "#2563eb",
  fontWeight: "600",
  marginTop: 15,
  fontSize: 15,
},

});