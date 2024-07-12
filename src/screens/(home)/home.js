import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import NavbarHigh from '../../components/navbarHigh' 
const screenWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {
  return (
    <View>
      <NavbarHigh/>
      <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonFriends]}
          onPress={() => navigation.navigate('InicioJugar')}
        >
          <Text style={styles.buttonText}>Jugar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonTournaments]}
          onPress={() => navigation.navigate('Torneos')}
        >
          <Text style={styles.buttonText}>Torneos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonPlay]}
          onPress={() => navigation.navigate('Amigos')}
        >
          <Text style={styles.buttonText}>Amigos</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
    top:'30%',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    maxWidth: 400,
  },
  button: {
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%', // Adjusted to '100%' to fit within parent container
  },
  buttonPlay: {
    backgroundColor: '#00BFFF',
    height: 150,
  },
  buttonTournaments: {
    backgroundColor: '#FF69B4',
    height: 150,
  },
  buttonFriends: {
    backgroundColor: '#32CD32',
    height: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
  },
});

export default Home;
