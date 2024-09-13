import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';

const Terminos = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Navbar superior */}
      <NavbarHigh style={styles.navbarHigh} />

      {/* Contenido con Scroll */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Términos y Condiciones de Uso</Text>
          <Text style={styles.paragraph}>
            Bienvenido a [Nombre de la Página], una plataforma dedicada a la organización de partidos de pádel. Al acceder y utilizar nuestros servicios, usted acepta los siguientes Términos y Condiciones. Le recomendamos que los lea detenidamente.
          </Text>
          <Text style={styles.heading}>1. Aceptación de los Términos</Text>
          <Text style={styles.paragraph}>
            Al registrarse y utilizar [Nombre de la Página], usted acepta y se compromete a cumplir con estos Términos y Condiciones. Si no está de acuerdo con alguno de los términos aquí expuestos, por favor, absténgase de utilizar nuestra plataforma.
          </Text>
          {/* Agrega el resto del contenido aquí */}
        </View>
      </ScrollView>

      {/* Navbar inferior */}
      <NavbarLow style={styles.navbarLow} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navbarHigh: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 1,
  },
  scrollContainer: {
    paddingTop: 100, // Deja espacio para la navbar superior
    paddingBottom: 60, // Deja espacio para la navbar inferior
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  navbarLow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
});

export default Terminos;
