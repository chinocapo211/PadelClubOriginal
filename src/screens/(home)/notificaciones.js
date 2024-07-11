import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Notificaciones = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Notificaciones</Text>
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

export default Notificaciones;