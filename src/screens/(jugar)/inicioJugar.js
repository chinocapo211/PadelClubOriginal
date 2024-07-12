import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';

const InicioJugar = ({ navigation }) => {
  const userName = 'Raul Molonuense';
  const userRank = 'Rango XVII';

  return (
    <View style={styles.container}>
      <NavbarHigh />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.innerContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userRank}>{userRank}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('MostrarJugadores')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: '30%', // Ajusta esto según la altura de la NavbarHigh para evitar que el contenido se superponga
  },
  backButton: {
    position: 'absolute',
    top: 40, // Ajusta esto según la altura de la NavbarHigh
    left: 20,
  },
  backButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  innerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    height: 200, // Ajusta la altura según sea necesario
    width: '90%',
    padding: 20,
    marginTop: 20, // Espaciado superior para separar del botón de regreso
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.85,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    width: '100%',
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
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100, // Margen superior para separarlo del contenedor anterior
  },
  addButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default InicioJugar;
