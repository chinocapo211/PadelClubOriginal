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
        const response = await GruposApi.ObtenerInfoGrupo(storedToken, notificacion.data.idGrupo);
        const responseEquipo1 = await Equipo1Api.ObtenerInfoGrupo(storedToken, response.data.grupo.idEquipo1);
        const responseEquipo2 = await Equipo2Api.ObtenerInfoGrupo(storedToken, response.data.grupo.idEquipo2);
  
        if (responseEquipo1 && responseEquipo2) {
          const jugador1 = responseEquipo1.data.jugadores[0];
          const jugador2 = responseEquipo1.data.jugadores[1];
          const jugador3 = responseEquipo2.data.jugadores[0];
          const jugador4 = responseEquipo2.data.jugadores[1];
  
          
          setJugador1(jugador1);
          setJugador2(jugador2);
          setJugador3(jugador3);
          setJugador4(jugador4);
  
          if (jugador1 && jugador2 && jugador3 && jugador4) {
            setListJugadores([jugador1, jugador2, jugador3, jugador4]); 
          } else {
            console.log('Error: Uno o más jugadores no están disponibles.');
          }
        }
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
  useEffect(() => {
    console.log('Jugadores en listJugadores:', listJugadores);
    console.log('Cantidad de jugadores:', listJugadores.length);
  }, [listJugadores]);
  
 
  useEffect( async () => {
    if (listJugadores.length === 4) {
      console.log('Jugadores en listJugadores:', listJugadores);
  
      const equipo1 = listJugadores.slice(0, 2);
      const equipo2 = listJugadores.slice(2, 4);
  
      const equipo1PuntosTotales = (equipo1[0].Puntos + equipo1[1].Puntos) / 2;
      const equipo2PuntosTotales = (equipo2[0].Puntos + equipo2[1].Puntos) / 2;
  
      const E1 = calcularE(equipo1PuntosTotales, equipo2PuntosTotales);
      const E2 = calcularE(equipo2PuntosTotales, equipo1PuntosTotales);
  
      equipo1.forEach(jugador => {
        let kFactor = calcularKFactor(jugador.Cant_Partidos);
        // Calcula el nuevo puntaje
        const nuevoPuntaje = kFactor * (1 - E1);
        jugador.puntos = nuevoPuntaje; // Asigna el nuevo puntaje
      });
  
      equipo2.forEach(jugador => {
        let kFactor = calcularKFactor(jugador.Cant_Partidos);
        // Calcula el nuevo puntaje
        const nuevoPuntaje = kFactor * (0 - E2);
        jugador.puntos = nuevoPuntaje; // Asigna el nuevo puntaje
      });
  
      
      await Promise.all(listJugadores.map(async jugador => {
        await userApi.actualizarJugador(jugador.id, jugador.puntos);
      }));
  
      console.log('Puntos actualizados:', listJugadores);
    }
  }, [listJugadores]);
  
  const updatePlayerPointsByEloSystem = async () => {
    await fetchGrupoAndPlayers(); // Asegura que el fetch termine antes de usar los datos
  };
  
  // Calcular KFactor basado en Cant_Partidos
  const calcularKFactor = (cantPartidos) => {
    if (cantPartidos <= 5) return 200;
    if (cantPartidos <= 15) return 150;
    return 100;
  };
  
  // Función para calcular E (probabilidad de victoria)
  const calcularE = (eloJugador, eloOponente) => {
    return 1 / (1 + Math.pow(10, (eloOponente - eloJugador) / 600));
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
