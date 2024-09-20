import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import PartidoApi from '../../api/PartidoApi';
import userApi from '../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FinalJugar = ({ route }) => {
  const navigation = useNavigation();
  const { puntaje } = route.params || {};

  const [matchSummary, setMatchSummary] = useState({});

  useEffect(() => {
    const getIdGrupo = async () => {
      const storedIdGrupo1 = await AsyncStorage.getItem('@GrupoId1');
      const idGrupoNumber = parseInt(storedIdGrupo1, 10);
      if (isNaN(idGrupoNumber)) {
        console.log('Error: idGrupo no es un número válido');
        return null;
      }
      return idGrupoNumber;
    };

    const processPuntaje = async () => {
      if (puntaje) {
        console.log("Valor de puntaje recibido:", puntaje);

<<<<<<< HEAD
      
        const idDelGrupo = await getIdGrupo();
        if (idDelGrupo === null) {
          Alert.alert("Error", "No se pudo obtener el ID del grupo.");
          return;
=======
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
>>>>>>> f989ec2c4ed89b88ce6398e7dfb79eca744868eb
        }

        let team1Score = 0;
        let team2Score = 0;

        const summary = {
          idGrupo: idDelGrupo,
          set1: '',
          set2: '',
          set3: '',
          fecha: new Date(), // Almacenar como objeto Date
          puntajeEquipo1: 0,
          puntajeEquipo2: 0
        };

        puntaje.forEach((set, index) => {
          let scoreArray;

          if (typeof set.score === 'string') {
            scoreArray = set.score.split('-').map(num => parseInt(num.trim(), 10));
            console.log(`Score en Set ${index + 1} convertido de string a array:`, scoreArray);
          } else if (Array.isArray(set.score)) {
            scoreArray = set.score.map(num => parseInt(num, 10));
            console.log(`Score en Set ${index + 1} es un array:`, scoreArray);
          }

          if (scoreArray) {
            if (scoreArray[0] === 7) {
              team1Score++;
            } else if (scoreArray[1] === 7) {
              team2Score++;
            }
            summary[`set${index + 1}`] = `${scoreArray[0]} - ${scoreArray[1]}`;
          } else {
            console.log(`Score en Set ${index + 1} no es válido o no tiene un formato esperado.`);
          }
        });

        summary.puntajeEquipo1 = team1Score;
        summary.puntajeEquipo2 = team2Score;

        setMatchSummary(summary);

        Alert.alert("Primer puntaje", JSON.stringify(summary.set1));
      }
    };

    processPuntaje();
  }, [puntaje]);

  const submitResults = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@AccessToken');
      const storedIdGrupo1 = await AsyncStorage.getItem('@GrupoId1');
      const storedIdGrupo2 = await AsyncStorage.getItem('@GrupoId2');
      const summaryToSend = {
        ...matchSummary,
        fecha: matchSummary.fecha.toISOString() 
      };

      const response = await PartidoApi.create_Partido(storedToken, summaryToSend);
      const jugadores = await PartidoApi.getJugadoresEquipo1y2(storedToken,parseInt(storedIdGrupo1,10),parseInt(storedIdGrupo2,10));
      


      console.log(jugadores);

      
      Alert.alert("Resultado del partido enviado con éxito", `Respuesta: ${JSON.stringify(response)}`);
      
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al enviar los resultados del partido.");
    }
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
<<<<<<< HEAD

        <View style={styles.scoreWrapper}>
          {puntaje.map((set, index) => (
            <View key={index} style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{`Set ${index + 1}`}</Text>
              <Text style={styles.scoreText}>
                {typeof set.score === 'string' ? set.score : `${set.score[0]} - ${set.score[1]}`}
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CargarPuntos', { index })}>
                <Text style={styles.buttonText}>Cargar puntos</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.matchSummaryWrapper}>
          <Text style={styles.matchSummaryTitle}>Resumen del Partido:</Text>
          <Text>{`Fecha: ${matchSummary.fecha ? matchSummary.fecha.toLocaleDateString() : ''}`}</Text>
          <Text>{`Set 1: ${matchSummary.set1}`}</Text>
          <Text>{`Set 2: ${matchSummary.set2}`}</Text>
          <Text>{`Set 3: ${matchSummary.set3}`}</Text>
          <Text>{`Equipo 1: ${matchSummary.puntajeEquipo1} puntos`}</Text>
          <Text>{`Equipo 2: ${matchSummary.puntajeEquipo2} puntos`}</Text>
=======
        <View style={styles.extractedScoresWrapper}>
          <Text style={styles.extractedScoresTitle}>Resultados del Partido:</Text>
          {scores.map((score, index) => (
            <Text key={index} style={styles.extractedScoreText}>{`Set ${index + 1}: ${score[0]} - ${score[1]}`}</Text>
          ))}
        </View>
        <View style={styles.winnerTeam}>
        {(team1Points > team2Points) && (
          <Text>Gano el Equipo 1, se espera confirmacion</Text>
        )}
          {(team2Points > team1Points) && (
          <Text>Gano el Equipo 2, se espera confirmacion</Text>
        )}
>>>>>>> f989ec2c4ed89b88ce6398e7dfb79eca744868eb
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={submitResults}>
          <Text style={styles.submitButtonText}>Enviar Resultados</Text>
        </TouchableOpacity>
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
<<<<<<< HEAD
  matchSummaryWrapper: {
    marginTop: 20,
=======
  extractedScoresWrapper: {
    marginTop: '30%',
>>>>>>> f989ec2c4ed89b88ce6398e7dfb79eca744868eb
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '5%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  matchSummaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    width: 30,
    height: 30,
    marginRight: '80%',
    marginTop: 10,
    zIndex: 1,
  },
<<<<<<< HEAD
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
=======
  winnerTeam: {
    fontSize: 24,
    marginTop: '10%'
>>>>>>> f989ec2c4ed89b88ce6398e7dfb79eca744868eb
  },
});

export default FinalJugar;


