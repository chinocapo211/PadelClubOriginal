import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FinalJugar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ganaste</Text>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} // Reemplaza con la URL de la imagen del usuario
          style={styles.profileImage}
        />
        <View style={styles.progressContainer}>
          <LinearGradient
            colors={['#FDD835', '#FBC02D']} // Colores del gradiente (amarillo)
            style={styles.progress}
          />
        </View>
        <View style={styles.trophyContainer}>
        {/* 
          <Image
            source={require('./path/to/trophy-icon.png')} // Reemplaza con la ruta de tu icono de trofeo
            style={styles.trophyIcon}
          />
          <Image
            source={require('./path/to/trophy-icon.png')} // Reemplaza con la ruta de tu icono de trofeo
            style={styles.trophyIcon}
          />
          */}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  card: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  progressContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progress: {
    width: '70%', // Ajusta el porcentaje para simular progreso
    height: '100%',
    borderRadius: 10,
  },
  trophyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  trophyIcon: {
    width: 40,
    height: 40,
  },
  button: {
    backgroundColor: '#00B0FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FinalJugar;
