
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import user_login from '../../userApi';
import { AsyncStorage } from 'react-native';



const IniciarSesion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [Contraseña, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 
  const handleLogin = () =>
    {
      user_login(
        {
          email: email,
          password: Contraseña
        }).then((result) => {
          if(result == "Inicio de sesión exitoso")
            {
              AsyncStorage.setItem("AccessToken", result.data);
              navigation.replace("Home")
            }
        })

    };
  

    
  
  





  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/logo.jpg')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Iniciá Sesión</Text>

   
    <View><TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={(text) =>setEmail(text)}
      /></View>
      <View><TextInput
        style={styles.input}
        placeholder="contraseña"
        secureTextEntry
        value={Contraseña}
        onChangeText={(text) =>setPassword(text)}

      /></View>
      
      <View>
        <TouchableOpacity>
        < Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.register}>¿No tenés una cuenta? <Text style={styles.registerLink} >Regístrate</Text></Text>
        </TouchableOpacity>
      </View>
      
      
      <View>
      <TouchableOpacity style={styles.button}onPress={handleLogin}>
        <Text style={styles.buttonText} >Iniciar Sesión</Text>
      </TouchableOpacity>
      </View>
      
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