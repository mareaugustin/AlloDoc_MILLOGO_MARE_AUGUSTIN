import React, {useState} from "react";
import axios from 'axios'
import {useGetUrl} from '../hooks/useGetUrl'
import { getToken } from "../services/AuthStorage";


export function useDelete(url){
    
    const { apiUrl } = useGetUrl()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    async function deleteData(){
        try{
            setLoading(true)
            setError(null)
            setSuccess(null)


            const token = await getToken()
            if(!token) return

            const response = await axios.delete(apiUrl+url, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            setSuccess(true)
        }catch(err){
            setError(err.response?.data?.message || 'Errreur lors de la suppression')
        }finally{
            setLoading(false)
        }
    }

    function reset(){
        setSuccess(null)
        setError(null)
    }

    return {loading, success, error, reset, deleteData}
}