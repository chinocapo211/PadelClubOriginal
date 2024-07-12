import apiPost from './apiManger';

export const user_login = async (data) => {
  try {
    const result = await apiPost("POST", {}, data, "auth/login");
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { error: error.message };
  }
};

export default user_login