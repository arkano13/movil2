import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';

export default function CustomAlert({ 
  visible, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = "Aceptar", 
  cancelText = "Cancelar", 
  showCancel = false 
}) {
  if (!visible) return null;

  // ✅ Calcula el estilo dinámico AQUÍ (dentro del componente)
  const buttonsStyle = [
    styles.buttons, 
    { justifyContent: showCancel ? 'space-between' : 'flex-end' }
  ];

  return (
    <Modal transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          
          {/* ✅ Usa el estilo calculado */}
          <View style={buttonsStyle}>
            {showCancel && (
              <TouchableOpacity onPress={onCancel} style={[styles.btn, styles.btnCancel]}>
                <Text style={styles.btnTextCancel}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onConfirm} style={styles.btn}>
              <Text style={styles.btnText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 8 },
      web: { boxShadow: '0 8px 24px rgba(0,0,0,0.15)' },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  // ✅ Estilo base SIN lógica condicional
  buttons: {
    flexDirection: 'row',
    gap: 12,
    // justifyContent se agrega dinámicamente desde el componente
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#2563eb',
  },
  btnCancel: {
    backgroundColor: '#f1f5f9',
    borderColor: '#cbd5e1',
    borderWidth: 1,
  },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  btnTextCancel: { color: '#475569', fontSize: 15, fontWeight: '500' },
});