import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const NavbarLow = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF6F00', '#FF8E53']}
        style={styles.gradient}
      />
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomeStack', {screen: 'HomeMain'})}>
          <Feather name="home" size={24} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('TabBar', {screen: 'Historial'})}>
          <Feather name="book-open" size={24} color="black" />
          <Text style={styles.navText}>Historial</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('TabBar', {screen: 'Ajustes'})}>
          <Feather name="settings" size={24} color="black" />
          <Text style={styles.navText}>Ajustes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    height: '8.4%',
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    bottom: -5,
    width: '100%',
    height: 100, // Altura del contenedor de fondo
  },
  navbar: {
    backgroundColor: 'white',
    width: '85%', // Ancho de la barra de navegación
    height: 60, // Altura de la barra de navegación
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
  },
});

export default NavbarLow;

