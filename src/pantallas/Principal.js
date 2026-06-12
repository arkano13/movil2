//Librerias o inputs
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-web';

//Formulario o Pantalla
export default function Principal() {



  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Principal</Text>
      
    </View>
  );
}

//Styles o CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 

});
