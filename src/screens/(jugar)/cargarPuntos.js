import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CargarPuntos = ({ route }) => {
  const { setNumber } = route.params; // Número del set que se está actualizando
  const [puntos, setPuntos] = useState({ team1: '', team2: '' });
  const navigation = useNavigation();

  const handleSave = async () => {
    // Aquí va la lógica para guardar los puntos en la base de datos.
    try {
      // Suponiendo que tienes una función para guardar los puntos en la base de datos:
      await savePointsToDatabase(setNumber, puntos.team1, puntos.team2);

      // Después de guardar, volvemos a la pantalla anterior
      navigation.goBack();
    } catch (error) {
      console.error("Error guardando los puntos:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cargar Puntos - {setNumber}</Text>
      <TextInput
        style={styles.input}
        placeholder="Puntos Equipo 1"
        keyboardType="numeric"
        value={puntos.team1}
        onChangeText={(text) => setPuntos({ ...puntos, team1: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Puntos Equipo 2"
        keyboardType="numeric"
        value={puntos.team2}
        onChangeText={(text) => setPuntos({ ...puntos, team2: text })}
      />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
});

export default CargarPuntos;
