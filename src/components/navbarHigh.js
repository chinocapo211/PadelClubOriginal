import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const NavbarHigh = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
        <TouchableOpacity onPress={() => navigation.navigate('InicioJugar')}>
          <Feather name="bell" size={24} color="black" />
        </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('InicioJugar')}>
            <Feather name="user" size={26} color="black"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '15%',   
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
    justifyContent: 'space-around',
    paddingHorizontal: '1%',  // Espaciado horizontal para los elementos
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
