import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
const Historial = () => {
  return (
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
            <Text style={styles.score}> - </Text>
            <Text style={styles.scoreDetails}>6-4 1-6</Text>
          </View>
          <View style={styles.playerContainer}>
            <Text style={styles.playerName}>Merentiel</Text>
          </View>
        </View>
        <Button title="Reportar" onPress={() => {}} style={styles.reportButton} />
      </View>
      <View style={styles.matchContainer}>
      </View>
      <View style={styles.matchContainer}>
      </View>
      <NavbarLow/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    verticalAlign: 'middle'
  },
  matchContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
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
