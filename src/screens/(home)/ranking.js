import React, { useState, useEffect ,} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
import userApi from '../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Ranking = ({ navigation }) => {

  return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <NavbarHigh />
      <View style={styles.buttonContainer}>
        
      </View>
      <NavbarLow />
    </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
    backgroundColor:"#EBEBEB",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: screenHeight * 0.05,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    maxWidth: screenWidth * 0.8,
    paddingHorizontal: screenWidth * 0.05,
    marginTop:50,
  },
  button: {
    height: screenHeight * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonPlay: {
    backgroundColor: '#8dc1ff',
  },
  buttonTournaments: {
    backgroundColor: '#6CA0D4',
  },
  buttonFriends: {
    backgroundColor: '#3D8AD4',
  },
  buttonText: {
    color: 'white',
    fontSize: screenWidth * 0.08,
  },
});

export default Ranking;