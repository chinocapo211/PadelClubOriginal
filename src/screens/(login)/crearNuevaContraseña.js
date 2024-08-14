

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CrearNuevaContraseña = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
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
        <Text style={styles.title}>Crear nueva contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Repetir nueva contraseña"
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ContraseñaExitosa')}>
          <Text style={styles.buttonText}>Confirmar contraseña</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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

export default CrearNuevaContraseña;

