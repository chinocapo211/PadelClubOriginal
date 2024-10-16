import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
import userApi from '../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Ranking = ({ navigation }) => {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@AccessToken');
        if (storedToken) {
          const response = await userApi.ObtenerJugadores(storedToken);  // Suponiendo que la API devuelve el ranking
          setRankingData(response);
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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../../assets/images/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
      <NavbarHigh />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.top5Container}>
          <Text style={styles.sectionTitle}>Ranking</Text>
          {rankingData.map((player, index) => (
            <View key={player.id} style={styles.playerRow}>
              <Text style={styles.rankText}>#{index + 1}</Text>
              <Text style={styles.nameText}>{player.Nombre}</Text>
              <Text style={styles.pointsText}>{player.Puntos} pts</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EBEBEB',
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
  scrollContainer: {
    paddingVertical: screenHeight * 0.02,
  },
  top5Container: {
    marginTop:'30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width:"80%",
    alignContent:"center",
    alignSelf:"center",
    paddingVertical: screenHeight * 0.02,
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
