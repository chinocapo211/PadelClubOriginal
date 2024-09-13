import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GruposApi from '../../api/GruposApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const InicioJugar = ({ navigation }) => {
  const [groupData, setGroupData] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  const [token, setToken] = useState(null);
  const [idGrupo, setIdGrupo] = useState(null);
  const [isGroupFull, setIsGroupFull] = useState(false);
  const [equipo1, setEquipo1] = useState([]);
  const [equipo2, setEquipo2] = useState([]);

  useEffect(() => {
    const createGrupo = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@AccessToken');
        const storedIdGrupo = await AsyncStorage.getItem('@GrupoId');

        if (storedToken) {
          setToken(storedToken);

          if (storedIdGrupo) {
            setIdGrupo(storedIdGrupo);
            console.log('Grupo existente encontrado:', storedIdGrupo);
          } else {
            const response = await GruposApi.grupoApi(storedToken);

            if (response && response.data && response.data.idGrupo) {
              await AsyncStorage.setItem('@GrupoId', response.data.idGrupo.toString());
              setIdGrupo(response.data.idGrupo);
              setGroupData(response.data);
              console.log('Nuevo grupo creado:', response.data.idGrupo);
            } else {
              console.error('Error al crear grupo:', response);
            }
          }
        }
      } catch (error) {
        console.error('Error al inicializar grupo o token:', error);
      }
    };

    createGrupo();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const obtenerInfoGrupo = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('@AccessToken');
          const storedIdGrupo = await AsyncStorage.getItem('@GrupoId');
  
          if (storedToken && storedIdGrupo) {
            const response = await GruposApi.ObtenerInfoGrupo(storedToken, storedIdGrupo);
            console.log(response.data);
  
            if (response.data && response.data.jugadores) {
              setJugadores(response.data.jugadores);

              // Verificar si el grupo está lleno
              const { id2, id3, id4 } = response.data.grupo;
              if (id2 !== 0 && id3 !== 0 && id4 !== 0) {
                setIsGroupFull(true);
              } else {
                setIsGroupFull(false);
              }

              // Dividir jugadores en dos equipos
              const jugadoresList = response.data.jugadores;
              const equipo1 = jugadoresList.slice(0, 2); // Primeros 2 jugadores
              const equipo2 = jugadoresList.slice(2, 4); // Siguientes 2 jugadores

              setEquipo1(equipo1);
              setEquipo2(equipo2);
            }
            setGroupData(response.data);
          }
        } catch (error) {
          console.error('Error al obtener la información del grupo:', error);
        }
      };
  
      if (idGrupo) {
        obtenerInfoGrupo();
      }
  
      return () => {};
  
    }, [idGrupo])
  );

  const UpdateGrupo = async (selectedPlayerId) => {
    try {
      const storedToken = await AsyncStorage.getItem('@AccessToken');
      const storedIdGrupo = await AsyncStorage.getItem('@GrupoId');
      console.log("idDelGrupo" + storedIdGrupo);

      if (storedToken && storedIdGrupo) {
        const grupoResponse = await GruposApi.ObtenerInfoGrupo(storedToken, storedIdGrupo);

        if (grupoResponse) {
          const grupo = grupoResponse.data.grupo;

          if (grupoResponse.data.grupo.id2 === selectedPlayerId) {
            grupo.id2 = 0;
          } else if (grupo.id3 === selectedPlayerId) {
            grupo.id3 = 0;
          } else if (grupo.id4 === selectedPlayerId) {
            grupo.id4 = 0;
          } else {
            console.warn('El jugador no se encuentra en el grupo');
            return;
          }

          const updateResponse = await GruposApi.UpdateGrupo(storedToken, storedIdGrupo, grupoResponse);

          if (updateResponse) {
            console.log('Grupo actualizado:', updateResponse);

            setJugadores(prevJugadores => prevJugadores.filter(jugador => jugador.id !== selectedPlayerId));
            
            // Actualizar la verificación de si el grupo está lleno
            const { id2, id3, id4 } = grupo;
            if (id2 !== 0 && id3 !== 0 && id4 !== 0) {
              setIsGroupFull(true);
            } else {
              setIsGroupFull(false);
            }
            
            // Actualizar la división de equipos
            const jugadoresList = jugadores.filter(jugador => jugador.id !== selectedPlayerId);
            const nuevoEquipo1 = jugadoresList.slice(0, 2);
            const nuevoEquipo2 = jugadoresList.slice(2, 4);

            setEquipo1(nuevoEquipo1);
            setEquipo2(nuevoEquipo2);
          } else {
            console.error('Error al actualizar el grupo:', updateResponse);
          }
        } else {
          console.error('Grupo no encontrado en la respuesta:', grupoResponse);
        }
      } else {
        console.warn('Token o ID del grupo no disponible');
      }
    } catch (error) {
      console.error('Error al actualizar el grupo:', error);
    }
  };

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
              {equipo1.map((jugador) => (
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
              ))}
            </View>
            <View style={styles.equipoContainer}>
              <Text style={styles.title}>Equipo 2</Text>
              {equipo2.map((jugador) => (
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
              ))}
            </View>
          </View>
          {jugadores.length < 4 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('MostrarJugadores')}
            >
              <AntDesign name="pluscircle" size={40} color="#6CA0D4" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => navigation.navigate('PuntajeJugar')} 
            >
              <Text style={styles.startButtonText}>Empezar Partido</Text>
            </TouchableOpacity>
          )}
        </View>
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
    alignItems: 'center',
    paddingTop: 120,
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
    width:'90%'
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
    padding:10,
    
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
  addButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  startButton: {
    backgroundColor: '#32CD32', // Verde para indicar acción de comenzar
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%', // Margen superior para separarlo del contenedor anterior
  },
  startButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -3.5,
  },
  crossIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  jugadorContainer:{
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
    padding:10,
    marginBottom:'10%',
    flexDirection: 'row', // Alinea los elementos en una fila
    justifyContent: 'space-between', // Distribuye los elementos para que haya espacio entre ellos
    alignItems: 'center', // Centra los elementos verticalmente
  },
  textos:{
    
  }
});

export default InicioJugar;