import apiManager from './apiManger';
import userApi from './userApi';

 const grupoApi = async (token) => {
  const Token = await userApi.ObtenerInfoJugador(token);
  console.log(`ID de Usuario antes de enviar: ${Token.Usuario.id} (Tipo: ${typeof Token.Usuario.id})`);
  console.log(Token);
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  
    "ngrok-skip-browser-warning": true, 
  };
  const data = {};
  try {
    const result = await apiManager("POST", headers, data , `GrupoXJugador/${Token.Usuario.id}`);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};

const ObtenerInfoGrupo = async(token,storedIdGrupo) =>
{
    const Token = await userApi.ObtenerInfoJugador(token);
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  
        "ngrok-skip-browser-warning": true
        , 
      };
      try
      {
        const response = await apiManager("GET", headers, {},`GrupoXJugador/${parseInt(storedIdGrupo, 10)}` )
        return response;
      }
      catch(error)
      {
        console.error('Error en la solicitud:', error);
        return { error: error.message };
      }
};




export default {grupoApi, ObtenerInfoGrupo}