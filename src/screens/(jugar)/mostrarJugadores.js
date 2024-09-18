import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userApi from '../../api/userApi';
import GruposApi from '../../api/GruposApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Equipo1Api from '../../api/Equipo1Api';
import Equipo2Api from '../../api/Equipo2Api';

const MostrarJugadores = ({ navigation }) => {
  const [jugadores, setJugadores] = useState([]);
  const [token, setToken] = useState(null);
  const [equipo1, setEquipo1] = useState([]);
  const [equipo2, setEquipo2] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchJugadores = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('@AccessToken');
          const idEquipo1 = await AsyncStorage.getItem('@GrupoId1');
          const idEquipo2 = await AsyncStorage.getItem('@GrupoId2');
          console.log( "idEquipo ALMACENADO " + idEquipo1);
          console.log( "idEquipo2 ALMACENADO " + idEquipo2);
          if (storedToken) {
            setToken(storedToken);

  
            const storedIdGrupo = await AsyncStorage.getItem('@GrupoId');
            if (storedIdGrupo) {
              const equipo1Response = await Equipo1Api.ObtenerInfoGrupo(storedToken, storedIdGrupo);
              const equipo2Response = await Equipo2Api.ObtenerInfoGrupo(storedToken, storedIdGrupo);
              if (equipo1Response && equipo1Response.data) {
                const response = await userApi.ObtenerJugadores(storedToken);
                if (response && Array.isArray(response)) {
                  
                  const jugadoresEnEquipo1 = [
                    grupoResponse.data.grupo.id2,
                  ].filter(id => id !== 0);

                  const jugadoresEnEquipo2 = [
                    grupoResponse.data.grupo.id3,
                    grupoResponse.data.grupo.id4,
                  ].filter(id => id !== 0);
                  
                  const jugadoresFiltrados = response.filter(jugador => !jugadoresEnEquipo1.includes(jugador.id));
                  setJugadores(jugadoresFiltrados);
                } else {
                  console.error('Response structure is not as expected:', response);
                }
              }
            }
          }
        } catch (error) {
          console.error('Failed to fetch players or token:', error);
        }
      };

      fetchJugadores();
    }, []) 
  );

  const UpdateGrupo = async (selectedPlayerId) => {
    try {
      const storedToken = await AsyncStorage.getItem('@AccessToken');
      const storedIdGrupo = await AsyncStorage.getItem('@GrupoId');
      console.log("idDelGrupo" + storedIdGrupo);

      if (storedToken && storedIdGrupo) {
        // Obtener la información actual del grupo
        const grupoResponse = await GruposApi.ObtenerInfoGrupo(storedToken, storedIdGrupo);

        if (grupoResponse) {
          const grupo = grupoResponse.data.grupo;

          // Encuentra la posición disponible en el grupo y actualiza
          if (grupo.id2 === 0) {
            grupo.id2 = selectedPlayerId;
          } else if (grupo.id3 === 0) {
            grupo.id3 = selectedPlayerId;
          } else if (grupo.id4 === 0) {
            grupo.id4 = selectedPlayerId;
          } else {
            console.warn('No hay espacio en el grupo');
            return;
          }

          // Enviar la actualización del grupo
          const updateResponse = await GruposApi.UpdateGrupo(storedToken, storedIdGrupo, grupoResponse);

          if (updateResponse) {
            console.log('Grupo actualizado:', updateResponse);

            // Eliminar el jugador de la lista de jugadores
            setJugadores(prevJugadores => prevJugadores.filter(jugador => jugador.id !== selectedPlayerId));
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        
        <View style={styles.scrollContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {jugadores.map((jugador) => (
              <View key={jugador.id} style={styles.profileContainer}>
                <Text style={styles.userName}>{jugador.Nombre}</Text>
                <View style={styles.userInfo}>
                  <Text style={styles.userRank}>Rango: {jugador.Rango}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => UpdateGrupo(jugador.id)}
                  >
                    <AntDesign name="pluscircle" size={30} color="#6CA0D4" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
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
  },
  backButton: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 10,
    zIndex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginTop: "45%",
    overflow: 'hidden',
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '90%',
    marginLeft: '5%',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinea los elementos al inicio y al final
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.85,
    shadowRadius: 3.84,
    elevation: 10,
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    flex: 1, // Ocupa el espacio restante
  },
  userRank: {
    fontSize: 18,
    color: 'gray',
    marginRight: 10,
  },
  addButton: {
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MostrarJugadores;
