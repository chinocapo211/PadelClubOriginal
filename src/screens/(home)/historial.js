import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button, SafeAreaView } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';

const notificaciones = [
  {
    id: '1',
    jugadores: [
      { nombre: 'Raul', imagen: 'url-de-la-imagen-de-Raul' },
      { nombre: 'Humberta', imagen: 'url-de-la-imagen-de-Humberta' },
      { nombre: 'Marcos', imagen: 'url-de-la-imagen-de-Marcos' },
      { nombre: 'Merentiel', imagen: 'url-de-la-imagen-de-Merentiel' },
    ],
    marcador: '2 - 1',
    sets: '6-4 6-1 6-2',
  },
  {
    id: '2',
    jugadores: [
      { nombre: 'Raul', imagen: 'url-de-la-imagen-de-Raul' },
      { nombre: 'Humberta', imagen: 'url-de-la-imagen-de-Humberta' },
      { nombre: 'Marcos', imagen: 'url-de-la-imagen-de-Marcos' },
      { nombre: 'Merentiel', imagen: 'url-de-la-imagen-de-Merentiel' },
    ],
    marcador: '1 - 1',
    sets: '6-4 1-6',
  },
  {
    id: '3',
    jugadores: [
      { nombre: 'Raul', imagen: 'url-de-la-imagen-de-Raul' },
      { nombre: 'Humberta', imagen: 'url-de-la-imagen-de-Humberta' },
      { nombre: 'Marcos', imagen: 'url-de-la-imagen-de-Marcos' },
      { nombre: 'Merentiel', imagen: 'url-de-la-imagen-de-Merentiel' },
    ],
    marcador: '1 - 2',
    sets: '1-6 6-4 6-6',
  },
];

const NotificacionesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavbarHigh />
      <FlatList
        data={notificaciones}
        keyExtractor={item => item.id}
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
  notificacion: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    marginTop: '32%',
    marginBottom: '-12%',
    
  },
  jugadoresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  jugador: {
    alignItems: 'center',
  },
  imagen: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nombre: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  resultadoContainer: {
    alignItems: 'center',
  },
  marcador: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sets: {
    fontSize: 12,
    color: 'gray',
  },
});

export default NotificacionesScreen;