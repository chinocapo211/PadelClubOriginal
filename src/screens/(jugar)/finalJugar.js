import React, { useEffect } from 'react'; // Asegúrate de importar useEffect
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';

const FinalJugar = ({ route }) => {
  const navigation = useNavigation();
  const { puntaje } = route.params || {}; // Asegúrate de obtener `puntaje` desde `route.params`

  useEffect(() => {
    if (puntaje) {
      console.log("Valor de puntaje recibido:", puntaje);
      // Si quieres mostrarlo en una alerta o en el UI, puedes hacerlo aquí
      Alert.alert("Valor de puntaje", JSON.stringify(puntaje.score));
    }
  }, [puntaje]);

  // ... El resto del código

  const calculateElo = (Ra, Rb, Sa, Sb, Ka, Kb) => {
    // Calcular expectativas
    const Ea = 1 / (1 + Math.pow(10, (Rb - Ra) / 400));
    const Eb = 1 / (1 + Math.pow(10, (Ra - Rb) / 400));

    // Calcular nuevos rankings
    const newRa = Ra + Ka * (Sa - Ea);
    const newRb = Rb + Kb * (Sb - Eb);

    return { newRa, newRb };
  };

  const getKFactor = (playerRating, matchesPlayed) => {
    if (matchesPlayed < 30 || playerRating < 2300) {
      return 40;
    } else if (playerRating >= 2400) {
      return 10;
    } else {
      return 20;
    }
  };

  const calculateTeamRankings = () => {
    // Sumar los rankings de los jugadores de cada equipo
    const Ra = teamA.player1.rating + teamA.player2.rating;
    const Rb = teamB.player1.rating + teamB.player2.rating;

    // Obtener el factor K para cada equipo
    const Ka = (getKFactor(teamA.player1.rating, teamA.player1.matches) + getKFactor(teamA.player2.rating, teamA.player2.matches)) / 2;
    const Kb = (getKFactor(teamB.player1.rating, teamB.player2.rating) + getKFactor(teamB.player2.rating, teamB.player2.matches)) / 2;

    // Asignar los resultados (1 = victoria, 0.5 = empate, 0 = derrota)
    const { Sa, Sb } = resultado;

    // Calcular los nuevos rankings
    const { newRa, newRb } = calculateElo(Ra, Rb, Sa, Sb, Ka, Kb);

    // Dividir el nuevo ranking del equipo entre los dos jugadores
    const updatedTeamAPlayer1 = newRa / 2;
    const updatedTeamAPlayer2 = newRa / 2;
    const updatedTeamBPlayer1 = newRb / 2;
    const updatedTeamBPlayer2 = newRb / 2;

    // Aquí podrías actualizar el estado con los nuevos valores de ranking de cada jugador
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <NavbarHigh />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <View style={styles.scoreWrapper}>
          {puntaje.map((set, index) => (
            <View key={index} style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{set.name}</Text>
              <Text style={styles.scoreText}>{set.score[0]} - {set.score[1]}</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CargarPuntos', { index })}>
                <Text style={styles.buttonText}>Cargar puntos</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scoreWrapper: {
    borderRadius: 15,
    width: '80%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginTop: '40%',
  },
  scoreContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: '8%',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00bfff',
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    marginTop: 20,
  },
  centerIconContainer: {
    justifyContent: 'center',
  },
  botonMas: {
    display: 'flex',
    alignContent: 'flex-start',
  },
  botonMenos: {
    marginLeft: '42%',
  },
  backButton: {
    width: 30,
    height: 30,
    marginRight: '80%',
    marginTop: 10,
    zIndex: 1,
  },
  subirPartidoButton: {
    marginTop: 20,
    backgroundColor: '#00ff00',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  subirPartidoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FinalJugar;
