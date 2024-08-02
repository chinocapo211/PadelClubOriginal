import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const NavbarLow = () => {
  const navigation = useNavigation();
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('TabBar', {screen: 'Home'})}>
            <Feather name="home" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('TabBar',{screen:'Historial'})}>
            <Feather name="book-open" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('TabBar',{screen:'Ajustes'})}>
            <Feather name="settings" size={24} color="black" />
          </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '9%',   
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});

export default NavbarLow;

