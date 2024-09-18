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
          <Text>Términos y Condiciones de Uso de PadelClub

Fecha de entrada en vigor: [Fecha]

1. Aceptación de los Términos

Al acceder y utilizar la aplicación PadelClub, usted acepta cumplir con estos Términos y Condiciones. Si no está de acuerdo con alguna parte de los términos, no debe utilizar la aplicación.

2. Descripción del Servicio

PadelClub es una plataforma que permite a los usuarios reservar canchas de pádel, encontrar jugadores y participar en eventos relacionados con el pádel. Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento.

3. Registro de Usuario

Para utilizar ciertos servicios de PadelClub, debe registrarse y crear una cuenta. Es responsable de mantener la confidencialidad de sus credenciales y de todas las actividades realizadas en su cuenta. Notifique a PadelClub de inmediato si sospecha de un uso no autorizado de su cuenta.

4. Uso Aceptable

Usted se compromete a utilizar PadelClub únicamente con fines legales y de acuerdo con estos términos. No puede:

Usar la aplicación de manera que cause daño a PadelClub o a otros usuarios.
Publicar contenido que sea ofensivo, ilegal, o que infrinja derechos de propiedad intelectual.
Realizar actividades fraudulentas o engañosas.
5. Propiedad Intelectual

Todos los derechos de propiedad intelectual en PadelClub, incluyendo pero no limitado a logotipos, nombres, y contenido, son propiedad de PadelClub o de sus licenciantes. No se permite reproducir, distribuir o modificar ningún contenido sin el consentimiento previo por escrito de PadelClub.

6. Limitación de Responsabilidad

PadelClub no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que surja de su uso o la incapacidad de usar la aplicación, incluso si se nos ha advertido de la posibilidad de dichos daños.

7. Modificaciones a los Términos

PadelClub se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor en el momento de su publicación en la aplicación. Su uso continuado de la aplicación después de la publicación de cambios constituye su aceptación de los nuevos términos.

8. Ley Aplicable

Estos Términos y Condiciones se rigen por las leyes de [País/Estado]. Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de [Ciudad/Estado].

9. Contacto

Si tiene alguna pregunta sobre estos Términos y Condiciones, puede contactarnos a través de [correo electrónico/contacto].</Text>
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
    backgroundColor:"#EBEBEB"
  },
  navbarHigh: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  scrollContainer: {
    marginTop: "35%", // Deja espacio para la navbar superior
    marginBottom: "0%", // Deja espacio para la navbar inferior
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
  subtitle: {
    fontSize: 17,
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
  },
});

export default Terminos;