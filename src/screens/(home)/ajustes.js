import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
import { SafeAreaView } from 'react-native-safe-area-context';
const Ajustes = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <NavbarHigh/>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MisClubes')}>
        <Text style={styles.buttonText}>Mis Clubes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PreguntasFrecuentes')}>
        <Text style={styles.buttonText}>Preguntas Frecuentes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TerminosCondiciones')}>
        <Text style={styles.buttonText}>Términos y Condiciones</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CerrarSesion')}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <NavbarLow/>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#d3d3d3',
    width: '75%',
    height:'10%',
    padding: '6%',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Ajustes;
