import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavbarHigh from '../../components/navbarHigh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PartidoPendienteApi from '../../api/PartidoPendienteApi';
import NotificacionesApi from '../../api/NotificacionesApi';

const ConfirmarPartido = ({ navigation, route }) => {
  const [partido, setPartido] = useState(null); 
  const [notificacion, setnoti] = useState(null); 
  const { noti } = route.params;

  useEffect(() => {
    const fetchPartido = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@AccessToken');
        if (storedToken) {
          const response = await NotificacionesApi.getInfoNotificacionById(storedToken, noti);
          const partidoData = await PartidoPendienteApi.getPartidoByidGrupo(storedToken, response.data.idGrupo);
          
          if (partidoData && partidoData.data) {
            setPartido(partidoData.data);
            setnoti(response);
          } else {
            console.error('Respuesta inesperada:', partidoData);
          }
        } else {
          console.log('Token no encontrado');
        }
      } catch (error) {
        console.error('Failed to fetch notifications or token:', error);
      }
    };

    fetchPartido();
  }, [noti]);

  const handleConfirm = () => {
    Alert.alert('Confirmación', 'El partido ha sido confirmado.');
  }

  const handleReport = () => {
    Alert.alert('Denunciar', 'El partido ha sido denunciado.');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../../assets/images/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <NavbarHigh />
        <View style={styles.content}>
          {notificacion ? (
            <Text style={styles.notificationText}>{notificacion.data.Mensaje}</Text>
          ) : (
            <Text style={styles.loadingText}>Cargando notificación...</Text>
          )}
          {partido ? (
            <>
              <Text style={styles.scoreText}>Puntaje Equipo 1: {partido.puntajeEquipo1}</Text>
              <Text style={styles.scoreText}>Puntaje Equipo 2: {partido.puntajeEquipo2}</Text>
            </>
          ) : (
            <Text style={styles.loadingText}>Cargando datos del partido...</Text>
          )}

          <TouchableOpacity style={styles.buttonConfirm} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonReport} onPress={handleReport}>
            <Text style={styles.buttonText}>Denunciar</Text>
          </TouchableOpacity>
        </View>
      </View>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EBEBEB"
  },
  backButton: {
    width: 30,
    height: 30,
    zIndex: 1,
  },
  backImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonConfirm: {
    backgroundColor: '#81E7B5', // Verde más fuerte
    width: '70%', // Botón más pequeño
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonReport: {
    backgroundColor: '#FF9A9A', // Rojo más fuerte
    width: '70%', // Botón más pequeño
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center', // Centrar el texto
  },
  notificationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333', // Color del texto de notificación
  },
  scoreText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#444', // Color del texto del puntaje
  },
  loadingText: {
    fontSize: 16,
    color: '#888', // Color para el texto de carga
  },
});

export default ConfirmarPartido;
