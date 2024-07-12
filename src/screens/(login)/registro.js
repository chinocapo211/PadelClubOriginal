import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Logo from '../../../assets/images/logo.jpg';

const Registro = ({navigation}) => {
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
        <Text style={styles.title}>Registrarse</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Club"
        />
        <Text style={styles.note}>Se podrán agregar más clubes en configuración</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IniciarSesion')}>
          <Text style={styles.buttonText}>Continuar</Text>
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
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  note: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 20,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Registro;