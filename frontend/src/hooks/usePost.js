import React, {useState} from "react";
import axios from 'axios'
import { useGetUrl } from "./useGetUrl";


export function usePost(url){
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const { apiUrl } = useGetUrl();

    async function postData(data, headers = {}){
        try{
            setLoading(true)
            setError(null)
            setSuccess(null)
            const response = await axios.post(apiUrl+url, data, headers)
           
            
            setData(response.data.data)

            setSuccess(true)

        }catch(err){
            setError(err.response?.data?.message || 'Erreur! Veuillez reessayez')
        }finally{
            setLoading(false)
        }
    }

    function reset(){
        setSuccess(null)
        setError(null)
    }

    return {loading, success, error, data, postData, reset}
}