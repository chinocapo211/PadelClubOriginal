import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';

const PuntajeJugar = ({ navigation }) => {
  const [sets, setSets] = useState(['Set 1']);

  const addSet = () => {
    if (sets.length < 3) {
      setSets([...sets, `Set ${sets.length + 1}`]);
    }
  };

  const removeSet = () => {
    if (sets.length > 1) {
      setSets(sets.slice(0, -1));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <NavbarHigh />
        <View style={styles.scoreWrapper}>
          {/* Primer set fijo */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Set 1</Text>
            <Text style={styles.scoreText}>0 - 0</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Cargar puntos</Text>
            </TouchableOpacity>
          </View>
          {/* Sets adicionales */}
          <View style={styles.additionalSets}>
            {sets.slice(1).map((set, index) => (
              <View key={index + 1} style={styles.scoreContainer}>
                <Text style={styles.scoreText}>{set}</Text>
                <Text style={styles.scoreText}>0 - 0</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Cargar puntos</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.iconContainer, sets.length === 1 && styles.centerIconContainer]}>
          {sets.length < 3 && (
            <TouchableOpacity onPress={addSet} style={styles.botonMas}>
              <AntDesign name="pluscircleo" size={24} color="green" />
            </TouchableOpacity>
          )}
          {sets.length > 1 && (
            <TouchableOpacity onPress={removeSet} style={styles.botonMenos}>
              <AntDesign name="minuscircleo" size={24} color="red" />
            </TouchableOpacity>
          )}
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
    alignItems: 'center',
  },
  scoreWrapper: {
    borderRadius: 15,
    width: '80%', // 80% del ancho de la pantalla
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginTop: '40%',
  },
  scoreContainer: {
    backgroundColor: '#ffffff', // Fondo gris claro para cada set
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: '8%',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00bfff', // Color celeste
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row', // Alineación horizontal
    justifyContent: 'space-between', // Distribuir el espacio entre los botones
    width: '40%', // Ajusta el ancho según sea necesario
    marginTop: 20, // Espacio entre los sets y los íconos
  },
  centerIconContainer: {
    justifyContent: 'center', // Centra los íconos
  },
  additionalSets: {
    // Aquí puedes agregar estilos adicionales si es necesario
  },
  botonMas:{
    display:'flex',
    alignContent:'flex-start'
  },
  botonMenos:{
    marginLeft:'42%'
  },
});

export default PuntajeJugar;
