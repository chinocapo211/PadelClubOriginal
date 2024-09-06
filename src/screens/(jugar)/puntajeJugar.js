import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import CargarPuntos from './cargarPuntos';

const PuntajeJugar = () => {
  const [sets, setSets] = useState(['Set 1']);
  const [numbers, setNumbers] = useState([]);
  const navigation = useNavigation();

  const addNumber = (newNumber) => {
    setNumbers([...numbers, newNumber]);
  };
  const editNumber = (index, newValue) => {
    const updatedNumbers = [...numbers];
    updatedNumbers[index] = parseInt(newValue);
    setNumbers(updatedNumbers);
  };
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
              <TouchableOpacity style={styles.button} onPress={() => handleCargarPuntos(index)}> 
                <Text style={styles.buttonText} >Cargar puntos</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    backgroundColor: '#ffffff',
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
  backButton: {
    width: 30,
    height: 30,
    marginRight: '80%',
    marginTop: 10,
    zIndex: 1,
  },
});

export default PuntajeJugar;
