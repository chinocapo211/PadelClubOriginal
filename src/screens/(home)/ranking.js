import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
import userApi from '../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Ranking = ({ navigation }) => {
  const [rankingData, setRankingData] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [top5, setTop5] = useState([]);
  const [userSection, setUserSection] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        // Simulación de obtener datos de ranking desde la API
        const storedToken = await AsyncStorage.getItem('@AccessToken');
        if (storedToken) {
          const response = await userApi.ObtenerRanking(storedToken);  // Suponiendo que la API devuelve el ranking
          setRankingData(response.ranking);
          setUserRank(response.userRank); // Suponiendo que devuelve la posición del usuario

          // Dividimos el Top 5 y la sección del usuario
          const top5Players = response.ranking.slice(0, 5);  // Los primeros 5 jugadores
          setTop5(top5Players);

          if (response.userRank > 5) {
            // Muestra el usuario y 2 jugadores arriba y abajo de su posición
            const userRankSection = response.ranking.slice(response.userRank - 3, response.userRank + 2);
            setUserSection(userRankSection);
          }
        } else {
          console.log('Token no encontrado');
        }
      } catch (error) {
        console.error('Error fetching ranking:', error);
      }
    };
    fetchRanking();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavbarHigh />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Sección de Top 5 */}
        <View style={styles.top5Container}>
          <Text style={styles.sectionTitle}>Top 5 Jugadores</Text>
          {top5.map((player, index) => (
            <View key={player.id} style={styles.playerRow}>
              <Text style={styles.rankText}>#{index + 1}</Text>
              <Text style={styles.nameText}>{player.name}</Text>
              <Text style={styles.pointsText}>{player.points} pts</Text>
            </View>
          ))}
        </View>

        {/* Sección de Usuario (si no está en el Top 5) */}
        {userRank > 5 && (
          <View style={styles.userSection}>
            <Text style={styles.sectionTitle}>Tu Posición</Text>
            {userSection.map((player, index) => (
              <View key={player.id} style={styles.playerRow}>
                <Text style={styles.rankText}>#{player.rank}</Text>
                <Text style={styles.nameText}>{player.name}</Text>
                <Text style={styles.pointsText}>{player.points} pts</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <NavbarLow />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  scrollContainer: {
    paddingVertical: screenHeight * 0.02,
  },
  top5Container: {
    marginTop:'30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: screenHeight * 0.02,
    marginHorizontal: screenWidth * 0.05,
    marginBottom: screenHeight * 0.02,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userSection: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: screenHeight * 0.02,
    marginHorizontal: screenWidth * 0.05,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sectionTitle: {
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: screenHeight * 0.02,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  rankText: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    color: '#333',
  },
  nameText: {
    fontSize: screenWidth * 0.05,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  pointsText: {
    fontSize: screenWidth * 0.05,
    color: '#333',
  },
});

export default Ranking;
