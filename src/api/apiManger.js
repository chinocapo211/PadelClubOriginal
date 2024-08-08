import axios from "axios";

const baseURL = "http://localhost:3005/";

const apiManager = async (method, headers, data, path) => {
  console.log('Headers:', headers);  // Verifica que los encabezados sean correctos
  try {
    const response = await axios({
      method: method,
      url: baseURL + path,
      data: data,
      headers: headers,
    });
    console.log('Response:', response);  // Verifica la respuesta completa
    return response;  // Devuelve la respuesta completa
  } catch (error) {
    console.error(`Error en la solicitud POST a ${path}: ${error.message}`);
    throw new Error(`Error en la solicitud POST a ${path}: ${error.message}`);
  }
};

export default apiManager;