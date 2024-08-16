import apiManager from './apiManger';
import userApi from './userApi';

export const NotificacionesApi = async (token) => {
  const Token = await userApi.ObtenerInfoJugador(token);
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  
    "ngrok-skip-browser-warning": 3005, 
  };
  try {
    const result = await apiManager("GET", headers, {}, `Notificaciones/${Token.Usuario.id}`);
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};

export default NotificacionesApi