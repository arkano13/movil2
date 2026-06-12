import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

export default function CustomButton({
  title,
  onPress
}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#4169E1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});