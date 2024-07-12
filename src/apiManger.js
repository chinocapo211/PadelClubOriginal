import axios from "axios";
const baseURL = "http://localhost:3005/"

 const apiPost = async  (method, headers, data, path) => {
    result = axios.post({
        method: method,
        url: `${baseURL}${path}`,
        data: data,
        headers: headers
    })
    return result;
}
export default {apiPost}