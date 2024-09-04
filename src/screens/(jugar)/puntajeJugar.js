import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import CargarPuntos from './cargarPuntos';

const PuntajeJugar = () => {
  const [sets, setSets] = useState(['Set 1']);
  const navigation = useNavigation();

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

  const handleCargarPuntos = (setNumber) => {
    navigation.navigate('CargarPuntos', { setNumber });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <NavbarHigh />
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
        source={require('../../../assets/images/back.png')}
        style={styles.backButton}
        />
        </TouchableOpacity>
        <View style={styles.scoreWrapper}>
          {sets.map((set, index) => (
            <View key={index} style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{set}</Text>
              <Text style={styles.scoreText}>0 - 0</Text>
              <TouchableOpacity style={styles.button} onPress={() => CargarPuntos(set)}>
                <Text style={styles.buttonText}>Cargar puntos</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    width: '80%',
  },
  scoreContainer: {
    backgroundColor: '#ffffff',
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
    backgroundColor: '#00bfff',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
});

export default PuntajeJugar;
