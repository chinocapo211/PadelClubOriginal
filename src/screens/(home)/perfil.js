import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Perfil = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Perfil</Text>
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

export default Perfil;