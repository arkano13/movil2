import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

export default function SocialButton({
  title,
  backgroundColor,
  textColor
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor }
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: textColor }
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },

  text: {
    fontWeight: 'bold',
  },
});