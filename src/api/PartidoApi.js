import apiManager from './apiManger';
import userApi from './userApi';
const create_Partido = async (token, data) => {
  let Token;

  try {
    Token = await userApi.ObtenerInfoJugador(token);
    console.log(`ID de Usuario antes de enviar: ${Token.Usuario.id} (Tipo: ${typeof Token.Usuario.id})`);
  } catch (error) {
    console.error('Error al obtener información del jugador:', error);
    return; 
  }

  console.log('Datos recibidos:',  typeof(data.fecha)); 

  
  if (typeof data.fecha === 'string') {
    data.fecha = new Date(); 
  }


  if (!(data.fecha instanceof Date) || isNaN(data.fecha.getTime())) {
    console.error('La fecha no es un objeto Date válido:', data.fecha);
    return; // Salir si la fecha no es válida
  }
console.log( "tipo de dato despues de la conversion" + typeof(data.fecha))

  const dato = JSON.stringify(data, null, 2)

  console.log("Data crear partido:", dato); 
  console.log(Token);

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "ngrok-skip-browser-warning": true,
  };

  try {
    const result = await apiManager("POST", headers, dato, `Partido`);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};

const getJugadoresEquipo1y2 = async(token,idEquipo1,idEquipo2) =>
{
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "ngrok-skip-browser-warning": true,
  };
  const data = {}
  try {
    const result = await apiManager("GET", headers, data, `Partido/${idEquipo1}/${idEquipo2}`);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
}



export default {create_Partido,getJugadoresEquipo1y2}