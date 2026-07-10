// src/pantallas/ControlAccesos.js - Asignación de accesos a módulos por usuario
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomAlert from '../componentes/CustomAlert';
import { API_URLS } from '../config/config';

export default function ControlAccesos({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [modulos, setModulos] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
  const [cargandoModulos, setCargandoModulos] = useState(false);

  const [alertData, setAlertData] = useState({
    visible: false,
    title: '',
    message: '',
    _callback: null,
  });

  const showCustomAlert = (title, message, callback) => {
    setAlertData({ visible: true, title, message, _callback: callback });
  };

  // 1️⃣ Cargar lista de usuarios al abrir la pantalla
  const cargarUsuarios = async () => {
    setCargandoUsuarios(true);
    try {
      const respuesta = await fetch(API_URLS.LISTAR_USUARIOS, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      const textoRespuesta = await respuesta.text();
      const data = JSON.parse(textoRespuesta);

      if (data.exito) {
        setUsuarios(data.usuarios);
        if (data.usuarios.length > 0) {
          setUsuarioSeleccionado(String(data.usuarios[0].usuario_id));
        }
      } else {
        showCustomAlert('Error', data.mensaje || 'No se pudo cargar la lista de usuarios.');
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      showCustomAlert('Error', 'No se pudo conectar con el servidor.');
    } finally {
      setCargandoUsuarios(false);
    }
  };

  // 2️⃣ Cargar módulos + accesos cuando cambia el usuario seleccionado
  const cargarAccesos = async (usuarioId) => {
    if (!usuarioId) return;
    setCargandoModulos(true);
    try {
      const respuesta = await fetch(API_URLS.CONSULTAR_ACCESOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ usuario_id: usuarioId }),
      });
      const textoRespuesta = await respuesta.text();
      const data = JSON.parse(textoRespuesta);

      if (data.exito) {
        setModulos(data.modulos);
      } else {
        showCustomAlert('Error', data.mensaje || 'No se pudieron cargar los accesos.');
      }
    } catch (error) {
      console.error('Error al cargar accesos:', error);
      showCustomAlert('Error', 'No se pudo conectar con el servidor.');
    } finally {
      setCargandoModulos(false);
    }
  };

  // 3️⃣ Guardar el toggle de un módulo (con rollback si falla)
  const toggleAcceso = async (moduloCodigo, valorActual) => {
    const nuevoValor = valorActual ? 0 : 1;

    // Actualización optimista en pantalla
    setModulos((prev) =>
      prev.map((m) =>
        m.modulo_codigo === moduloCodigo ? { ...m, acceso_estado: nuevoValor } : m
      )
    );

    try {
      const respuesta = await fetch(API_URLS.GUARDAR_ACCESO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          usuario_id: usuarioSeleccionado,
          modulo_codigo: moduloCodigo,
          acceso_estado: nuevoValor,
        }),
      });
      const textoRespuesta = await respuesta.text();
      const data = JSON.parse(textoRespuesta);

      if (!data.exito) {
        throw new Error(data.mensaje || 'No se pudo guardar el cambio.');
      }
    } catch (error) {
      console.error('Error al guardar acceso:', error);
      // Rollback: revertir el switch si falló el guardado
      setModulos((prev) =>
        prev.map((m) =>
          m.modulo_codigo === moduloCodigo ? { ...m, acceso_estado: valorActual } : m
        )
      );
      showCustomAlert('Error', 'No se pudo guardar el cambio. Se revirtió el acceso.');
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  useEffect(() => {
    if (usuarioSeleccionado) {
      cargarAccesos(usuarioSeleccionado);
    }
  }, [usuarioSeleccionado]);

  const renderModulo = ({ item }) => {
    const activo = item.acceso_estado === 1;
    return (
      <View style={[styles.fila, activo ? styles.filaActiva : styles.filaInactiva]}>
        <Text style={styles.filaTexto}>{item.modulo_nombre}</Text>
        <Switch
          value={activo}
          onValueChange={() => toggleAcceso(item.modulo_codigo, item.acceso_estado)}
          trackColor={{ false: '#c0392b', true: '#27ae60' }}
          thumbColor="#fff"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Accesos para Usuarios</Text>
      </View>

      <View style={styles.pickerContainer}>
        {cargandoUsuarios ? (
          <ActivityIndicator size="small" color="#3b5bdb" />
        ) : (
          <Picker
            selectedValue={usuarioSeleccionado}
            onValueChange={(valor) => setUsuarioSeleccionado(valor)}
            style={styles.picker}
          >
            {usuarios.map((u) => (
              <Picker.Item
                key={u.usuario_id}
                label={u.usuario_nombrecomp || u.usuario_nombre}
                value={String(u.usuario_id)}
              />
            ))}
          </Picker>
        )}
      </View>

      {cargandoModulos ? (
        <ActivityIndicator size="large" color="#3b5bdb" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={modulos}
          keyExtractor={(item) => item.modulo_codigo}
          renderItem={renderModulo}
          contentContainerStyle={styles.lista}
        />
      )}

      <CustomAlert
        visible={alertData.visible}
        title={alertData.title}
        message={alertData.message}
        onConfirm={() => {
          setAlertData({ ...alertData, visible: false });
          if (alertData._callback) alertData._callback();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#6c3ce9',
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerTitulo: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    minHeight: 50,
  },
  picker: {
    width: '100%',
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  filaActiva: {
    backgroundColor: '#27ae60',
  },
  filaInactiva: {
    backgroundColor: '#e74c3c',
  },
  filaTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});