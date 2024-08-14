import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons'; // Importa el ícono de Entypo
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-web';

const { width, height } = Dimensions.get('window'); // Obtén las dimensiones de la pantalla

const Amigos = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const userName = 'Borja';
  const userRank = 'Rango XVII';
  const userProfileImage = 'https://www.corrienteshoy.com/galeria/fotos/2024/04/21/o_e204a84f9b5e2ddeec06652b4ad409ee.jpg'; // URL de la imagen de perfil de Borja
  const userName2 = 'Merentiel';
  const userRank2 = 'Rango XI';
  const userProfileImage2 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGA6ie41S3pVc3qKVfbXoAuE71BZy67h0t6mJcwxdOPXYA5kDbnrVnb7AxIs66GEIj0o4&usqp=CAU'; // URL de la imagen de perfil de Merentiel

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <NavbarHigh />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <Entypo name="magnifying-glass" size={24} color="#888888" /> {/* Ícono de lupa */}
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor="#888888" // Color del texto placeholder
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userRank}>{userRank}</Text>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Image source={{ uri: userProfileImage2 }} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName2}</Text>
            <Text style={styles.userRank}>{userRank2}</Text>
          </View>
        </View>
      </View>
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
    backgroundColor: '#F5F5F5', // Color de fondo para el contenedor principal
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 40,
    marginLeft: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000000',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 100,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#6b7697ff', // Color del texto del input
    marginLeft: 10, // Espacio entre el ícono y el texto
  },
  innerContainer: {
    backgroundColor: 'white', // Color de fondo para el contenedor interno
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    height: height * 0.7, // 70% de la altura de la pantalla
    width: width * 0.9, // 90% del ancho de la pantalla
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.85,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Hace que la imagen sea circular
    marginRight: 15, // Espacio entre la imagen y la información del usuario
  },
  userInfo: {
    alignItems: 'flex-start', // Alinea el texto a la izquierda
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userRank: {
    fontSize: 18,
    color: 'gray',
  },
});

export default Amigos;