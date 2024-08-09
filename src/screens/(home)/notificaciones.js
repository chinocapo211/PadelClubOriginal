import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'; 
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

  // Renderizar cada notificación en un componente
  const renderNotification = ({ item }) => (
    <View style={styles.notificationContainer} key={item.id}>
      <View style={styles.iconContainer}>
        <Image source={{ uri: item.icon }} style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>{item.Mensaje}</Text>
        <Text style={styles.dateText}>{new Date(item.Fecha).toLocaleString()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <NavbarHigh />
      <View style={styles.notificationList}>
        {notificaciones.length > 0 ? (
          <FlatList
            data={notificaciones}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay notificaciones</Text>
          </View>
        )}
      </View>
      <NavbarLow />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  notificationList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconContainer: {
    marginRight: 15,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#757575',
  },
});

export default Notificaciones;

