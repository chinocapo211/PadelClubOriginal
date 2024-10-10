import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native'; 
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
          const response = await NotificacionesApi.NotificacionesApi(storedToken);

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

  const handlePartidoButton = (item) => {
    console.log(" item antes de entrar al partido" + item);
    navigation.navigate('ConfirmarPartido', {noti : item}); //, { partidoId: item.id }
  };
  const handleSancionButton = (item) => {
    navigation.navigate('Sancion'); //, { partidoId: item.id }
  }; 
  const handleNotificacionButton = (item) => {
    navigation.navigate('Notificacion'); //, { partidoId: item.id }
  }; 
  const handleGlobalButton = (item) => {
    navigation.navigate('Global'); //, { partidoId: item.id }
  }; 
  const handleTorneoButton = (item) => {
    navigation.navigate('Torneo'); //, { partidoId: item.id }
  }; 

  const renderNotification = ({ item }) => (
    <View style={styles.notificationContainer} key={item.id}>
      <View style={styles.iconContainer}>
        <Image source={{ uri: item.icon }} style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.notificationText}>{item.Mensaje}</Text>
        <Text style={styles.dateText}>{new Date(item.Fecha).toLocaleString()}</Text>
      </View>
      {/* Botón alineado a la derecha */}
      {item.Tipo === 'Confirmar_Resultado_Partido' && (
        <TouchableOpacity style={styles.button} onPress={() => handlePartidoButton(item.id)}>
          <Text style={styles.buttonText}>Ver Partido</Text>
        </TouchableOpacity>
      )}
      {item.Tipo === 'Sancion' && (
        <TouchableOpacity style={styles.button} onPress={() => handleSancionButton(item)}>
          <Text style={styles.buttonText}>Ver Partido</Text>
        </TouchableOpacity>
      )}
      {item.Tipo === 'Notificacion' && (
        <TouchableOpacity style={styles.button} onPress={() => handleNotificacionButton(item)}>
          <Text style={styles.buttonText}>Ver Partido</Text>
        </TouchableOpacity>
      )}
      {item.Tipo === 'Global' && (
        <TouchableOpacity style={styles.button} onPress={() => handleGlobalButton(item)}>
          <Text style={styles.buttonText}>Ver Partido</Text>
        </TouchableOpacity>
      )}
      {item.Tipo === 'Torneo' && (
        <TouchableOpacity style={styles.button} onPress={() => handleTorneoButton(item)}>
          <Text style={styles.buttonText}>Ver Partido</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  
  const handleButtonPress = (item) => {
    console.log('Acción para el partido:', item);
  };

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
        
        <View style={styles.flatcont}>
          <FlatList
            contentContainerStyle={styles.notificationList}
            data={notificaciones}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay notificaciones</Text>}
          />
        </View>
        <NavbarLow />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EBEBEB"
  },
  flatcont: {
    marginTop: '30%',
  },
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  notificationList: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'center',
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
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginRight: 10,
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
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#00BFFF',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default Notificaciones;
