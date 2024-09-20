import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userApi from '../../api/userApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import fotoPerfil from "../../../assets/images/nonoPerf.jpg";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
      <View style={styles.container}>
        <NavbarHigh />
        <Image source={fotoPerfil} style={styles.imagenContainer} />
        <Text style={styles.userName}>{userData.Usuario.Nombre}</Text>
        <View style={styles.progressBarContainer}>
          <Text style={styles.progressText}>0</Text>
          <ProgressBar 
            progress={userData.Usuario.Puntos / 100} 
            color="#FFD700" 
            style={styles.progressBar} 
          />
          <Text style={styles.progressText2}>100</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={[styles.button, styles.pointsBox]}>
            <Text style={styles.statNumber}>{userData.Usuario.Puntos}</Text>
            <Text style={styles.statText}>Puntos</Text>
          </View>
          <View style={[styles.button, styles.matchesBox]}>
            <Text style={styles.statNumber}>{/* Victorias */}</Text>
            <Text style={styles.statText}>Partidos{"\n"}Victorias - Derrotas</Text>
          </View>
          <View style={[styles.button, styles.rankingBox]}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: screenHeight * 0.05, // Ajuste responsivo
  },
  imagenContainer: {
    width: screenWidth * 0.4,  // Ajuste dinámico basado en el ancho de la pantalla
    height: screenWidth * 0.4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '40%',
    maxWidth: screenWidth * 0.8,
    paddingHorizontal: screenWidth * 0.05,
    borderRadius: (screenWidth * 0.4) / 2, // Mantener circular
    borderColor: '#FFFFFF',
    borderWidth: 2,
    marginTop: screenHeight * 0.15,// Márgen superior dinámico
  },
  
  profileImage: {
    width: screenWidth * 0.4,  // Ajuste dinámico basado en el ancho de la pantalla
    height: screenWidth * 0.4,
    borderRadius: (screenWidth * 0.4) / 2, // Mantener circular
    borderColor: '#FFFFFF',
    borderWidth: 2,
    marginTop: screenHeight * 0.05, // Márgen superior dinámico
  },
  userName: {
    fontSize: screenWidth * 0.07, // Texto adaptable
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: screenHeight * 0.02, // Márgen dinámico
    marginTop: screenHeight * 0.01, // Márgen dinámico
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth * 0.8, // Ancho responsivo
    marginRight: screenHeight * 0.05,
  },
  progressText: {
    fontSize: screenWidth * 0.04, // Tamaño del texto adaptable
    color: '#888888',
  },
  progressText2: {
    fontSize: screenWidth * 0.04,
    color: '#888888',
    marginLeft: screenWidth * 0.04, // Espaciado dinámico
  },
  progressBar: {
    flex: 1,
    height: screenHeight * 0.015,  // Altura adaptable de la barra de progreso
    borderRadius: 10,
    marginLeft: screenWidth * 0.015,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    maxWidth: screenWidth * 0.8,
    paddingHorizontal: screenWidth * 0.05,
    marginTop: screenHeight * 0.03,
    marginBottom: screenHeight * 0.03,
    
  },
  button: {
    height: screenHeight * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  pointsBox: {
    backgroundColor: '#4169E1',
    width: '100%',
  },
  matchesBox: {
    backgroundColor: '#1E90FF',
    width: '100%',
  },
  rankingBox: {
    backgroundColor: '#00BFFF',
    width: '100%',
  },
  statNumber: {
    fontSize: screenWidth * 0.07,  // Texto adaptable
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statText: {
    fontSize: screenWidth * 0.05,  // Texto adaptable
    color: '#FFFFFF',
    textAlign: 'left',
  },
});

export default Perfil;
