import axios from "axios";
const baseURL = "http://localhost:3005/"

 const apiPost = async  (method, headers, data, path) => {
    
    try {
        const result = await axios({
          method: method,
          url: "http://localhost:3005/auth/login",
          data: data,
          headers: headers,
        });
        console.log(result);
        return result;
      } catch (error) {
        throw new Error(`Error en la solicitud POST a ${path}: Error`);
      }
}
export default apiPost