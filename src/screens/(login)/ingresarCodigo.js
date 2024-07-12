import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const IngresarCodigo = ({ navigation }) => {
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
        <Text style={styles.title}>Ingresar código</Text>
        <Text style={styles.subtitle}>Ingrese aquí el código que recibió por correo</Text>
        <View style={styles.codeContainer}>
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="numeric" />
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="numeric" />
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="numeric" />
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="numeric" />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CrearNuevaContraseña')}>
          <Text style={styles.buttonText}>Verificar Código</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.resend}>¿No recibiste el código? <Text style={styles.resendLink}>Reenviar</Text></Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  resend: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
  resendLink: {
    color: '#00AEEF',
    textDecorationLine: 'underline',
  },
});

export default IngresarCodigo;
