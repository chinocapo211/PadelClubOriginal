import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import { Entypo } from '@expo/vector-icons';
const Amigos = ({ navigation }) => {
    const userName = 'Borja';
    const userRank = 'Rango XVII';
    const userName2 = 'Merentiel';
    const userRank2 = 'Rango XI';
  return (
    <View style={styles.container}>
        <NavbarHigh />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.buscador}>
        <Entypo name="magnifying-glass" size={24}color="black"/>
          <Text >{'buscar'}</Text>
        </View>
        <View style={styles.innerContainer}>
        
          <View style={styles.profileContainer}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userRank}>{userRank}</Text>
            </View>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userName2}</Text>
              <Text style={styles.userRank}>{userRank2}</Text>
            </View>
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
        backgroundColor: '#F5F5F5', // Color de fondo para el contenedor principal
        
    },
      innerContainer: {
        backgroundColor: 'white', // Color de fondo para el contenedor interno
        borderRadius: 10,
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
        marginTop: 210,
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
      buscador: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'left',
        marginBottom: 15,
        borderRadius: 15,
        backgroundColor: '#5f5f5f',
        marginTop: 15,
        padding: 15,
        width:'80%',
        height:'5%',
        transform: [{ translateY: 200 }],
      }
});

export default Amigos;