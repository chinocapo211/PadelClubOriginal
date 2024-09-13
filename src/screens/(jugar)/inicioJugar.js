import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
  const [idGrupo, setIdGrupo] = useState(null);
  const [isGroup1Full, setIsGroup1Full] = useState(false);
  const [isGroup2Full, setIsGroup2Full] = useState(false);
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
            console.log( "Respuesta info grupo" + response);
  
            if (response.data) {   
            
              const equipo1Response = await Equipo1Api.ObtenerInfoGrupo(storedToken, storedIdGrupo);
              console.log("Respuesta equipo1:", JSON.stringify(equipo1Response, null, 2));
              console.log("ID equipo1" + equipo1Response.data.grupo.id2);
              if(equipo1Response.data.grupo.id2 != 0)
              {
                setIsGroup1Full(true);
              }

              setEquipo1(equipo1Response.data.grupo);

              
              const equipo2Response = await Equipo2Api.ObtenerInfoGrupo(storedToken, storedIdGrupo);
              if(equipo2Response.data.grupo.id3 != 0 && equipo2Response.data.grupo.id4 != 0)
              {
                setIsGroup1Full(true);
              }


              setEquipo1(equipo1Response.data.grupo); // Asigna el valor al estado de equipo1
              setEquipo2(equipo2Response);
            }
            console.log("Valor de equipo1 antes del renderizado:", equipo1);
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
              {equipo1.data.jugadores.map((jugador) => (
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
              {equipo2.data.jugadores.map((jugador) => (
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