import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userApi from '../../api/userApi';
import GruposApi from '../../api/GruposApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Equipo1Api from '../../api/Equipo1Api';
import Equipo2Api from '../../api/Equipo2Api';

const MostrarJugadoresEquipo1 = ({ navigation }) => {
  const [jugadores, setJugadores] = useState([]);
  const [token, setToken] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchJugadores = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('@AccessToken');
          const storedIdEquipo1 = await AsyncStorage.getItem('@GrupoId1');
          const storedIdEquipo2 = await AsyncStorage.getItem('@GrupoId2');
          console.log("Token almacenado:", storedToken);
          console.log("ID del grupo almacenado:", storedIdEquipo1);

          if (storedToken && storedIdEquipo2) {
            setToken(storedToken);

            const equipo1Response = await Equipo1Api.ObtenerInfoGrupo(storedToken, storedIdEquipo1);
            const equipo2Response = await Equipo2Api.ObtenerInfoGrupo(storedToken, storedIdEquipo2);
            console.log("Equipo1 mostrarJugadores:", JSON.stringify(equipo1Response, null, 2));
            if (equipo1Response && equipo2Response) {
              const jugadoresEnEquipo1 = [equipo1Response.data.id2].filter(id => id !== 0);
              const jugadoresEnEquipo2 = [equipo2Response.data.id3, equipo2Response.data.id4].filter(id => id !== 0);
              
              const response = await userApi.ObtenerJugadores(storedToken);
              console.log("Jugadores obtenidos:", response);

              if (response && Array.isArray(response)) {
                const jugadoresFiltrados = response.filter(jugador => 
                  !jugadoresEnEquipo1.includes(jugador.id) && 
                  !jugadoresEnEquipo2.includes(jugador.id)
                );
                setJugadores(jugadoresFiltrados);
                console.log("Jugadores filtrados:", jugadoresFiltrados);
              } else {
                console.error('La estructura de respuesta no es la esperada:', response);
              }
            }
          }
        } catch (error) {
          console.error('Error al obtener jugadores o token:', error);
        }
      };

      fetchJugadores();
    }, [])
  );

  const UpdateGrupo = async (selectedPlayerId) => {
    try {
      const storedToken = await AsyncStorage.getItem('@AccessToken');
      const storedIdEquipo1 = await AsyncStorage.getItem('@GrupoId1');
      console.log("ID del grupo:", storedIdEquipo1);

      if (storedToken && storedIdEquipo1) {
        const grupoResponse = await Equipo1Api.ObtenerInfoGrupo(storedToken, storedIdEquipo1);
        console.log(grupoResponse);

        if (grupoResponse) {
       

          if (grupoResponse.data.grupo.id2 === 0) {
            grupoResponse.data.grupo.id2 = selectedPlayerId;
          } else {
            console.warn('No hay espacio en el grupo');
            return;
          }


          const updateResponse = await Equipo1Api.UpdateGrupo(storedToken, storedIdEquipo1, grupoResponse);
          if (updateResponse) {
            console.log('Grupo actualizado:', updateResponse);
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
  const renderItem = ({ item }) => (
    <View style={styles.profileContainer}>
      <Text style={styles.userName}>{item.Nombre}</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userRank}>Rango: {item.Rango}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => UpdateGrupo(item.id)}
        >
          <AntDesign name="pluscircle" size={30} color="#6CA0D4" />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View>
        <View style={{height: "15vh"}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../../assets/images/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
          <NavbarHigh />
        </View>
        <View style={{height: "85vh"}}>
                <FlatList
                  data={jugadores}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={styles.scrollContent}
                  ListEmptyComponent={<Text>No hay jugadores disponibles.</Text>}
                />

        </View>
      </View>
)};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  backButton: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 10,
    zIndex: 1,
  },
  backImage: {
    width: '100%',
    height: '100%',
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
    justifyContent: 'space-between',
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
    flex: 1,
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

export default MostrarJugadoresEquipo1;
