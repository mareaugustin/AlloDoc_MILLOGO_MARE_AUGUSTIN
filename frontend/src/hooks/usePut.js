import React, {useState} from "react";
import axios from 'axios'
import { useGetUrl } from "./useGetUrl";
import { getToken } from "../services/AuthStorage";


export function usePut(url){
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const { apiUrl } = useGetUrl();

    async function putData(data){
        try{
            setLoading(true)
            setError(null)
            setSuccess(null)

            const token = await getToken()
            if(!token) return
            
            const response = await axios.put(apiUrl+url, data, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setData(response.data.data)

            setSuccess(true)

        }catch(err){
            setError(err.response?.data?.message || 'Erreur ! Veuillez réessayer')
        }finally{
            setLoading(false)
        }
    }

    function reset(){
        setSuccess(null)
        setError(null)
    }

    return {loading, success, error, data, reset, putData}
}