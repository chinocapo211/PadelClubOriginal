import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavbarHigh from '../../components/navbarHigh';
import { useAuth } from '../../components/AuthProvider';
import NavbarLow from '../../components/navbarLow';


const Ajustes = ({ navigation }) => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      // Eliminar el token almacenado 
      const token = await AsyncStorage.getItem('@AccessToken');
      const idgrupo = await AsyncStorage.getItem('@GrupoId');
      if (token) {
        logout();
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
        <NavbarHigh/>
        <View style={styles.content}>
          <TouchableOpacity 
          style={[styles.button, styles.buttonClubes]}
          onPress={() => navigation.navigate('Clubes')}>
            <Text style={styles.buttonText}>Mis Clubes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TerminosCondiciones')}>
            <Text style={styles.buttonText}>Términos y Condiciones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
        <NavbarLow />
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
  content: {
    flex: 1,
    justifyContent: 'center', // Para centrar el contenido en la pantalla
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
  buttonClub: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    marginBottom: '3%'
  },  
});

export default Ajustes;
