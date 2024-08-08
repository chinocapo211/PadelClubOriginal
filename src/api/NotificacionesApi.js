import apiManager from './apiManger';
import userApi from './userApi';

export const NotificacionesApi = async (token) => {
  const Token = await userApi.ObtenerInfoJugador(token);
  try {
    const result = await apiManager("GET", token, {}, `Notificaciones/:${Token.Usuario.id}`);
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};

export default NotificacionesApi