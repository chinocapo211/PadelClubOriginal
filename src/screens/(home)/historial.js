import React from 'react';
import { View, Text, Image, StyleSheet, Button, Dimensions } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
import { SafeAreaView } from 'react-native-safe-area-context';
const { height } = Dimensions.get('window');
const Historial = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <NavbarHigh/>
      <View style={styles.matchContainer}>
        <View style={styles.playerRow}>
          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>Raul</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>2 - 1</Text>
            <Text style={styles.scoreDetails}>6-4 6-1 6-2</Text>
          </View>
          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>Marcos</Text>
          </View>
        </View>
        <View style={styles.playerRow}>
          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>Humberta</Text>
          </View>
          <View style={styles.scoreContainer}>
          </View>
          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>Merentiel</Text>
          </View>
        </View>
        <Button title="Reportar" onPress={() => {}} style={styles.reportButton} />
      </View>
      <View style={styles.matchContainer}>
        <View style={styles.playerRow}>
          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>Raul</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>2 - 1</Text>
            <Text style={styles.scoreDetails}>6-4 6-1 6-2</Text>
          </View>
          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>Marcos</Text>
          </View>
        </View>
        <View style={styles.playerRow}>
          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>Humberta</Text>
          </View>
          <View style={styles.scoreContainer}>
          </View>
          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>Merentiel</Text>
          </View>
        </View>
        <Button title="Reportar" onPress={() => {}} style={styles.reportButton}/>
      </View>
      <View style={styles.matchContainer}>
      </View>
      <View style={styles.matchContainer}>
      </View>
      <NavbarLow/>
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
    verticalAlign: 'middle'
  },
  matchContainer: {
    backgroundColor: '#fff',
    marginTop: height * 0.17,
    marginBottom: height * -0.15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerContainer: {
    flexDirection: 'column',
    verticalAlign: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  playerName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'center',
  },
  score: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  scoreDetails: {
    fontSize: 16,
    color: '#666',
  },
  reportButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default Historial;
