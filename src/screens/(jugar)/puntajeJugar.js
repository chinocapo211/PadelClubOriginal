import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const PuntajeJugar = () => {
  const [sets, setSets] = useState(['Set 1']);
  const [numbers, setNumbers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [modalParam, setModalParam] = useState(null);
  const [setId, setSetId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const storeScores = async () => {
      try {
        await AsyncStorage.setItem('scores', JSON.stringify(numbers));
      } catch (error) {
        console.error('Error saving scores to AsyncStorage', error);
      }
    };

    storeScores();
  }, [numbers]); // Se ejecuta cada vez que 'numbers' cambia

  const openModal = (param, id) => {
    setModalParam(param);
    setSetId(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setInputValue1('');
    setInputValue2('');
  };

  const handleConfirm = () => {
    const num1 = parseInt(inputValue1);
    const num2 = parseInt(inputValue2);

    if ((((num1 === 6 && num2 < 6) || (num1 < 6 && num2 === 6)) || (num1 === 7 && (num2 === 5 || num2 === 6)) || (num2 === 7 && (num1 === 5 || num1 === 6))) && !isNaN(num1) && !isNaN(num2)) {
      editNumber(setId, [inputValue1, inputValue2]);
      closeModal();
    } else {
      alert("Se tiene que cargar el puntaje correctamente. No ingresar letras y en caso de tie break poner 7-6 o 6-7.");
    }
  };

  const addNumber = (newNumber) => {
    setNumbers([...numbers, newNumber]);
  };

  const editNumber = (index, newValues) => {
    const updatedNumbers = [...numbers];
    updatedNumbers[index] = newValues.map(value => parseInt(value));
    setNumbers(updatedNumbers);
  };

  const addSet = () => {
    if (sets.length < 3) {
      setSets([...sets, `Set ${sets.length + 1}`]);
      addNumber([0, 0]);
    }
  };

  const removeLastValue = () => {
    const updatedNumbers = [...numbers];
    if (updatedNumbers.length > 0) {
      updatedNumbers.pop();
    }
    setNumbers(updatedNumbers);
  };

  const removeSet = () => {
    if (sets.length > 1) {
      setSets(sets.slice(0, -1));
      removeLastValue();
    }
  };

  const handleCargarPuntos = (index) => {
    openModal(`Set ${index + 1}`, index);
  };

  const handleSubirPartido = () => {
    const validSets = sets.reduce((acc, _, index) => {
      const setScore = numbers[index] || [0, 0];
      return acc && (index % 2 === 0 || numbers[index - 1]);
    }, true);

    const hasValidScores = numbers.some(score => score[0] !== 0 || score[1] !== 0);

    if (validSets && hasValidScores) {
      alert("El partido ha sido enviado correctamente.");
      navigation.navigate('FinalJugar', { puntaje: numbers });
    } else {
      alert("No se puede subir el partido. Asegúrate de ingresar puntajes válidos y que los sets estén completos.");
    }
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
              <Text style={styles.scoreText}>
                {numbers[index] ? `${numbers[index][0]} - ${numbers[index][1]}` : '0 - 0'}
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => handleCargarPuntos(index)}>
                <Text style={styles.buttonText}>Cargar puntos</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            closeModal();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalText}>{modalParam}</Text>
              <Text style={styles.modalText}>Cargar puntaje:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={inputValue1}
                  onChangeText={setInputValue1}
                  keyboardType='numeric'
                  placeholder="Puntaje 1"
                />
                <TextInput
                  style={styles.input}
                  value={inputValue2}
                  onChangeText={setInputValue2}
                  keyboardType='numeric'
                  placeholder="Puntaje 2"
                />
              </View>
              <Pressable
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
        <TouchableOpacity style={styles.subirPartidoButton} onPress={handleSubirPartido}>
          <Text style={styles.subirPartidoText}>Subir partido</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  subirPartidoButton: {
    backgroundColor: '#3AD4E3', // Color de fondo distintivo (Tomate)
    borderRadius: 20, // Bordes redondeados
    paddingVertical: "4%",
    paddingHorizontal: "5%",
    marginTop: "5%",
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scoreWrapper: {
    borderRadius: 15,
    width: '80%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginTop: '25%',
  },
  scoreContainer: {
    backgroundColor: '#ffffff',
    padding: "5%",
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop:"5%",
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
    marginTop: 20,
  },
  centerIconContainer: {
    justifyContent: 'center', // Centra los íconos
  },
  botonMas: {
    display: 'flex',
    alignContent: 'flex-start',
  },
  botonMenos: {
    marginLeft: '42%',
  },
  backButton: {
    width: 30,
    height: 30,
    marginRight: '80%',
    marginTop: "20%",
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: "80%",
    padding: "5%",
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative', // Para que la X esté en la esquina superior derecha
  },
  closeButton: {
    position: 'absolute',
    top: "10%",
    right: "10%",
    zIndex: 1,
  },
  modalText: {
    fontSize: 18,
    marginBottom: "4%",
  },
  inputContainer: {
    flexDirection: 'row', // Alineación horizontal de los campos
    justifyContent: 'space-between', // Espacio entre los campos
    width: '100%', // Ancho del contenedor de los campos
    marginBottom: "4%",
  },
  input: {
    width: '30%', // Ajusta el ancho a 30% del contenedor
    height: "180%",
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: "3%",
    marginHorizontal: "1%", // Espacio entre los campos
  },
  confirmButton: {
    backgroundColor: '#00bfff',
    width: '100%',
    paddingVertical: "3%",
    marginTop:"8%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default PuntajeJugar;
