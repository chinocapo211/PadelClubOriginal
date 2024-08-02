import apiManager from './apiManger';

export const Notificaciones = async (data,Token) => {
  try {
    const result = await apiManager("GET", Token, data, "Notificaciones");
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};

export default user_login