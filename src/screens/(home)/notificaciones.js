import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'; 
import NavbarHigh from '../../components/navbarHigh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavbarLow from '../../components/navbarLow';
import NotificacionesApi from '../../api/NotificacionesApi';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notificaciones = ({ navigation }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@AccessToken');
        if (storedToken) {
          const response = await NotificacionesApi(storedToken);

          console.log('Respuesta de la API:', response);

          if (Array.isArray(response.data)) {
            setNotificaciones(response.data);
          } else if (response && Array.isArray(response.notificaciones)) {
            setNotificaciones(response.notificaciones);
          } else {
            console.error('Respuesta inesperada:', response);
            setNotificaciones([]);
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
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <NavbarHigh />
      <FlatList
        contentContainerStyle={styles.notificationList}
        data={notificaciones}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay notificaciones</Text>}
      />
      <NavbarLow />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  notificationList: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 80, // Deja espacio para la navbar
    flexGrow: 1,
    justifyContent: 'center', // Centra verticalmente cuando está vacío
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    elevation: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconContainer: {
    marginRight: 15,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  emptyText: {
    fontSize: 18,
    color: '#757575',
    backgroundColor: '#6CA0D4',
    textAlign: 'center',
    marginTop: 170,
  },
});

export default Notificaciones;