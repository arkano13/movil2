import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";

export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState("");
  const [advertencia, setAdvertencia] = useState("");
  const [result, setResult] = useState("");

  const calcularIMC = () => {
    if (Platform.OS !== "web") Keyboard.dismiss();

    const pesoNum = parseFloat(peso.replace(",", "."));
    const alturaNum = parseFloat(altura.replace(",", "."));

    if (!peso.trim() || !altura.trim()) {
      setAdvertencia("Por favor, completa ambos los campos.");
      return;
    }

    if (isNaN(pesoNum) || isNaN(alturaNum)) {
      setAdvertencia("Ingresa solo valores numéricos.");
      return;
    }

    if (pesoNum <= 0 || alturaNum <= 0) {
      setAdvertencia("Los valores deben ser mayores que cero.");
      return;
    }

    const resultado = pesoNum / (alturaNum * alturaNum);
    setImc(resultado.toFixed(2));

    if (resultado < 18.5) {
      setResult("Bajo peso");
      setAdvertencia("");
    } else if (resultado < 25) {
      setResult("Peso normal");
      setAdvertencia("");
    } else if (resultado < 30) {
      setResult("Sobrepeso");
      setAdvertencia("");
    } else {
      setResult("Obesidad");
      setAdvertencia("");
    }

    console.log("Botón presionado. Peso:", peso, "Altura:", altura);
  };

  const inner = (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
          <Text style={styles.titulo}>Calculadora de IMC</Text>

          <Text style={styles.label}>Ingresa tu peso (kg):</Text>
          <TextInput
            style={styles.input}
            placeholder="Ejemplo: 70.5"
            keyboardType="decimal-pad"
            value={peso}
            onChangeText={setPeso}
          />

          <Text style={styles.label}>Ingresa tu altura (m):</Text>
          <TextInput
            style={styles.input}
            placeholder="Ejemplo: 1.75"
            keyboardType="decimal-pad"
            value={altura}
            onChangeText={setAltura}
          />

          <View style={styles.botonContainer}>
            <Button title="Calcular IMC" onPress={calcularIMC} color="#007AFF" />
          </View>

          <Text style={styles.resultadoValor}>IMC: {imc}</Text>
          <Text style={styles.resultadoCategoria}>Categoría: {result}</Text>

          <Text style={styles.mensajeError}>{advertencia}</Text>
      </View>
    </SafeAreaView>
  );

  return Platform.OS !== "web" ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {inner}
    </TouchableWithoutFeedback>
  ) : inner;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  formContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    color: "#333333",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#555555",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 24,
  },
  botonContainer: {
    marginBottom: 32,
  },
  resultadoValor: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#007AFF",
  },
  resultadoCategoria: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 16,
    color: "#333333",
  },
  mensajeError: {
    fontSize: 16,
    textAlign: "center",
    color: "#FF0000",
    minHeight: 24,
  },
});