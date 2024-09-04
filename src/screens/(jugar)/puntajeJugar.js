import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-safe-area-context';

const PuntajeJugar = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <NavbarHigh />
        <View style={styles.scoreWrapper}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Primer set</Text>
            <Text style={styles.scoreText}>0 - 0</Text>
          </View>
          <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cargar set</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreWrapper: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: '80%', // 80% del ancho de la pantalla
  },
  scoreContainer: {
    flexDirection: 'column', // Cambiado a columna
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00bfff', // Color celeste
    width: '100%',
    height: '20%', // Más pequeño verticalmente
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign:"center",
  },
});

export default PuntajeJugar;
