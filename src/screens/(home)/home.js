import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
import { useAuth } from '../../components/AuthProvider';
import userApi from '../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

 const Home = ({ navigation }) => {
//   const { token, logout } = useAuth();
//   const [userData, setUserData] = useState(null);
  
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (token) {
//         try {
          
//           const response = await userApi.ObtenerInfoJugador( await AsyncStorage.setItem('@AccessToken'));

//           if (response.error) {
//             console.error('Error en la solicitud:', response.error);
//             return;
//           }

//           // Asume que `response` ya contiene los datos del usuario
//           setUserData(response);
//           console.log('User data:', response);
//         } catch (error) {
//           console.error('Failed to fetch user data:', error);
//         }
//       }
//     };

//     fetchUserData(); // Llama a la función para realizar la solicitud

//   }, [token]);

  
  return (
    <View style={styles.container}>
      <NavbarHigh />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonFriends]}
          onPress={() => navigation.navigate('InicioJugar')}
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
          onPress={() => navigation.navigate('Amigos')}
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
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    maxWidth: 400,
  },
  button: {
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonPlay: {
    backgroundColor: '#00BFFF',
    height: 150,
  },
  buttonTournaments: {
    backgroundColor: '#FF69B4',
    height: 150,
  },
  buttonFriends: {
    backgroundColor: '#32CD32',
    height: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
  },
});

export default Home;
