import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-safe-area-context';
const PuntajeJugar = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <NavbarHigh/>
      
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#d3d3d3',
    width: '75%',
    height:'10%',
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

export default PuntajeJugar;
