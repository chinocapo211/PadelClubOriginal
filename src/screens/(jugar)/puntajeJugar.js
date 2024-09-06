import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Pressable } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const PuntajeJugar = () => {
  const [sets, setSets] = useState(['Set 1']);
  const [numbers, setNumbers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue1, setInputValue1] = useState(''); // Primer campo de entrada
  const [inputValue2, setInputValue2] = useState(''); // Segundo campo de entrada
  const [modalParam, setModalParam] = useState(null); // Estado para el valor recibido en el modal
  const [setId, setSetId] = useState(null); // Estado para el ID del set
  const navigation = useNavigation();

  const openModal = (param, id) => {
    setModalParam(param); // Actualiza el estado con el valor recibido
    setSetId(id); // Actualiza el estado con el ID del set
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setInputValue1(''); // Limpiar el primer campo de entrada al cerrar el modal
    setInputValue2(''); // Limpiar el segundo campo de entrada al cerrar el modal
  };

  const handleConfirm = () => {
    if (inputValue1.trim() !== '' && inputValue2.trim() !== '') { // Verifica que todos los inputs no estén vacíos
      editNumber(setId, [inputValue1, inputValue2]); // Guarda los dos valores
      closeModal();
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
      addNumber([0, 0]); // Inicializa con dos valores
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
    openModal(`Set ${index + 1}`, index); // Pasa el valor del set y el ID como parámetro
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
          animationType="fade" // Cambiado para que el modal no se deslice
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
                  keyboardType='numeric' // Solo permitir números
                  placeholder="Puntaje 1" // Placeholder para el primer campo
                />
                <TextInput
                  style={styles.input}
                  value={inputValue2}
                  onChangeText={setInputValue2}
                  keyboardType='numeric' // Solo permitir números
                  placeholder="Puntaje 2" // Placeholder para el segundo campo
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
    marginTop: '25%',
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
  botonMas: {
    display: 'flex',
    alignContent: 'flex-start'
  },
  botonMenos: {
    marginLeft: '42%'
  },
  backButton: {
    width: 30,
    height: 30,
    marginRight: '80%',
    marginTop: 10,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative', // Para que la X esté en la esquina superior derecha
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row', // Alineación horizontal de los campos
    justifyContent: 'space-between', // Espacio entre los campos
    width: '100%', // Ancho del contenedor de los campos
    marginBottom: 15,
  },
  input: {
    flex: 1, // Ocupa todo el espacio disponible
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5, // Espacio entre los campos
  },
  confirmButton: {
    backgroundColor: '#00bfff',
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default PuntajeJugar;
