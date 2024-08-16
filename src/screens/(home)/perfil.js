  import React, {useState, useEffect} from 'react';
  import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
  import { ProgressBar } from 'react-native-paper';
  import NavbarHigh from '../../components/navbarHigh';
  import NavbarLow from '../../components/navbarLow';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import userApi from '../../api/userApi';
import { SafeAreaView } from 'react-native-safe-area-context';


  const { width, height } = Dimensions.get('window'); // Obtén las dimensiones de la pantalla

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
        <View style={styles.innerContainer}>
          <Image source={{ uri: userData.Usuario.Foto }} style={styles.profileImage} />
          <Text style={styles.userName}>{userData.Usuario.Nombre}</Text>
          <View style={styles.progressBarContainer}>
            <Text style={styles.progressText}>0</Text>
            <ProgressBar progress={userData.Usuario.Puntos} color="#FFD700" style={styles.progressBar} />
            <Text style={styles.progressText}>100</Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={[styles.statBox, styles.pointsBox]}>
              <Text style={styles.statNumber}>{userData.Usuario.Puntos}</Text>
              <Text style={styles.statText}>Puntos  </Text>
              <Image source={('../../assets/trophy.png')} style={styles.icon} />
            </View>
            <View style={[styles.statBox, styles.matchesBox]}>
              <Text style={styles.statNumber}>{}</Text>
              <Text style={styles.statText}>
                Partidos{"\n"}
                {} Victorias - {} Derrotas
              </Text>
              <Image source={('../../assets/racket.png')} style={styles.icon} />
            </View>
            <View style={[styles.statBox, styles.rankingBox]}>
              <Text style={styles.statNumber}>#{}</Text>
              <Text style={styles.statText}>Ranking general</Text>
              <Image source={('../../assets/ranking.png')} style={styles.icon} />
            </View>
          </View>
        </View>
        <NavbarLow />
      </View>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: '26%',
  },
  innerContainer: {
    backgroundColor: 'white', // Color de fondo para el contenedor interno
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    height: height * 0.7, // 70% de la altura de la pantalla
    width: width * 0.9, // 90% del ancho de la pantalla
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Hace la imagen circular
    borderColor: '#FFFFFF', // Color del borde de la imagen
    borderWidth: 2,
    marginBottom: '10%',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: '10%',
    textAlign: 'center',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.7, // 80% del ancho de la pantalla
    marginVertical: 10,
    marginRight: 50,
  },
  progressText: {
    fontSize: 14,
    color: '#888888',
    marginHorizontal: 5,
  },
  progressBar: {
    flex: 1,
    height: 10,
    borderRadius: 10,
  },
  statsContainer: {
    width: width * 0.8, // 80% del ancho de la pantalla
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
  },
  matchesBox: {
    backgroundColor: '#1E90FF',
  },
  rankingBox: {
    backgroundColor: '#00BFFF',
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
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Perfil;
