import axios from "axios";
const baseURL = "http://localhost:3005/"

 const apiManager = async  (method, headers, data, path) => {
    console.log(headers);
    try {
        const result = await axios({
          method: method,
          url: baseURL+path,
          data: data,
          headers: headers,
        });
        console.log(result);
        return result;
      } catch (error) {
        throw new Error(`Error en la solicitud POST a ${path}: Error`);
      }
}


export default apiManager