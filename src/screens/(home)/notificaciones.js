import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'; // Asegúrate de importar FlatList aquí
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
          if (response.error) {
            console.error('Error en la solicitud:', response.error);
            return;
          }
          setNotificaciones(response.notifications || []); // Asegúrate de que `response.notifications` es un array
        } else {
          console.log('Token no encontrado');
        }
      } catch (error) {
        console.error('Failed to fetch notifications or token:', error);
      }
    };
    fetchNotifications();
  }, []);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.mensaje}</Text> {/* Ajusta esto según la estructura de tu notificación */}
    </View>
  );

  return (
    <View style={styles.container}>
      <NavbarHigh />
      <FlatList
        data={notificaciones}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()} // Ajusta esto según el formato de tu notificación
        contentContainerStyle={styles.list}
      />
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
