import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function CustomInput({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
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