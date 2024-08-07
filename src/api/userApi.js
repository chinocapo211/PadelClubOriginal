import apiManager from "./apiManger";

const user_login = async (data) => {
  try {
    const result = await apiManager('POST', null, data, 'auth/login');
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};

const ObtenerInfoJugador = async (token) => {
  console.log(token);
  const method = "POST";
    const headers = {
      "Content-Type": "application/json",  // Asegúrate de incluir cualquier otro encabezado necesario
    };const data = {};  // Sustituye esto por los datos que necesites enviar
    const path = "auth/Decode";
  try {
    
    const response = await apiManager(method, headers, data, path, token);
    console.log('User info response:', result);
    return result;
  } catch (error) {
    console.error('Error en ObtenerInfoJugador:', error);
    return { error: error.message };
  }
};

export default { user_login, ObtenerInfoJugador };