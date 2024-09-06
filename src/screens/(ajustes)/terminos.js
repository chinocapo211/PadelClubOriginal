import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';
const Terminos = ({ navigation }) => {
    const handleLogout = async () => {
      try {
        // Eliminar el token almacenado 
        const token = await AsyncStorage.getItem('@AccessToken');
        if (token) {
          console.log('Token found, clearing...');
          await AsyncStorage.removeItem('@AccessToken');
          console.log('Token cleared');
        } else {
          console.log('No token found to clear');
        }
        // Navegar al inicio de sesión y reiniciar la navegación
        navigation.navigate('Login')
      } catch (error) {
      
        Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
      }
    };
    return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.containerNav}>
            <NavbarHigh/>
            <View style={styles.content}>
              <TouchableOpacity style={styles.container}>
                <Text>**Términos y Condiciones de Uso**

Bienvenido a [Nombre de la Página], una plataforma 
dedicada a la organización de partidos de pádel. 
Al acceder y utilizar nuestros servicios, usted acepta 
los siguientes Términos y Condiciones. Le recomendamos 
que los lea detenidamente.

### 1. Aceptación de los Términos
Al registrarse y utilizar [Nombre de la Página], usted acepta 
y se compromete a cumplir con estos Términos y Condiciones. 
Si no está de acuerdo con alguno de los términos aquí 
expuestos, por favor, absténgase de utilizar nuestra plataforma.

### 2. Registro y Cuenta de Usuario
Para acceder a nuestros servicios, es necesario registrarse y 
crear una cuenta de usuario. Al hacerlo, usted se compromete 
a proporcionar información veraz, actual y completa sobre usted 
según lo solicitado en nuestro formulario de registro.

### 3. Recopilación y Uso de Información Personal
Al registrarse en [Nombre de la Página], recopilamos la siguiente 
información personal:
- Nombre completo
- Dirección de correo electrónico
- Número de teléfono
- Información sobre su nivel de juego y disponibilidad

Esta información es utilizada para:
- Coordinar y organizar partidos de pádel
- Comunicarnos con usted acerca de sus partidos y actividades relacionadas
- Mejorar nuestros servicios y ofrecerle una experiencia personalizada

### 4. Protección de Datos
Nos comprometemos a proteger su información personal. Implementamos 
medidas de seguridad adecuadas para proteger su información contra el 
acceso no autorizado, la alteración, divulgación o destrucción de los datos.

### 5. Uso de la Plataforma
Usted se compromete a utilizar [Nombre de la Página] exclusivamente con 
fines legítimos y de acuerdo con estos Términos y Condiciones. No está permitido:
- Utilizar la plataforma para cualquier actividad ilegal o no autorizada
- Proporcionar información falsa o engañosa
- Interferir con el funcionamiento de la plataforma o los servicios proporcionados

### 6. Responsabilidad del Usuario
Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, 
así como de todas las actividades que ocurran bajo su cuenta. Debe notificarnos 
inmediatamente de cualquier uso no autorizado de su cuenta.

### 7. Modificaciones de los Términos
Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier
 momento. Cualquier cambio será notificado a los usuarios a través de nuestra 
plataforma. El uso continuado de los servicios después de la publicación de los 
cambios constituye su aceptación de los mismos.

### 8. Propiedad Intelectual
Todo el contenido de la plataforma, incluidos textos, gráficos, logotipos, íconos y 
software, es propiedad de [Nombre de la Página] o de sus proveedores de contenido 
y está protegido por las leyes de propiedad intelectual.

### 9. Enlaces a Terceros
Nuestra plataforma puede contener enlaces a sitios web de terceros. No somos 
responsables del contenido ni de las prácticas de privacidad de dichos sitios. Le 
recomendamos que lea los términos y condiciones y las políticas de privacidad 
de cualquier sitio web de terceros que visite.

### 10. Terminación del Servicio
Nos reservamos el derecho de suspender o terminar su acceso a la plataforma 
en cualquier momento, sin previo aviso, si consideramos que ha violado estos 
Términos y Condiciones o por cualquier otra razón justificada.

### 11. Contacto
Si tiene alguna pregunta o inquietud acerca de estos Términos y Condiciones, 
por favor, póngase en contacto con nosotros a través de [dirección de correo 
electrónico de contacto].

---

Al utilizar [Nombre de la Página], usted confirma que ha leído, comprendido y 
aceptado estos Términos y Condiciones. Gracias por ser parte de nuestra 
comunidad y disfrutar del pádel con nosotros.</Text>
              </TouchableOpacity>
            </View>
            <NavbarLow/>
          </View>
        </SafeAreaView>
      );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    marginTop: '10%',
    alignContent: 'center',
  },
  containerNav: {
    marginTop: '0%',
    height: '68%'
  },
});
export default Terminos;