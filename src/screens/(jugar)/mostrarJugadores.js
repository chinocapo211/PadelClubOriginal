import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userApi from '../../api/userApi';
import GruposApi from '../../api/GruposApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const MostrarJugadores = ({ navigation }) => {
  const [jugadores, setJugadores] = useState([]);
  const [token, setToken] = useState(null);
  const [grupoData, setGrupoData] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchJugadores = async () => {
        try {
          const storedToken = await AsyncStorage.getItem('@AccessToken');
          if (storedToken) {
            setToken(storedToken);

            // Obtener la información del grupo para filtrar jugadores
            const storedIdGrupo = await AsyncStorage.getItem('@GrupoId');
            if (storedIdGrupo) {
              const grupoResponse = await GruposApi.ObtenerInfoGrupo(storedToken, storedIdGrupo);
              if (grupoResponse && grupoResponse.data) {
                setGrupoData(grupoResponse.data.grupo);

                // Obtener todos los jugadores
                const response = await userApi.ObtenerJugadores(storedToken);
                if (response && Array.isArray(response)) {
                  // Filtrar jugadores que ya están en el grupo
                  const jugadoresEnGrupo = [
                    grupoResponse.data.grupo.id2,
                    grupoResponse.data.grupo.id3,
                    grupoResponse.data.grupo.id4,
                  ].filter(id => id !== 0);
                  
                  const jugadoresFiltrados = response.filter(jugador => !jugadoresEnGrupo.includes(jugador.id));
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
    }, []) // El efecto se ejecutará cada vez que la pantalla se enfoque
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
        <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
        {jugadores.map((item) => (
              <View key={item.id} style={styles.profileContainer}>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.Nombre}</Text>
                  <Text style={styles.userRank}>{item.Rango}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => UpdateGrupo(item.id)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
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
    display: 'flex',
    marginTop: "45%",
    overflow: 'hidden',
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  profileContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10
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