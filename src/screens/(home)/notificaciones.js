import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import NavbarHigh from '../../components/navbarHigh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavbarLow from '../../components/navbarLow';
import NotificacionesApi from '../../api/NotificacionesApi';

const Notificaciones = ({ navigation }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@AccessToken');
        if (storedToken) {
          const response = await NotificacionesApi(storedToken);
          
          // Verifica la respuesta de la API
          console.log('Respuesta de la API:', response);

          if (Array.isArray(response.data)) {
            setNotificaciones(response.data);
          } else if (response && Array.isArray(response.notificaciones)) {
            // Ajusta esto según la estructura real de la respuesta
            setNotificaciones(response.notificaciones);
          } else {
            console.error('Respuesta inesperada:', response);
            setNotificaciones([]); // Asegúrate de que `notificaciones` siempre sea un array
          }
        } else {
          console.log('Token no encontrado');
        }
      } catch (error) {
        console.error('Failed to fetch notifications or token:', error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <NavbarHigh />
      {notificaciones.length > 0 ? (
        notificaciones.map((notificacion) => (
          <View key={notificacion.id}>
            <Text>{notificacion.Mensaje}</Text>
          </View>
        ))
      ) : (
        <Text>No hay notificaciones</Text>
      )}
      <NavbarLow />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
  },
  button: {
    backgroundColor: '#d3d3d3',
    width: '75%',
    height: 50, // Define a fixed height for better centering
    padding: 10, // Adjust padding as needed
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically
    borderRadius: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Notificaciones;
