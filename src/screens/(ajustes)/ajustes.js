import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavbarHigh from '../../components/navbarHigh';
import { useAuth } from '../../components/AuthProvider';
import NavbarLow from '../../components/navbarLow';

const Ajustes = ({ navigation }) => {
  const { logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('@AccessToken');
      if (token) {
        logout();
        setModalVisible(false); // Cerrar el modal después de hacer logout
      } else {
        console.log('No token found to clear');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <NavbarHigh />
        <View style={styles.content}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonClubes]}
            onPress={() => navigation.navigate('Clubes')}>
            <Text style={styles.buttonText}>Mis Clubes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TerminosCondiciones')}>
            <Text style={styles.buttonText}>Términos y Condiciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
        
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>¿Estás seguro de que deseas cerrar sesión?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.buttonText2} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonTextSmall}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonText2} onPress={handleLogout}>
                  <Text style={styles.buttonTextSmall}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <NavbarLow />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EBEBEB"
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#d3d3d3',
    width: '150%',
    height: '15%',
    padding: '6%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 18, // Tamaño de texto del botón
    marginBottom: '3%',
    textAlign: "center",
  },
  modalOverlay: {
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
  modalText: {
    marginBottom: "4%",
    textAlign: 'center',
    fontSize: 20, // Aumentar tamaño de texto del título del modal
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: "5%",
  },
  buttonText2: {
    backgroundColor: '#8dc1ff', // Color más claro y blanco
    width: '40%', // Ancho reducido
    paddingVertical: "4.5%", // Ajuste del padding
    borderRadius: 50, // Bordes más redondeados
    alignItems: 'center', // Centra el texto
    justifyContent: 'center', // Centra el texto
  },
  buttonTextSmall: {
    color: 'black',
    fontSize: 14, // Tamaño de texto más pequeño para botones
    textAlign: "center",
  },
});

export default Ajustes;
 