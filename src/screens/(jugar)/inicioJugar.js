import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GruposApi from '../../api/GruposApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Equipo1Api from '../../api/Equipo1Api';
import Equipo2Api from '../../api/Equipo2Api';

const InicioJugar = ({ navigation }) => {
  const [groupData, setGroupData] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  const [token, setToken] = useState(null);
  const [idGrupo1, setIdGrupo1] = useState(null);
  const [idGrupo2, setIdGrupo2] = useState(null);
  const [isGroup1Full, setIsGroup1Full] = useState(false);
  const [isGroup2Full, setIsGroup2Full] = useState(false);
  const [equipo1, setEquipo1] = useState([]);
  const [equipo2, setEquipo2] = useState([]);

  useEffect(() => {
    const createGrupos = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@AccessToken');
        const storedIdGrupo1 = await AsyncStorage.getItem('@GrupoId1');
        const storedIdGrupo2 = await AsyncStorage.getItem('@GrupoId2');

        if (storedToken) {
          setToken(storedToken);

          // Verificar si ya existen los grupos o crearlos
          if (storedIdGrupo1 && storedIdGrupo2) {
            setIdGrupo1(storedIdGrupo1);
            setIdGrupo2(storedIdGrupo2);
            console.log('Grupos existentes encontrados:', storedIdGrupo1, storedIdGrupo2);
          } else {
          
            const response1 = await GruposApi.grupoApi(storedToken);
          
            if (response1 && response1.data && response1.data.idGrupo) {
              await AsyncStorage.setItem('@GrupoId1', response1.data.idGrupo.toString());
              setIdGrupo1(response1.data.idGrupo);
              await AsyncStorage.setItem('@GrupoId2', response1.data.idGrupo.toString());
              setIdGrupo2(response1.data.idGrupo);
              console.log('Nuevo grupo 2 creado:', response1.data.idGrupo);
              console.log('Nuevo grupo 1 creado:', response1.data.idGrupo);
            } else {
              console.error('Error al crear grupo 1:', response1);
              console.error('Error al crear grupo 2:', response1);
            }

            
          }
        }
      } catch (error) {
        console.error('Error al inicializar grupos o token:', error);
      }
    };

    createGrupos();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const obtenerInfoGrupos = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('@AccessToken');
          const storedIdGrupo1 = await AsyncStorage.getItem('@GrupoId1');
          const storedIdGrupo2 = await AsyncStorage.getItem('@GrupoId2');
  
          if (storedToken && storedIdGrupo1 && storedIdGrupo2) {
            const equipo1Response = await Equipo1Api.ObtenerInfoGrupo(storedToken, storedIdGrupo1);
            const equipo2Response = await Equipo2Api.ObtenerInfoGrupo(storedToken, storedIdGrupo2);

            if (equipo1Response.data) {
              if (equipo1Response.data.jugadores.length === 2) {
                setIsGroup1Full(true);
              }
              setEquipo1(equipo1Response.data.jugadores);
            }

            if (equipo2Response.data) {
              if (equipo2Response.data.jugadores.length === 2) {
                setIsGroup2Full(true);
              }
              setEquipo2(equipo2Response.data.jugadores);
            }
          }
        } catch (error) {
          console.error('Error al obtener la información de los grupos:', error);
        }
      };
  
      obtenerInfoGrupos();
    }, [])
  );
  useEffect(() => {
    console.log('Valor de equipo1 después de actualizarse:', equipo1);
    console.log('Valor de equipo2 después de actualizarse:', equipo2);
  }, [equipo1, equipo2]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <NavbarHigh />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.innerContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.equipoContainer}>
              <Text style={styles.title}>Equipo 1</Text>
              {equipo1 && Array.isArray(equipo1) ? (
  equipo1.map((jugador) => (
    <View key={jugador.id} style={styles.jugadorContainer}>
      <View style={styles.textos}>
        <Text style={styles.userName}>{jugador.Nombre}</Text>
        <Text style={styles.userRank}>Rango: {jugador.Rango}</Text>
      </View>
      <TouchableOpacity
        style={styles.crossButton}
        onPress={() => UpdateGrupo(jugador.id)} 
      >
        <Text style={styles.crossIcon}> - </Text>
      </TouchableOpacity>
    </View>
  ))
) : (
  <Text>No hay jugadores en el Equipo 1</Text>
)}
{!(idGrupo1 && idGrupo1.id2 !== 0) && ( // Condición para mostrar el botón
  <TouchableOpacity 
    style={styles.addButton}
    onPress={() => navigation.navigate('MostrarJugadoresEquipo1')}
  >
    <AntDesign name="pluscircle" size={30} color="#6CA0D4" />
  </TouchableOpacity>
)}
            </View>

            <View style={styles.equipoContainer}>
              <Text style={styles.title}>Equipo 2</Text>
              {equipo2 && Array.isArray(equipo2) ? (
  equipo2.map((jugador) => (
    <View key={jugador.id} style={styles.jugadorContainer}>
      <View style={styles.textos}>
        <Text style={styles.userName}>{jugador.Nombre}</Text>
        <Text style={styles.userRank}>Rango: {jugador.Rango}</Text>
      </View>
      <TouchableOpacity
        style={styles.crossButton}
        onPress={() => UpdateGrupo(jugador.id)} 
      >
        <Text style={styles.crossIcon}> - </Text>
      </TouchableOpacity>
    </View>
  ))
) : (
  <Text>No hay jugadores en el Equipo 2</Text>
)}
{!(idGrupo2 && idGrupo2.id4 !== 0) && ( // Condición para mostrar el botón
  <TouchableOpacity 
    style={styles.addButton}
    onPress={() => navigation.navigate('MostrarJugadoresEquipo2')}
  >
    <AntDesign name="pluscircle" size={30} color="#6CA0D4" />
  </TouchableOpacity>
)}
            </View>
          </View>

          {(idGrupo1 && idGrupo1.id2 !== 0) && (idGrupo2 && idGrupo2.id4 !== 0) ? (
  <TouchableOpacity
    style={styles.startButton}
    onPress={() => navigation.navigate('PuntajeJugar')} 
  >
    <Text style={styles.startButtonText}>Empezar Partido</Text>
  </TouchableOpacity>
) : null}
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
  container: {
    flex: 1,
    backgroundColor:"#EBEBEB",
    alignItems: 'center',
    paddingTop: "32%",
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  innerContainer: {
    marginTop: '2%',
    alignItems: 'center',
    width: '90%'
  },
  profileContainer: {
    alignItems: 'center',
    width: '100%',
  },
  equipoContainer: {
    marginBottom: 20,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    shadowColor: '#000',
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userRank: {
    fontSize: 18,
    color: 'gray',
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "5%",
  },
  startButton: {
    backgroundColor: '#32CD32',
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },
  startButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  crossIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  jugadorContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    marginBottom: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textos: {},
});

export default InicioJugar;