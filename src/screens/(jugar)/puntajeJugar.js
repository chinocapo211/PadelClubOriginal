import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Pressable, Alert } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const PuntajeJugar = () => {
  const [sets, setSets] = useState([{ name: 'Set 1', score: [0, 0] }]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [modalParam, setModalParam] = useState(null);
  const [setId, setSetId] = useState(null);
  const navigation = useNavigation();

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
      editNumber(setId, [num1, num2]);
      closeModal();
    } else {
      Alert.alert("Error", "Se tiene que cargar el puntaje correctamente. No ingresar letras y en caso de tie break poner 7-6 o 6-7.");
    }
  };

  const editNumber = (index, newValues) => {
    const updatedSets = [...sets];
    updatedSets[index] = { ...updatedSets[index], score: newValues };
    setSets(updatedSets);
  };

  const addSet = () => {
    if (sets.length < 3) {
      setSets([...sets, { name: `Set ${sets.length + 1}`, score: [0, 0] }]);
    }
  };

  const removeSet = () => {
    if (sets.length > 1) {
      setSets(sets.slice(0, -1));
    }
  };

  const handleCargarPuntos = (index) => {
    openModal(`Set ${index + 1}`, index);
  };

  const handleSubirPartido = () => {
    navigation.navigate('FinalJugar', { puntaje: sets }) 
  
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../../assets/images/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <NavbarHigh />
        <View style={styles.scoreWrapper}>
          {sets.map((set, index) => (
            <View key={index} style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{set.name}</Text>
              <Text style={styles.scoreText}>
                {set.score[0]} - {set.score[1]}
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
    backgroundColor:"#EBEBEB"
  },
  subirPartidoButton: {
    backgroundColor: '#3AD4E3',
    borderRadius: 20,
    paddingVertical: "4%",
    paddingHorizontal: "5%",
    marginTop: "5%",
    alignSelf: 'center',
    alignItems:"center",
    width:"80%",
    textAlign:"center",
  },
  container: {
    flex: 1,
  },
  scoreWrapper: {
    borderRadius: 15,
    width: '80%',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginTop: '25%',
    alignSelf:"center",
  },
  scoreContainer: {
    backgroundColor: '#ffffff',
    padding: "5%",
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: "5%",
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
    alignSelf:"center",
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
    alignSelf:"center",
  },
  centerIconContainer: {
    justifyContent: 'center',
  },
  botonMas: {
    display: 'flex',
    alignSelf: 'flex-start',
  },
  botonMenos: {
    marginLeft: '42%',
  },
  backButton: {
    width: 30,
    height: 30,
    zIndex: 1,
  },
  backImage: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: "80%",
    padding: "5%",
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: "4%",
  },
  input: {
    width: '30%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: "3%",
    marginHorizontal: "1%",
  },
  confirmButton: {
    backgroundColor: '#00bfff',
    width: '100%',
    paddingVertical: "3%",
    marginTop: "8%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default PuntajeJugar;