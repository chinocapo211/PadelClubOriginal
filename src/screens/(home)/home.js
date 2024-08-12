import React, { useState, useEffect ,} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
import userApi from '../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../components/AuthProvider';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const { isAuthenticated, logout } = useAuth();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        if(isAuthenticated)
        {
          const storedToken = await AsyncStorage.getItem('@AccessToken');
          if (storedToken) {
            setToken(storedToken);
  
            const response = await userApi.ObtenerInfoJugador(storedToken);
            
            if (response.error) {
              console.error('Error en la solicitud:', response.error);
              navigation.navigate('Login', { screen: "Home" })
            }
            setUserData(response);
          } else {
            console.log('Token no encontrado');
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data or token:', error);
        logout();
      }
    };
    fetchTokenAndData();
  }, [isAuthenticated, navigation, logout]);


  

  return (
    <View style={styles.container}>
      <NavbarHigh />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonFriends]}
          onPress={() => navigation.navigate('JugarStack', {screen: "InicioJugar"})}
        >
          <Text style={styles.buttonText}>Jugar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonTournaments]}
          onPress={() => navigation.navigate('Torneos')}
        >
          <Text style={styles.buttonText}>Torneos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonPlay]}
          onPress={() => navigation.navigate('AmigosStack')}
        >
          <Text style={styles.buttonText}>Amigos</Text>
        </TouchableOpacity>
      </View>
      <NavbarLow />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: screenHeight * 0.05,
    paddingBottom: screenHeight * 0.05,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    maxWidth: screenWidth * 0.8,
    paddingHorizontal: screenWidth * 0.05,
    marginTop:50,
  },
  button: {
    height: screenHeight * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonPlay: {
    backgroundColor: '#00BFFF',
  },
  buttonTournaments: {
    backgroundColor: '#FF69B4',
  },
  buttonFriends: {
    backgroundColor: '#32CD32',
  },
  buttonText: {
    color: 'white',
    fontSize: screenWidth * 0.08,
  },
});

export default Home;
