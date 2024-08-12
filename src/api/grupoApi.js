import apiManager from './apiManger';
import userApi from './userApi';

export const grupoApi = async (token) => {
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
    const result = await apiManager("GET", headers, data , "GrupoXJugador");
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};

export default grupoApi