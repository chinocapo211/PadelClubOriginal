import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button, SafeAreaView, Dimensions } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const notificaciones = [
  // Datos de ejemplo
];

const Historial = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavbarHigh />
      <FlatList
        data={notificaciones}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <View style={styles.notificacion}>
            <View style={styles.jugadoresContainer}>
              <View style={styles.jugador}>
                <Image source={{ uri: item.jugadores[0].imagen }} style={styles.imagen} />
                <Text style={styles.nombre}>{item.jugadores[0].nombre}</Text>
              </View>
              <View style={styles.jugador}>
                <Image source={{ uri: item.jugadores[1].imagen }} style={styles.imagen} />
                <Text style={styles.nombre}>{item.jugadores[1].nombre}</Text>
              </View>
              <View style={styles.resultadoContainer}>
                <Text style={styles.sets}>{item.sets}</Text>
                <Text style={styles.marcador}>{item.marcador}</Text>
              </View>
              <View style={styles.jugador}>
                <Image source={{ uri: item.jugadores[2].imagen }} style={styles.imagen} />
                <Text style={styles.nombre}>{item.jugadores[2].nombre}</Text>
              </View>
              <View style={styles.jugador}>
                <Image source={{ uri: item.jugadores[3].imagen }} style={styles.imagen} />
                <Text style={styles.nombre}>{item.jugadores[3].nombre}</Text>
              </View>
            </View>
            <Button title="Reportar" onPress={() => {}} />
          </View>
        )}
      />
      <NavbarLow />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContent: {
    paddingTop: screenHeight * 0.02,  // Añade espacio en la parte superior
    paddingBottom: screenHeight * 0.02, // Espacio para NavbarLow
  },
  notificacion: {
    backgroundColor: '#f9f9f9',
    padding: screenHeight * 0.02,
    marginVertical: screenHeight * 0.01,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  jugadoresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: screenHeight * 0.015,
  },
  jugador: {
    alignItems: 'center',
  },
  imagen: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: (screenWidth * 0.15) / 2,
  },
  nombre: {
    marginTop: screenHeight * 0.01,
    fontSize: screenWidth * 0.035,
    textAlign: 'center',
  },
  resultadoContainer: {
    alignItems: 'center',
  },
  marcador: {
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
  },
  sets: {
    fontSize: screenWidth * 0.035,
    color: 'gray',
  },
});

export default Historial;
