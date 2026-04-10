import React, {useState, useEffect} from "react";
import axios from "axios";
import { useGetUrl } from "./useGetUrl";
import { getToken } from "../services/AuthStorage";

export function useGet(url){
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [data, setData] = useState([])
    const { apiUrl } = useGetUrl();

    
    async function getData(){
        const token = await getToken()
        if( !url || !token ) return;
        try{
            setLoading(true)
            setError(null)

            const response = await axios.get(apiUrl+url, {
                headers:{
                    "Accept" : 'application/json',
                    "Authorization" : `Bearer ${token}`
                }
            })
            setData(response.data.data)

            setSuccess(true)

        }catch(err){
            console.log('Error:', err);
            setError(err.response?.data?.message || 'Erreur de récupération de données')
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getData()
    },[url])

    return {loading, success, error, data, getData}
}