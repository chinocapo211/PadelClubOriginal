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
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={addSet}>
            <AntDesign name="pluscircleo" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={removeSet}>
            <AntDesign name="minuscircleo" size={24} color="red" />
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
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: '80%', // 80% del ancho de la pantalla
  },
  scoreContainer: {
    backgroundColor: '#ffffff', // Fondo gris claro para cada set
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
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
    justifyContent: 'space-between',
    width: '40%', // Ajusta el ancho según sea necesario
  },
  additionalSets: {
    marginTop: 20, // Espacio entre el primer set y los adicionales
  },
});

export default PuntajeJugar;
