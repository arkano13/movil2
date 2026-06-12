import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

export default function Crear_usuario() {
  return (
    <View style={styles.container}>

      <StatusBar style="dark" />

      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logo}>🧑‍💼</Text>
        </View>
      </View>

      <Text style={styles.title}>Crear una Cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#7A7A7A"
      />

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        placeholderTextColor="#7A7A7A"
      />

      <TextInput
        style={styles.input}
        placeholder="Clave"
        secureTextEntry
        placeholderTextColor="#7A7A7A"
      />

      <TextInput
        style={styles.input}
        placeholder="Repetir Clave"
        secureTextEntry
        placeholderTextColor="#7A7A7A"
      />

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        Al registrarse acepta nuestros
        <Text style={styles.link}> Términos de Uso </Text>
        y
        <Text style={styles.link}> Privacidad</Text>
      </Text>

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

      <TouchableOpacity>
        <Text style={styles.loginLink}>
          ¿Ya tienes cuenta? Ingresar
        </Text>
      </TouchableOpacity>

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
    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    marginBottom: 20,
  },

  btnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },

  terms: {
    textAlign: "center",
    color: "#64748B",
    marginBottom: 25,
    lineHeight: 22,
  },

  link: {
    color: "#2563EB",
    fontWeight: "bold",
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
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#B8D8FF",
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

  loginLink: {
    textAlign: "center",
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 15,
  },

});