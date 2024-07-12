import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Logo from '../../../assets/images/verif.jpg';

const ContraseñaExitosa = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBackground}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
            source={require('../../../assets/images/back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/logo.jpg')}
            style={styles.logo}
          />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/verif.jpg')}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>Contraseña actualizada con éxito!!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IniciarSesion')}>
          <Text style={styles.buttonText}>Regresar a Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBackground: {
    backgroundColor: '#00AEEF',
    height: '40%',
    width: '100%',
  
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingLeft: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    width: 30,
    height: 30,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -200,
    borderTopLeftRadius: 205,
    borderTopRightRadius: 205,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    marginTop: -50,
    width: 130,
    height: 160,
  },
  image: {
    marginTop:90,
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default ContraseñaExitosa;