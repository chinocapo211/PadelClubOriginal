import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';

const Notificaciones = ({ navigation }) => {
  const [isNotificacion, setNotificacion] = useState('');
  const handleLogin = () =>
    {
      let data = {
        Gmail: gmail,
        Contraseña: contraseña
      }
      user_login(data).then((result) => {
          if(result.status == 200)
            {
              AsyncStorage.setItem("AccessToken", result.data);
              navigation.navigate("Home")
            }
        })
    };
  return (
    <View style={styles.container}>
      <NavbarHigh/>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MisClubes')}>
        <Text style={styles.buttonText}>Sancion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PreguntasFrecuentes')}>
        <Text style={styles.buttonText}>Global</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TerminosCondiciones')}>
        <Text style={styles.buttonText}>Aviso</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CerrarSesion')}>
        <Text style={styles.buttonText}>Invitacion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CerrarSesion')}>
        <Text style={styles.buttonText}>Se confirmo el partido</Text>
      </TouchableOpacity>
      <NavbarLow/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
  },
  button: {
    backgroundColor: '#d3d3d3',
    width: '75%',
    height: 50, // Define a fixed height for better centering
    padding: 10, // Adjust padding as needed
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically
    borderRadius: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Notificaciones;
