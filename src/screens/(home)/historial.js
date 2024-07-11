import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Historial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Historial</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Historial;