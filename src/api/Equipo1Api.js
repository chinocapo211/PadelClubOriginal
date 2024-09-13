import apiManager from './apiManger';
import userApi from './userApi';


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
        const response = await apiManager("GET", headers, {},`Equipo1/${parseInt(storedIdGrupo, 10)}` )
        return response;
      }
      catch(error)
      {
        console.error('Error en la solicitud:', error);
        return { error: error.message };
      }
};


const UpdateGrupo = async (token, idEquipo1, grupoResponse) => {
  const Token = await userApi.ObtenerInfoJugador(token);
  console.log(Token);

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "ngrok-skip-browser-warning": true, 
  };

  const dataToSend = {
    id2: grupoResponse.data.grupo.id2,
  };

  try {
    const result = await apiManager("PATCH", headers, dataToSend, `Equipo1/${parseInt(idEquipo1, 10)}`);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};



export default { ObtenerInfoGrupo,UpdateGrupo}