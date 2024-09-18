import apiManager from './apiManger';
import userApi from './userApi';

 const create_Partido = async (token,idGrupo) => {
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
    const result = await apiManager("POST", headers, data , `Partido/${Token.Usuario.id}`);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};




s
export default {create_Partido }