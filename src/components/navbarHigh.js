import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const NavbarHigh = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Feather name="bell" size={24} color="black" />
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={styles.logo}
          />
          <Feather name="user" size={26} color="black"/>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '15%',  // Altura de la barra de navegación 
    top: 0,
    left: 0,
    right: 0,
    position:'absolute',
    
  },
  topSection: {
    height: '100%',
    width:'100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20%',  // Espaciado horizontal para los elementos
    left:0,
    top:0,
  },
  logo: {
    width: '100%',  // Ajusta el tamaño según tu necesidad
    height: '100%',  // Ajusta el tamaño según tu necesidad
    resizeMode: 'contain',  // Asegura que la imagen no se deforme
  },
});

export default NavbarHigh;
