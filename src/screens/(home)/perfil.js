import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userApi from '../../api/userApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import fotoPerfil from "../../../assets/images/nonoPerf.jpg";

const { width } = Dimensions.get('window');

const Perfil = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@AccessToken');
        if (storedToken) {
          const response = await userApi.ObtenerInfoJugador(storedToken);
          if (!response.error) {
            setUserData(response);
          } else {
            console.error('Error en la solicitud:', response.error);
          }
        } else {
          console.log('Token no encontrado');
        }
      } catch (error) {
        console.error('Failed to fetch user data or token:', error);
      }
    };
    fetchTokenAndData();
  }, []);

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.innerContainer}>
        <NavbarHigh />
        <Image source={fotoPerfil} style={styles.profileImage} />
        <Text style={styles.userName}>{userData.Usuario.Nombre}</Text>
        <View style={styles.progressBarContainer}>
          <Text style={styles.progressText}>0</Text>
          <ProgressBar progress={userData.Usuario.Puntos / 100} color="#FFD700" style={styles.progressBar} />
          <Text style={styles.progressText2}>100</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={[styles.statBox, styles.pointsBox]}>
            <Text style={styles.statNumber}>{userData.Usuario.Puntos}</Text>
            <Text style={styles.statText}>Puntos</Text>
          </View>
          <View style={[styles.statBox, styles.matchesBox]}>
            <Text style={styles.statNumber}>{/* Victorias */}</Text>
            <Text style={styles.statText}>Partidos{"\n"}Victorias - Derrotas</Text>
          </View>
          <View style={[styles.statBox, styles.rankingBox]}>
            <Text style={styles.statNumber}>#{/* Ranking */}</Text>
            <Text style={styles.statText}>Ranking general</Text>
          </View>
        </View>
        <NavbarLow />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:"#EBEBEB",
  },
  innerContainer: {
    borderRadius: 10,
    backgroundColor:"#EBEBEB",
    padding: 20,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: "50%",
    height: "50%",
    borderRadius: 100,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    display:"flex",
    alignSelf:"center",
    marginRight:"2%"
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    
    textAlign: 'center',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "80%",
    marginVertical: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#888888',
  },
  progressText2: {
    fontSize: 14,
    color: '#888888',
    marginLeft: "2%",
  },
  progressBar: {
    flex: 1,
    height: 10,
    borderRadius: 10,
    marginLeft: "2%",
  },
  statsContainer: {
    width: width * 0.8,
    marginTop: 20,
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointsBox: {
    backgroundColor: '#4169E1',
    width: "90%",
  },
  matchesBox: {
    backgroundColor: '#1E90FF',
    width: "90%",
  },
  rankingBox: {
    backgroundColor: '#00BFFF',
    width: "90%",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'left',
  },
});

export default Perfil;
