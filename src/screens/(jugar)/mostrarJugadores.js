import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
const MostrarJugadores = ({ navigation }) => {
  const userName = 'Borja';
  const userRank = 'Rango XVII';
  const userName2 = 'Merentiel';
  const userRank2 = 'Rango XI';

  return (
    
    <View style={styles.container}>
      <NavbarHigh>
      </NavbarHigh>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
            source={require('../../../assets/images/back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
       
      <View style={styles.innerContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userRank}>{userRank}</Text>
            <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName2}</Text>
            <Text style={styles.userRank}>{userRank2}</Text>
            <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
          </View>
        </View>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Color de fondo para el contenedor principal
    
},
backButton: {
  alignSelf: 'flex-start',
  width: 30,
  height: 30,
},
  innerContainer: {
    backgroundColor: 'white', // Color de fondo para el contenedor interno
    borderRadius: 10,
    marginTop:60,
    padding: 20,
    shadowColor: '#000',
    height: 650,
    width:500,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.85,
      shadowRadius: 3.84,
      elevation: 5,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userRank: {
    fontSize: 18,
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#00BFFF',
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Margen superior para separarlo del contenedor anterior

  },
  addButtonText: {
    fontSize: 30,
    fontStyle: 'bold',
    color: 'white',
  },
});

export default MostrarJugadores;