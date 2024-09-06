import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';

const Clubes = ({ navigation }) => {
    const handleLogout = async () => {
      try {
        // Eliminar el token almacenado 
        const token = await AsyncStorage.getItem('@AccessToken');
        if (token) {
          console.log('Token found, clearing...');
          await AsyncStorage.removeItem('@AccessToken');
          console.log('Token cleared');
        } else {
          console.log('No token found to clear');
        }
        // Navegar al inicio de sesión y reiniciar la navegación
        navigation.navigate('Login')
      } catch (error) {
      
        Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
      }
    };
    return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <NavbarHigh/>
            <View style={styles.content}>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
            <NavbarLow />
          </View>
        </SafeAreaView>
      );
}
export default Clubes;