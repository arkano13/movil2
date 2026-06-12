import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import CustomAlert from "../componentes/CustomAlert";
import { API_URLS } from "../config/config";

export default function App() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigation = useNavigation();

  const [alert, setAlert] = useState({
    visible: false,
    title: "",
    message: "",
    _callback: null,
  });

  const [conexion, setConexion] = useState({
    estado: "verificando",
    mensaje: "Verificando conexión a la base de datos...",
    datos: null,
  });

  const showCustomAlert = (title, message, callback) => {
    setAlert({
      visible: true,
      title,
      message,
      _callback: callback,
    });
  };

  const manejaLogin = () => {
    if (!user.trim() || !pass.trim()) {
      showCustomAlert("Campos Vacíos", "Escriba Usuario y Contraseña");
      return;
    }

    if (user.trim() === "admin" && pass.trim() === "admin") {
      showCustomAlert("Bienvenido", "Ha ingresado correctamente", () =>
        navigation.navigate("Principal"),
      );
    } else {
      showCustomAlert("Error", "Usuario o contraseña incorrectos");
    }
  };

  //metodo para verificar la conexión a la base de datos
  const verificarConexion = async () => {
    try {
      const response = await fetch(API_URLS.CHECKBD, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const textoRespuesta = await response.text();
      if (!response.ok) {
        throw new Error(`Error en la respuesta: ${response.status}`);
      }
      const data = JSON.parse(textoRespuesta);
      if (data.conectado) {
        setConexion({
          estado: "conectado",
          mensaje: "Conexión a la base de datos exitosa",
          datos: data,
        });
        showCustomAlert("Conexión Exitosa", "La aplicación se ha conectado a la base de datos correctamente");
      }
      console.log("Respuesta de verificación de conexión:", textoRespuesta);
    } catch (error) {
      console.log("Error al verificar conexión:", error);
    }
  };

  useEffect(() => {
    verificarConexion();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logo}>🧑‍💼</Text>
        </View>
      </View>

      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#7A7A7A"
        value={user}
        autoCapitalize="none"
        onChangeText={setUser}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#7A7A7A"
        value={pass}
        secureTextEntry
        onChangeText={setPass}
      />

      <TouchableOpacity style={styles.btn} onPress={manejaLogin}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          showCustomAlert("Recuperar contraseña", "Función en desarrollo")
        }
      >
        <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.facebookBtn}>
        <Text style={styles.facebookText}>Iniciar sesión con Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleBtn}>
        <Text style={styles.googleText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appleBtn}>
        <Text style={styles.appleText}>Iniciar sesión con Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Usuarios")}>
        <Text style={styles.register}>¿No tienes cuenta? Crear una</Text>
      </TouchableOpacity>

      <CustomAlert
        visible={alert.visible}
        title={alert.title}
        message={alert.message}
        onConfirm={() => {
          setAlert({ ...alert, visible: false });

          if (alert._callback) {
            alert._callback();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4FF",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  logo: {
    fontSize: 55,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0A3D91",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#B8D8FF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  btn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  btnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },

  forgot: {
    textAlign: "center",
    color: "#2563EB",
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 20,
  },

  facebookBtn: {
    backgroundColor: "#1877F2",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },

  facebookText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  googleBtn: {
    backgroundColor: "#DCEEFF",
    borderWidth: 1,
    borderColor: "#B8D8FF",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },

  googleText: {
    color: "#2563EB",
    fontWeight: "bold",
  },

  appleBtn: {
    backgroundColor: "#CFE4FF",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
  },

  appleText: {
    color: "#0A3D91",
    fontWeight: "bold",
  },

  register: {
    textAlign: "center",
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 15,
  },
});
