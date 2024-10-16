import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const NavbarHigh = () => {
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
        <TouchableOpacity onPress={() => navigation.navigate('NabBar', {screen: 'NotificacionesStack'})}>
          <Feather name="bell" size={32} color="black" />
        </TouchableOpacity>
        <Image
            source={require('../../assets/images/logo.jpg')}
            style={styles.logo}
          />
          <TouchableOpacity onPress={() => navigation.navigate('NabBar', {screen: 'PerfilStack'})}>
            <Feather name="user" size={32} color="black"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    width: "100vw",
    height: "20vh",
    backgroundColor: 'white',
    top: 0,
    left: 0,
    right: 0,
    position:'absolute',
  },
  topSection: {
    display: 'flex',
    height: "20vh",
    flexDirection: "row",
    backgroundColor: 'white',
    justifyContent: "space-around",
    alignItems: "center"

  },
  logo: {
    width: "60%",
    height: "60%",  // Ajusta el tamaño según tu necesidad
    resizeMode: "contain"

  },
});

export default NavbarHigh;
