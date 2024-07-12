import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const NavbarHigh = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
        <Feather name="bell" size={24} color="black" />
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo.jpg')}
              style={styles.logo}
            />
          </View>
          <Feather name="user" size={30} color="black" style={styles.profileIcon} />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    topSection: {
      height: 120, // Tamaño predefinido del topSection
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    logoContainer: {
      width: 100, // Ancho predefinido para el contenedor del logo
      height: '100%', // La altura del contenedor será la misma que la del topSection
      justifyContent: 'center', // Centra verticalmente la imagen
    },
    logo: {
      width: '100%',
      height: '100%',
    },
    profileIcon: {
      // Estilos opcionales para el icono de perfil
    },
  });
  
  
  export default NavbarHigh;