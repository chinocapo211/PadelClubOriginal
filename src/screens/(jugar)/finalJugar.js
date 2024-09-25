import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import NavbarHigh from '../../components/navbarHigh';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import PartidoPendienteApi from '../../api/PartidoPendienteApi';
import userApi from '../../api/userApi';
import NotificacionesApi from '../../api/NotificacionesApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FinalJugar = ({ route }) => {
  const navigation = useNavigation();
  const { puntaje } = route.params || {};
  const [scores, setScores] = useState([]); // Estado para almacenar los puntajes
  const [team1Points, setTeam1Points] = useState(0); // Estado para puntos del equipo 1
  const [team2Points, setTeam2Points] = useState(0);
  const [matchSummary, setMatchSummary] = useState({});

  useEffect(() => {
    const getIdGrupo = async () => {
      const storedIdGrupo1 = await AsyncStorage.getItem('@GrupoId1');
      const storedIdGrupo2 = await AsyncStorage.getItem('@GrupoId2');
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

        const extractedScores = puntaje.map(set => set.score);
        setScores(extractedScores);
      
        const idDelGrupo = await getIdGrupo();
        if (idDelGrupo === null) {
          Alert.alert("Error", "No se pudo obtener el ID del grupo.");
          return;
        } else {
          

        }

        let team1Score = 0;
        let team2Score = 0;

        const summary = {
          idGrupo: idDelGrupo,
          set1: '',
          set2: '',
          set3: '',
          fecha: new Date(), 
          puntajeEquipo1: 0,
          puntajeEquipo2: 0,
          confirmacion: false,
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
            if (set.score[0] === 7 || (set.score[0] === 6 && set.score[1] < 6)) {
              setTeam1Points(prevPoints => prevPoints + 1);
            } else if (set.score[1] === 7 || (set.score[1] === 6 && set.score[0] < 6)) {
              setTeam2Points(prevPoints => prevPoints + 1);
            }
            summary[`set${index + 1}`] = `${scoreArray[0]} - ${scoreArray[1]}`;
          } else {
            console.log(`Score en Set ${index + 1} no es válido o no tiene un formato esperado.`);
          }
        });
        console.log(team1Score);
        console.log(team2Score);
        summary.puntajeEquipo1 = team1Score;
        summary.puntajeEquipo2 = team2Score;

        setMatchSummary(summary);

        Alert.alert("Primer puntaje", team1Points);
      }
    };

    processPuntaje();
  }, [puntaje]);

  const submitResults = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@AccessToken');
      const storedIdGrupo1 = await AsyncStorage.getItem('@GrupoId1');
      const idEquipo1 = parseInt(storedIdGrupo1,10);
      const idEquipo2 =parseInt(storedIdGrupo1,10);
      console.log("Valor idEquipo2" +idEquipo2);
      
      const summaryToSend = {
        ...matchSummary,
        puntajeEquipo1: team1Points,
        puntajeEquipo2: team2Points,
        fecha: matchSummary.fecha.toISOString() 
      };

      console.log("Summary to send"+ JSON.stringify(summaryToSend));

      const response = await PartidoPendienteApi.create_Partido(storedToken, summaryToSend);

    

      const jugadores = await PartidoPendienteApi.getJugadoresEquipo1y2(storedToken,idEquipo1,idEquipo2)
      const Notificacion = await NotificacionesApi.CrearNoti(storedToken,"Confirmar_Resultado_Partido",jugadores.data.jugadores[0].id, jugadores.data.jugadores[2].id, response.data.partido.idGrupo);
      console.log(matchSummary.puntajeEquipo1)


   //   if(Notificacion == true){
    //    if (summaryToSend.puntajeEquipo1 === 2) {
      //    console.log("entre a actualizar jugador");
      //    console.log("Valor jugador iD" + jugadores.data.jugadores[0].id);
        //  await userApi.actualizarJugador(storedToken, jugadores.data.jugadores[0].id, 100);
       //   await userApi.actualizarJugador(storedToken, jugadores.data.jugadores[3].id, 100);
// } else {
       //   await userApi.actualizarJugador(storedToken, jugadores.data.jugadores[0].id, -100);
//await userApi.actualizarJugador(storedToken, jugadores.data.jugadores[3].id, -100);
      //  }
    
       // if (summaryToSend.puntajeEquipo2 === 2) {
//await userApi.actualizarJugador(storedToken, jugadores.data.jugadores[1].id, 100);
      //    await userApi.actualizarJugador(storedToken, jugadores.data.jugadores[2].id, 100);
      //  } else {
//await userApi.actualizarJugador(storedToken, jugadores.data.jugadores[1].id, -100);
      //    await userApi.actualizarJugador(storedToken, jugadores.data.jugadores[2].id, -100);
      //  }
     // }
    //  else
    //  {
    //    return;
    //  }
      
      
      
      
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
        </View>
        <Text style={styles.matchSummaryTitle}>Resumen del Partido:</Text>
          <Text>{`Fecha: ${matchSummary.fecha ? matchSummary.fecha.toLocaleDateString() : ''}`}</Text>
          <Text>{`Set 1: ${matchSummary.set1}`}</Text>
          <Text>{`Set 2: ${matchSummary.set2}`}</Text>
          <Text>{`Set 3: ${matchSummary.set3}`}</Text>
          <Text>{`Equipo 1: ${team1Points} puntos`}</Text>
          <Text>{`Equipo 2: ${team2Points} puntos`}</Text>
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
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchSummaryWrapper: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  matchSummaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
    marginTop: '30%',
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
  winnerTeam: {
    fontSize: 24,
    marginTop: '10%'
  },
});

export default FinalJugar;