// Librerías o inputs
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Formulario o Pantalla
export default function Principal({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Principal</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Dispositivos')}
      >
        <Text style={styles.buttonText}>Ir a Dispositivos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 15 }]}
        onPress={() => navigation.navigate('Bitacora')}
      >
        <Text style={styles.buttonText}>Ir a Bitacora</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

// Styles o CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});