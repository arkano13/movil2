import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function CustomInput({
  placeholder,
  secureTextEntry
}) {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
});