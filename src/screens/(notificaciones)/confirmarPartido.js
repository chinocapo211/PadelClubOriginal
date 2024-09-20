import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';


const ConfirmarPartido = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../../assets/images/back.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <NavbarHigh/>
        <View style={styles.content}>

        </View>
      </View>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:"#EBEBEB"
  },
  backButton: {
    width: 30,
    height: 30,
    zIndex: 1,
  },
  backImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
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

export default ConfirmarPartido;
