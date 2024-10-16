import apiManager from './apiManger';
import userApi from './userApi';
import MsjNotiApi from './MsjNotiApi';

const NotificacionesApi = async (token) => {
  const Token = await userApi.ObtenerInfoJugador(token);
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  
    "ngrok-skip-browser-warning": true, 
  };

  console.log("ID del usuario" + Token.Usuario.id)
  try {
    const result = await apiManager("GET", headers, {}, `Notificaciones/${Token.Usuario.id}`);
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }  
};

const CrearNoti = async (token,tipo,ide,idr,idgrupo) =>
{
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  
    "ngrok-skip-browser-warning": true, 
  };
console.log("Tipo " + tipo );
  const msj = await MsjNotiApi.ObtenerMensajePorTipo(token,tipo);
console.log("Mensaje" + JSON.stringify(msj.data.msj));
  const data = {
    Mensaje: msj.data.msj,
    idE: ide,
    idR: idr,
    Tipo: tipo,
    idGrupo:idgrupo,
  }
  try {
    const result = await apiManager("POST", headers,data,`Notificaciones`);
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }  
}

const getInfoNotificacionById = async (token, id) =>
{
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  
    "ngrok-skip-browser-warning": true, 
  };
  const data = {}
  try {
    const result = await apiManager("GET", headers,data,`Notificaciones/infoNotificacion/${id}`);
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }  
}





export default { NotificacionesApi, CrearNoti, getInfoNotificacionById }