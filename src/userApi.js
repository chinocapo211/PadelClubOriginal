import { resolveHref } from "expo-router/build/link/href";
import {apiPost} from '../src/apiManger'

export const user_login = async (data) =>
{
    let result = {}
    console.log(data);
    try
    {
        result = await apiPost({
            method: "POST",
            url: "auth/login",
            data: data
        })
        console.log(result);
        

    }
    catch(error)
    {
        console.log(error)
    }
    return result;
}

export default user_login