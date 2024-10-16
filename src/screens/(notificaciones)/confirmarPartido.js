import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PartidoPendienteApi from '../../api/PartidoPendienteApi';
import NotificacionesApi from '../../api/NotificacionesApi';
import userApi from '../../api/userApi';
import GruposApi from '../../api/GruposApi';
import Equipo1Api from '../../api/Equipo1Api';
import Equipo2Api from '../../api/Equipo2Api';

const ConfirmarPartido = ({ navigation, route }) => {
  const [partido, setPartido] = useState(null); 
  const [notificacion, setnoti] = useState(null); 
  const [Jugador1, setJugador1] = useState(null);
  const [Jugador2, setJugador2] = useState(null);
  const [Jugador3, setJugador3] = useState(null);
  const [Jugador4, setJugador4] = useState(null);

  const [listJugadores, setListJugadores] = useState([]);
  const { noti } = route.params;

  const kFactor = 0;

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
  
  const fetchGrupoAndPlayers = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@AccessToken');
      if (storedToken) {
        console.log(JSON.stringify(notificacion, null, 2));
        const response = await GruposApi.ObtenerInfoGrupo(storedToken, notificacion.data.idGrupo);
        console.log(JSON.stringify(response, null, 2));
  
        const responseEquipo1 = await Equipo1Api.ObtenerInfoGrupo(storedToken, response.data.grupo.idEquipo1);
        const responseEquipo2 = await Equipo2Api.ObtenerInfoGrupo(storedToken, response.data.grupo.idEquipo2);
        console.log(JSON.stringify(responseEquipo1, null, 2));
        console.log(JSON.stringify(responseEquipo2, null, 2));
  
        if (responseEquipo1 && responseEquipo2) {
          setJugador1(responseEquipo1.data.jugadores[0]);
          setJugador2(responseEquipo1.data.jugadores[1]);
          setJugador3(responseEquipo2.data.jugadores[0]);
          setJugador4(responseEquipo2.data.jugadores[1]);
        }
        setListJugadores(Jugador1,Jugador2,Jugador3,Jugador4);
      } else {
        console.log('Token no encontrado');
      }
    } catch (error) {
      console.error('Failed to fetch notifications or token:', error);
    }
  };
  
  useEffect(() => {
    console.log("Data jugador:", Jugador1);
    console.log("Data jugador:", Jugador2);
    console.log("Data jugador:", Jugador3);
    console.log("Data jugador:", Jugador4);
  }, [Jugador1,Jugador2,Jugador3,Jugador4]);

  const updatePlayerPointsByEloSystem = async => 
    {

      fetchGrupoAndPlayers();
      let i = 0;
      for(  i ; i < listJugadores.length; i++)
      {
        if(listJugadores[i].Cant_Partidos <= 5)
      {
        kFactor = 200
      }
      else if(listJugadores[i].Cant_Partidos < 15 &&  listJugadores[i].Cant_Partidos > 5)
      {
        kFactor = 150;
      }
      else
      {
        kFactor = 100;
      }
      
      if(partido.puntajeEquipo1 > puntajeEquipo2){
        Jugador1PutajeNuevo = Jugador[idJugador1].puntos + Jugador[idJugador1].KFactor * (1 - E1)
        Jugador2PutajeNuevo = Jugador[idJugador2].puntos + Jugador[idJugador2].KFactor * (1 - E1)
        Jugador3PutajeNuevo = Jugador[idJugador3].puntos + Jugador[idJugador3].KFactor * (0 - E2)
        Jugador4PutajeNuevo = Jugador[idJugador4].puntos + Jugador[idJugador3].KFactor * (0 - E2)
     }
     else if(partido.puntajeEquipo2 > puntajeEquipo1){
        Jugador1PutajeNuevo = Jugador[idJugador1].puntos + Jugador[idJugador1].KFactor * (0 - E1)
        Jugador2PutajeNuevo = Jugador[idJugador2].puntos + Jugador[idJugador2].KFactor * (0 - E1)
        Jugador3PutajeNuevo = Jugador[idJugador3].puntos + Jugador[idJugador3].KFactor * (1 - E2)
        Jugador4PutajeNuevo = Jugador[idJugador4].puntos + Jugador[idJugador3].KFactor * (1 - E2)
     }
     else{
       Error
     }
      }
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

           <TouchableOpacity style={styles.buttonConfirm} onPress={updatePlayerPointsByEloSystem}>
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
    justifyContent: 'center', 
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
  buttonReport: {
    backgroundColor: '#FF9A9A', 
    width: '70%',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonConfirm: {
    backgroundColor: '#81E7B5', 
    width: '70%', 
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333', 
  },
  scoreText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#444', 
  },
  loadingText: {
    fontSize: 16,
    color: '#888', 
  },
});

export default ConfirmarPartido;
