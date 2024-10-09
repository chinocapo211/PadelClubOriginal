import apiManager from './apiManger';
import userApi from './userApi';

export const MsjNotiApi = async (token) => {
  const Token = await userApi.ObtenerInfoJugador(token);
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  
    "ngrok-skip-browser-warning": true, 
  };
  try {
    const result = await apiManager("GET", headers, {}, `Msjnoti`);
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};

export const ObtenerMensajePorTipo= async(token,tipo) =>{
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  
    "ngrok-skip-browser-warning": true, 
  };
  try {
    const result = await apiManager("GET", headers, {}, `Msjnoti/${tipo}`);
    console.log( "tipo obtenido" + result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};
export default {MsjNotiApi,ObtenerMensajePorTipo}