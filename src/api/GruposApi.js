import apiManager from './apiManger';
import userApi from './userApi';

 const grupoApi = async (token) => {
  const Token = await userApi.ObtenerInfoJugador(token);
  console.log(Token);
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  
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
      };
      try
      {
        const response = await apiManager("GET", headers, {},`GrupoXJugador/${storedIdGrupo}` )
        return response;
      }
      catch(error)
      {
        console.error('Error en la solicitud:', error);
        return { error: error.message };
      }
};


const UpdateGrupo = async (token,idGrupo,grupoResponse) => {
  const Token = await userApi.ObtenerInfoJugador(token);
  console.log(Token);
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  
  };

  try {
    const result = await apiManager("POST", headers, grupoResponse , `GrupoXJugador/${idGrupo}`);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};



export default {grupoApi, ObtenerInfoGrupo,UpdateGrupo}