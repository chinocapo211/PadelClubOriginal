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
  console.log('Token:', token);
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  // Asegúrate de enviar el token en el encabezado Authorization
  };
  const data = {};  // Si no necesitas enviar datos en el cuerpo de la solicitud, puedes dejarlo vacío.
  const path = "auth/Decode";  // Asegúrate de que esta ruta es correcta y está disponible en el servidor.
  
  try {
    const result = await apiManager(method, headers, data, path);
    console.log('User info response:', result.data);  // Cambia result a result.data para acceder a los datos de la respuesta
    return result.data;
  } catch (error) {
    console.error('Error en ObtenerInfoJugador:', error.message);
    return { error: error.message };
  }
};

export default { user_login, ObtenerInfoJugador };