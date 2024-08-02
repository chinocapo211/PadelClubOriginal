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
  try {
    const result = await apiManager('GET', token, {}, 'auth/Decode');
    console.log('User info response:', result);
    return result;
  } catch (error) {
    console.error('Error en ObtenerInfoJugador:', error);
    return { error: error.message };
  }
};

export default { user_login, ObtenerInfoJugador };