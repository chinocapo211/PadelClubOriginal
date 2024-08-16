import apiManager from './apiManger';
import userApi from './userApi';

 const grupoApi = async (token) => {
  const Token = await userApi.ObtenerInfoJugador(token);
  console.log(Token);
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  
    "ngrok-skip-browser-warning": true, 
  };
  const data = 
  {
    id1: Token.Usuario.id,
    id2: 0,
    id3: 0,
    id4: 0
  }
  try {
    const result = await apiManager("POST", headers, data , "GrupoXJugador");
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


const UpdateGrupo = async (token, idGrupo, grupoResponse) => {
  const Token = await userApi.ObtenerInfoJugador(token);
  console.log(Token);

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "ngrok-skip-browser-warning": true, 
  };

  // Asegúrate de que `grupoResponse` contenga solo los campos necesarios.
  const dataToSend = {
    id2: grupoResponse.data.grupo.id2,
    id3: grupoResponse.data.grupo.id3,
    id4: grupoResponse.data.grupo.id4,
  };

  try {
    const result = await apiManager("PATCH", headers, dataToSend, `GrupoXJugador/${parseInt(idGrupo, 10)}`);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};



export default {grupoApi, ObtenerInfoGrupo,UpdateGrupo}