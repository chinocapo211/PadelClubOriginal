import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userApi from '../../api/userApi';
import GruposApi from '../../api/GruposApi';

const MostrarJugadores = ({ navigation }) => {
  const [jugadores, setJugadores] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@AccessToken');
        if (storedToken) {
          setToken(storedToken);
          const response = await userApi.ObtenerJugadores(storedToken);
          if (response && Array.isArray(response)) {
            setJugadores(response); 
          } else {
            console.error('Response structure is not as expected:', response);
          }
        }
      } catch (error) {
        console.error('Failed to fetch players or token:', error);
      }
    };

    fetchJugadores();
  }, []);


  useEffect(() =>
  {
    const updateGrupo = async() =>{

      try
      {
        const storedToken = await AsyncStorage.getItem('@AccessToken');
        if(storedToken)
        {
          setToken(storedToken);
          const response = await GruposApi.updateGrupo(token,)
        }
      }
      catch(error)
      {
        console.error(error);
      }
    }
  })

  return (
    <View style={styles.container}>
      <NavbarHigh />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../assets/images/back.png')}
          style={styles.backButton}
        />
      </TouchableOpacity>

      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {jugadores.map((item) => (
            <View key={item.id} style={styles.profileContainer}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.Nombre}</Text>
                <Text style={styles.userRank}>{item.Rango}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate('SomeScreen', { playerId: item.id })}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 10,
    zIndex: 1, // Asegura que el botón de volver esté sobre el ScrollView
  },
  scrollContainer: {
    flex: 1, // Ocupa todo el espacio disponible
    marginTop: 20, // Espacio desde el top (puedes ajustarlo según tu diseño)
    marginBottom: 20, // Espacio en la parte inferior
    overflow: 'hidden', // Asegura que cualquier contenido extra fuera de este contenedor no se vea
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  profileContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userRank: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default MostrarJugadores;