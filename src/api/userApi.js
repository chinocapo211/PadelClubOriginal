import apiManager from "./apiManger";
import AsyncStorage from "@react-native-async-storage/async-storage";
const user_login = async (data) => {
  const headers = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,  
  };
  try {
    console.log(data)

    const result = await apiManager('POST', headers, data, 'auth/login');
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};

const ObtenerInfoJugador = async (token) => {
  console.log('Token:', token);
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "ngrok-skip-browser-warning": true,  
  };
  const data = {};  
  const path = "auth/Decode";  
  
  try {
    const result = await apiManager(method, headers, data, path);
    console.log('User info response:', result.data);  
    return result.data;
  } catch (error) {
    console.error('Error en ObtenerInfoJugador:', error.message);
    await AsyncStorage.removeItem('@AccessToken');
    return { error: error.message };
  }
};


const ObtenerJugadores = async(token) =>
{
  console.log('Token:', token);
  const method = "GET";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  
    "ngrok-skip-browser-warning": true, 
  };
  const data = {};
  const path = "Jugador";
  try {
    const result = await apiManager(method, headers, data, path);
    console.log('User info response:', result.data);  
    return result.data;
  } catch (error) {
    console.error('Error en ObtenerInfoJugador:', error.message);
    await AsyncStorage.removeItem('@AccessToken');
    return { error: error.message };
  }
};
const actualizarJugador = async(token,idJugador,data) =>
  {
    const method = "PATCH";
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,  
      "ngrok-skip-browser-warning": true, 
    };
    try {
      const result = await apiManager(method, headers, data, `Jugador/${idJugador}`);
      console.log('User info response:', result.data);  
      return result.data;
    } catch (error) {
      console.error('Error en ObtenerInfoJugador:', error.message);
      await AsyncStorage.removeItem('@AccessToken');
      return { error: error.message };
    }
  };

export default { user_login, ObtenerInfoJugador, ObtenerJugadores, actualizarJugador};