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
        const response = await apiManager("GET", headers, {},`Equipo2/${parseInt(storedIdGrupo, 10)}` )
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

  const dataToSend = {
    id3: grupoResponse.data.grupo.id3,
    id4: grupoResponse.data.grupo.id4,
  };

  try {
    const result = await apiManager("PATCH", headers, dataToSend, `Equipo2/${parseInt(idGrupo, 10)}`);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};



export default { ObtenerInfoGrupo,UpdateGrupo}