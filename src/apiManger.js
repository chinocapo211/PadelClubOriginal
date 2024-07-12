import axios from "axios";

const ApiManger = axios.create({
baseURL: "http://localhost:3005",
responseType: 'json',
withCredentials: true,
})

export default ApiManger