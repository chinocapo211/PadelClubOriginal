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
      if (token) {
        logout();
      } else {
        console.log('No token found to clear');
      }
      // Navegar al inicio de sesión y reiniciar la navegación
      
    } catch (error) {
    
      Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <NavbarHigh />
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MisClubes')}>
            <Text style={styles.buttonText}>Mis Clubes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PreguntasFrecuentes')}>
            <Text style={styles.buttonText}>Preguntas Frecuentes</Text>
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
    justifyContent: 'space-between', // Para asegurar que la NavbarLow esté en la parte inferior
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Para centrar el contenido en la pantalla
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#d3d3d3',
    width: '75%',
    height: '10%',
    padding: '6%',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Ajustes;
