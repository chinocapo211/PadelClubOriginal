import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PartidoApi from '../../api/PartidoApi';

const ConfirmarPartido = ({ navigation }) => {

  useEffect(() => {
    const fetchPartido = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@GrupoId1');
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
    fetchPartido();
  }, []);

/*
  --------------------ACA CALCULO ELO
  idEquipo1 = grupo[partido.grupo].equipo1
  idEquipo2 = = grupo[partido.grupo].equipo2
  Equipo1PuntosTotales = Jugador[Equipo1[idEquipo1].id1].puntos + Jugador[Equipo1[idEquipo1].id2]
  Equipo2PuntosTotales = Jugador[Equipo1[idEquipo2].id1].puntos + Jugador[Equipo1[idEquipo2].id2]
  if(partido.puntajeEquipo1 > puntajeEquipo2){
     
  }
  elseIf(partido.puntajeEquipo2 > puntajeEquipo1){

  }
  else{
    error con valores null
  }
*/
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../../assets/images/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <NavbarHigh/>
        <View style={styles.content}>

        </View>
      </View>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:"#EBEBEB"
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
    justifyContent: 'center', // Para centrar el contenido en la pantalla
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#d3d3d3',
    width: '150%',
    height: '15%',
    padding: '6%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonClub: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    marginBottom: '3%'
  },  
});

export default ConfirmarPartido;
