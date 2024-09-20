import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

const FinalJugar = ({ route }) => {
  const navigation = useNavigation();
  const { puntaje } = route.params || {}; // Obtener `puntaje` desde `route.params`

  const [scores, setScores] = useState([]); // Estado para almacenar los puntajes
  const [team1Points, setTeam1Points] = useState(0); // Estado para puntos del equipo 1
  const [team2Points, setTeam2Points] = useState(0);

  useEffect(() => {
    if (puntaje) {
      console.log("Valor de puntaje recibido:", puntaje);

      // Verificar si 'score' es un array para cada set
      puntaje.forEach((set, index) => {
        if (Array.isArray(set.score)) {
          console.log(`Score en Set ${index + 1} es un array:`, set.score);

          // Determinar qué equipo ganó el set
          if (set.score[0] === 7 || (set.score[0] === 6 && set.score[1] < 6)) {
            // Si el equipo 1 (score[0]) tiene 7 puntos, suma 1 punto a su marcador
            setTeam1Points(prevPoints => prevPoints + 1);
          } else if (set.score[1] === 7 || (set.score[1] === 6 && set.score[0] < 6)) {
            // Si el equipo 2 (score[1]) tiene 7 puntos, suma 1 punto a su marcador
            setTeam2Points(prevPoints => prevPoints + 1);
          }
        } else {
          console.log(`Score en Set ${index + 1} NO es un array, es un:`, typeof set.score);
        }
      });

      // Extraer los puntajes de cada set y almacenarlos en un array
      const extractedScores = puntaje.map(set => set.score);
      setScores(extractedScores); // Almacenar los puntajes en el estado

      // Mostrar el primer puntaje en una alerta (puedes modificarlo si es necesario)
      Alert.alert("Primer puntaje", JSON.stringify(puntaje[0].score));
    }
  }, [puntaje]);

  // Función para calcular el Elo (ya presente en tu código)
  const calculateElo = (Ra, Rb, Sa, Sb, Ka, Kb) => {
    const Ea = 1 / (1 + Math.pow(10, (Rb - Ra) / 400));
    const Eb = 1 / (1 + Math.pow(10, (Ra - Rb) / 400));

    const newRa = Ra + Ka * (Sa - Ea);
    const newRb = Rb + Kb * (Sb - Eb);

    return { newRa, newRb };
  };

  // Función para obtener el factor K (ya presente en tu código)
  const getKFactor = (playerRating, matchesPlayed) => {
    if (matchesPlayed < 30 || playerRating < 2300) {
      return 40;
    } else if (playerRating >= 2400) {
      return 10;
    } else {
      return 20;
    }
  };

  // Función para calcular los rankings del equipo (ya presente en tu código)
  const calculateTeamRankings = () => {
    const Ra = teamA.player1.rating + teamA.player2.rating;
    const Rb = teamB.player1.rating + teamB.player2.rating;

    const Ka = (getKFactor(teamA.player1.rating, teamA.player1.matches) + getKFactor(teamA.player2.rating, teamA.player2.matches)) / 2;
    const Kb = (getKFactor(teamB.player1.rating, teamB.player2.matches) + getKFactor(teamB.player2.rating, teamB.player2.matches)) / 2;

    const { Sa, Sb } = resultado;
    const { newRa, newRb } = calculateElo(Ra, Rb, Sa, Sb, Ka, Kb);

    const updatedTeamAPlayer1 = newRa / 2;
    const updatedTeamAPlayer2 = newRa / 2;
    const updatedTeamBPlayer1 = newRb / 2;
    const updatedTeamBPlayer2 = newRb / 2;
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

        {/* Mostrar los sets recibidos y sus puntajes */}
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

        {/* Mostrar los puntajes extraídos y almacenados en `scores` */}
        <View style={styles.extractedScoresWrapper}>
          <Text style={styles.extractedScoresTitle}>Puntajes almacenados:</Text>
          {scores.map((score, index) => (
            <Text key={index} style={styles.extractedScoreText}>{`Set ${index + 1}: ${score[0]} - ${score[1]}`}</Text>
          ))}
        </View>
        <View style={styles.teamPointsWrapper}>
          <Text style={styles.teamPointsTitle}>Puntos acumulados:</Text>
          <Text style={styles.teamPointsText}>{`Equipo 1: ${team1Points} puntos`}</Text>
          <Text style={styles.teamPointsText}>{`Equipo 2: ${team2Points} puntos`}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EBEBEB"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#EBEBEB"
  },
  scoreWrapper: {
    borderRadius: 15,
    width: '80%',
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
  extractedScoresWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  extractedScoresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  extractedScoreText: {
    fontSize: 18,
    marginTop: 5,
  },
  backButton: {
    width: 30,
    height: 30,
    marginRight: '80%',
    marginTop: 10,
    zIndex: 1,
  },
});

export default FinalJugar;



