import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Logo from '../../../assets/images/logo.jpg';

const IniciarSesion = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/logo.jpg')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Iniciá Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresá tu email"
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresá tu contraseña"
        secureTextEntry
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.register}>¿No tenés una cuenta? <Text style={styles.registerLink}>Regístrate</Text></Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 40,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000000',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  forgotPassword: {
    fontSize: 14,
    color: '#888888',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  register: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 20,
  },
  registerLink: {
    color: '#00AEEF',
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

export default IniciarSesion;