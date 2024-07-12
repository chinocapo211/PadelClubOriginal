import { resolveHref } from "expo-router/build/link/href";
import ApiManger from "./apiManger";

export const user_login = async data =>
{
    try
    {
        const result = await ApiManger("/Jugador/Login", {
            method: "POST",
            headers:
            {
                'Content-Type': "application/json"
            },
            data: data
        })
        return result;
    }
    catch(error)
    {
        return error.response.data
    }
}

export default user_login