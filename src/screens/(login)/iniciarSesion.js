import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import user_login from '../../userApi';
import { AsyncStorage } from 'react-native';

const IniciarSesion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    user_login({ email, password }).then((result) => {
      if (result === "Inicio de sesión exitoso") {
        AsyncStorage.setItem("AccessToken", result.data);
        navigation.replace("Home");
      } else {
        setErrorMessage("Error en inicio de sesión");
        // Aquí puedes mostrar un mensaje de error al usuario si el inicio de sesión falla
        Alert.alert("Error", "Inicio de sesión fallido. Verifica tus credenciales.");
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBackground}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/logo.jpg')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresá tu email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresá tu contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => navigation.navigate('OlvidasteContraseña')}>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.register}>¿No tenés una cuenta? <Text style={styles.registerLink}>Regístrate</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        {/* onPress={handleLogin} */}
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
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
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
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
    marginVertical: 50,
  },
  logo: {
    marginTop: -50,
    width: 130,
    height: 160,
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
    textAlign: 'center',
  },
  registerLink: {
    color: '#00AEEF',
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default IniciarSesion;