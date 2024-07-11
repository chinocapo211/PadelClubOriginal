import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Ajustes = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Ajustes</Text>
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

export default Ajustes;