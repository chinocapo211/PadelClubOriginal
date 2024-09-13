import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavbarHigh from '../../components/navbarHigh';
import NavbarLow from '../../components/navbarLow';

const Terminos = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <NavbarHigh />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Términos y Condiciones de Uso</Text>
          <Text style={styles.paragraph}>
            Bienvenido a [Nombre de la Página], una plataforma dedicada a la organización de partidos de pádel. 
            Al acceder y utilizar nuestros servicios, usted acepta los siguientes Términos y Condiciones. Le recomendamos que los lea detenidamente.
          </Text>
          <Text style={styles.heading}>1. Aceptación de los Términos</Text>
          <Text style={styles.paragraph}>
            Al registrarse y utilizar [Nombre de la Página], usted acepta y se compromete a cumplir con estos Términos y Condiciones. 
            Si no está de acuerdo con alguno de los términos aquí expuestos, por favor, absténgase de utilizar nuestra plataforma.
          </Text>
          <Text style={styles.heading}>2. Registro y Cuenta de Usuario</Text>
          <Text style={styles.paragraph}>
            Para acceder a nuestros servicios, es necesario registrarse y crear una cuenta de usuario. Al hacerlo, usted se compromete 
            a proporcionar información veraz, actual y completa sobre usted según lo solicitado en nuestro formulario de registro.
          </Text>
          <Text style={styles.heading}>3. Recopilación y Uso de Información Personal</Text>
          <Text style={styles.paragraph}>
            Al registrarse en [Nombre de la Página], recopilamos la siguiente información personal:{'\n'}
            - Nombre completo{'\n'}
            - Dirección de correo electrónico{'\n'}
            - Número de teléfono{'\n'}
            - Información sobre su nivel de juego y disponibilidad
          </Text>
          <Text style={styles.paragraph}>
            Esta información es utilizada para:{'\n'}
            - Coordinar y organizar partidos de pádel{'\n'}
            - Comunicarnos con usted acerca de sus partidos y actividades relacionadas{'\n'}
            - Mejorar nuestros servicios y ofrecerle una experiencia personalizada
          </Text>
          <Text style={styles.heading}>4. Protección de Datos</Text>
          <Text style={styles.paragraph}>
            Nos comprometemos a proteger su información personal. Implementamos medidas de seguridad adecuadas para proteger su información 
            contra el acceso no autorizado, la alteración, divulgación o destrucción de los datos.
          </Text>
          <Text style={styles.heading}>5. Uso de la Plataforma</Text>
          <Text style={styles.paragraph}>
            Usted se compromete a utilizar [Nombre de la Página] exclusivamente con fines legítimos y de acuerdo con estos Términos y Condiciones. 
            No está permitido:{'\n'}
            - Utilizar la plataforma para cualquier actividad ilegal o no autorizada{'\n'}
            - Proporcionar información falsa o engañosa{'\n'}
            - Interferir con el funcionamiento de la plataforma o los servicios proporcionados
          </Text>
          <Text style={styles.heading}>6. Responsabilidad del Usuario</Text>
          <Text style={styles.paragraph}>
            Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, así como de todas las actividades que ocurran 
            bajo su cuenta. Debe notificarnos inmediatamente de cualquier uso no autorizado de su cuenta.
          </Text>
          <Text style={styles.heading}>7. Modificaciones de los Términos</Text>
          <Text style={styles.paragraph}>
            Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Cualquier cambio será notificado a los 
            usuarios a través de nuestra plataforma. El uso continuado de los servicios después de la publicación de los cambios constituye su aceptación de los mismos.
          </Text>
          <Text style={styles.heading}>8. Propiedad Intelectual</Text>
          <Text style={styles.paragraph}>
            Todo el contenido de la plataforma, incluidos textos, gráficos, logotipos, íconos y software, es propiedad de [Nombre de la Página] 
            o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.
          </Text>
          <Text style={styles.heading}>9. Enlaces a Terceros</Text>
          <Text style={styles.paragraph}>
            Nuestra plataforma puede contener enlaces a sitios web de terceros. No somos responsables del contenido ni de las prácticas de privacidad 
            de dichos sitios. Le recomendamos que lea los términos y condiciones y las políticas de privacidad de cualquier sitio web de terceros que visite.
          </Text>
          <Text style={styles.heading}>10. Terminación del Servicio</Text>
          <Text style={styles.paragraph}>
            Nos reservamos el derecho de suspender o terminar su acceso a la plataforma en cualquier momento, sin previo aviso, si consideramos 
            que ha violado estos Términos y Condiciones o por cualquier otra razón justificada.
          </Text>
          <Text style={styles.heading}>11. Contacto</Text>
          <Text style={styles.paragraph}>
            Si tiene alguna pregunta o inquietud acerca de estos Términos y Condiciones, por favor, póngase en contacto con nosotros a través de 
            [dirección de correo electrónico de contacto].
          </Text>
          <Text style={styles.paragraph}>
            Al utilizar [Nombre de la Página], usted confirma que ha leído, comprendido y aceptado estos Términos y Condiciones. Gracias por ser 
            parte de nuestra comunidad y disfrutar del pádel con nosotros.
          </Text>
        </ScrollView>
        <NavbarLow />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:  "10%",
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    maxWidth: "100%",
    paddingHorizontal: "10%",
    marginTop:50,
  },
  button: {
    height:  "15%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonPlay: {
    backgroundColor: '#8dc1ff',
  },
  buttonTournaments: {
    backgroundColor: '#6CA0D4',
  },
  buttonFriends: {
    backgroundColor: '#3D8AD4',
  },
  buttonText: {
    color: 'white',
    fontSize: "10%",
  },
});

export default Terminos;
