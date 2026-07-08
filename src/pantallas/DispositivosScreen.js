/*Paso 1: Instalar dependencia Datepicker 
npm install @react-native-community/datetimepicker*/

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { API_URLS } from '../config/config';

const DispositivosScreen = () => {
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [showPickerInicio, setShowPickerInicio] = useState(false);
  const [showPickerFin, setShowPickerFin] = useState(false);
  const [dispositivosFiltrados, setDispositivosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Filtrar dispositivos cuando cambian las fechas
  useEffect(() => {
    filtrarDispositivos();
  }, [fechaInicio, fechaFin]);

  // Convierte un objeto Date a 'YYYY-MM-DD' (formato que espera el PHP)
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filtrarDispositivos = async () => {
    setLoading(true);
    setMensaje('');

    try 
    {
      // Preparar los datos que espera el PHP
      const data = {
        fecha_inicial: formatDateToYYYYMMDD(fechaInicio),
        fecha_final: formatDateToYYYYMMDD(fechaFin),
      };

      console.log('📤 Enviando al PHP:', data);

      // Hacer la petición POST
      const response = await fetch(API_URLS.FILTRAR_DISPOSITIVO, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Verificar respuesta HTTP
      if (!response.ok) 
      {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      // Parsear JSON
      const resultado = await response.json();
      console.log('📥 Respuesta del PHP:', resultado);

      // Procesar según el status
      if (resultado.status === 'success') 
      {
        setDispositivosFiltrados(resultado.data);
        setMensaje(`${resultado.total} dispositivo(s) encontrado(s)`);
      } 
      else if (resultado.status === 'warning') 
      {
        setDispositivosFiltrados([]);
        setMensaje('No se encontraron dispositivos en el rango');
      } 
      else 
      {
        setDispositivosFiltrados([]);
        setMensaje(resultado.message || 'Error desconocido');
        Alert.alert('Error', resultado.message);
      }
    } 
    catch (error) 
    {
      console.error('❌ Error:', error);
      setMensaje('Error al conectar con el servidor');
      Alert.alert(
        'Error de Conexión',
        `No se pudo conectar con el servidor.\n\n${error.message}`
      );
    } 
    finally 
    {
      setLoading(false);
    }
  };

  const onChangeFechaInicio = (event, selectedDate) => {
    setShowPickerInicio(Platform.OS === 'ios');
    if (selectedDate) {
      setFechaInicio(selectedDate);
    }
  };

  const onChangeFechaFin = (event, selectedDate) => {
    setShowPickerFin(Platform.OS === 'ios');
    if (selectedDate) {
      setFechaFin(selectedDate);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.deviceCard}>
      <View style={styles.deviceHeader}>
        <Text style={styles.deviceId}>{item.dispo_unique_id}</Text>
      </View>

      <Text style={styles.deviceName}>{item.dispo_nombre_equipo}</Text>

      <View style={styles.deviceInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Marca:</Text>
          <Text style={styles.infoValue}>{item.dispo_marca}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Modelo:</Text>
          <Text style={styles.infoValue}>{item.dispo_modelo}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Sistema Operativo:</Text>
          <Text style={styles.infoValue}>
            {item.dispo_so} {item.dispo_so_version}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>MAC:</Text>
          <Text style={styles.infoValue}>{item.dispo_dir_mac}</Text>
        </View>
      </View>

      <View style={styles.datesContainer}>
        <View style={styles.dateBox}>
          <Text style={styles.dateLabel}>📅 Registro:</Text>
          <Text style={styles.dateValue}>{formatDate(item.dispo_fregistro)}</Text>
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.dateLabel}>🔄 Último Acceso:</Text>
          <Text style={styles.dateValue}>{formatDate(item.dispo_factual)}</Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No se encontraron dispositivos</Text>
      <Text style={styles.emptySubtext}>
        en el rango de fechas seleccionado
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header con Date Pickers */}
      <View style={styles.header}>
        <Text style={styles.title}>Dispositivos</Text>
        
        <View style={styles.datePickersContainer}>
          {/* Date Picker Inicio */}
          <View style={styles.datePickerWrapper}>
            <Text style={styles.datePickerLabel}>Fecha Inicio:</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowPickerInicio(true)}
            >
              <Text style={styles.dateButtonText}>
                {fechaInicio.toLocaleDateString('es-ES')}
              </Text>
            </TouchableOpacity>
            {showPickerInicio && (
              <DateTimePicker
                value={fechaInicio}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeFechaInicio}
              />
            )}
          </View>

          {/* Date Picker Fin */}
          <View style={styles.datePickerWrapper}>
            <Text style={styles.datePickerLabel}>Fecha Fin:</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowPickerFin(true)}
            >
              <Text style={styles.dateButtonText}>
                {fechaFin.toLocaleDateString('es-ES')}
              </Text>
            </TouchableOpacity>
            {showPickerFin && (
              <DateTimePicker
                value={fechaFin}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangeFechaFin}
              />
            )}
          </View>
        </View>

        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            {mensaje}
          </Text>
        </View>
      </View>

      {/* Lista de Dispositivos */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <FlatList
          data={dispositivosFiltrados}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.dispo_unique_id ? String(item.dispo_unique_id) + index : String(index)}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={true}
          refreshing={loading}
          onRefresh={filtrarDispositivos}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  datePickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  datePickerWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
  datePickerLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  dateButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  resultsInfo: {
    alignItems: 'center',
    marginTop: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  deviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  deviceId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  deviceInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    width: 130,
  },
  infoValue: {
    fontSize: 13,
    color: '#333',
    flex: 1,
  },
  datesContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 10,
  },
  dateBox: {
    marginBottom: 6,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DispositivosScreen;