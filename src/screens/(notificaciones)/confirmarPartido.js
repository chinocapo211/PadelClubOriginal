import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
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
          //probar traer notifiacion entera por parametro
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
            <Text> {notificacion.data.Mensaje}</Text>
          ) : (
            <Text>Cargando notificación...</Text>
          )}
          {partido ? (
            <>
              <Text>Puntaje Equipo 1: {partido.puntajeEquipo1}</Text>
              <Text>Puntaje Equipo 2: {partido.puntajeEquipo2}</Text>
            </>
          ) : (
            <Text>Cargando datos del partido...</Text>
          )}

          <Text> Si</Text>
          <Text>No</Text>
        </View>
      </View>  
    </SafeAreaView>
  );
};
/*
  --------------------ACA CALCULO ELO

---------------IMPORTANTE, CREAR "KFactor" para que se pueda calcular el elo
KFactor arranca como 200 por 5 partidos
Hasta los 15 partidos vale 150
A partir de ahi vale 100

  idEquipo1 = grupo[partido.grupo].equipo1
  idEquipo2 = grupo[partido.grupo].equipo2
  idJugador1 = Jugador[Equipo1[idEquipo1].id1].id
  idJugador2 = Jugador[Equipo1[idEquipo1].id2].id
  idJugador3 = Jugador[Equipo2[idEquipo2].id1].id
  idJugador4 = Jugador[Equipo2[idEquipo2].id2].id

  Equipo1PuntosTotales = (Jugador[idJugador1].puntos + Jugador[idJugador2].puntos]):2
  Equipo2PuntosTotales = (Jugador[idJugador3].puntos + Jugador[idJugador4].puntos]):2
  
  const E1 = calcularE(Equipo1PuntosTotales, Equipo2PuntosTotales)
  const E2 = calcularE(Equipo2PuntosTotales, Equipo1PuntosTotales)

  if(partido.puntajeEquipo1 > puntajeEquipo2){
     Jugador1PutajeNuevo = Jugador[idJugador1].puntos + Jugador[idJugador1].KFactor * (1 - E1)
     Jugador2PutajeNuevo = Jugador[idJugador2].puntos + Jugador[idJugador2].KFactor * (1 - E1)
     Jugador3PutajeNuevo = Jugador[idJugador3].puntos + Jugador[idJugador3].KFactor * (0 - E2)
     Jugador4PutajeNuevo = Jugador[idJugador4].puntos + Jugador[idJugador3].KFactor * (0 - E2)
  }
  elseIf(partido.puntajeEquipo2 > puntajeEquipo1){
     Jugador1PutajeNuevo = Jugador[idJugador1].puntos + Jugador[idJugador1].KFactor * (0 - E1)
     Jugador2PutajeNuevo = Jugador[idJugador2].puntos + Jugador[idJugador2].KFactor * (0 - E1)
     Jugador3PutajeNuevo = Jugador[idJugador3].puntos + Jugador[idJugador3].KFactor * (1 - E2)
     Jugador4PutajeNuevo = Jugador[idJugador4].puntos + Jugador[idJugador3].KFactor * (1 - E2)
  }
  else{
    Error
  }

  FUNCION PARA CALCULAR E
  function calcularE(eloJugador, eloOponente) {
    const E = 1 / (1 + Math.pow(10, (eloOponente - eloJugador) / 600));
    return E;
}
*/


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
