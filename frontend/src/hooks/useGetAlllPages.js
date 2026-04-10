import { useState, useCallback } from "react";
import axios from "axios";  // ✅ Import manquant
import { getToken } from '../services/AuthStorage';
import { useGetUrl } from '../hooks/useGetUrl';

export function useGetAllPage(url) {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const { apiUrl } = useGetUrl();

    const getAllData = useCallback(async (pageNum = 1, reset = false) => {
        
        if (loading && !reset) return;

        try {
            setLoading(true);
            const token = await getToken();
            if (!token) return;

            const separator = url.includes('?') ? '&' : '?';
            const response = await axios.get(
                `${apiUrl}${url}${separator}page=${pageNum}&limit=10`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );

            const newData = response.data.data || {};

            if (reset) {
                setAllData(newData);
                setPage(1);
            } else {
               
                setAllData(prev => {
                   
                    if (typeof newData === 'object' && !Array.isArray(newData)) {
                        const result = { ...prev };
                        for (const key in newData) {
                            if (Array.isArray(newData[key]) && Array.isArray(prev[key])) {
                                result[key] = [...prev[key], ...newData[key]];
                            } else {
                                result[key] = newData[key];
                            }
                        }
                        return result;
                    }
                    
                    return [...prev, ...newData];
                });
            }

            
            const dataArray = newData.specialites || newData.medecins || newData;
            setHasMore(Array.isArray(dataArray) && dataArray.length === 10);

        } catch (err) {
            console.log('Erreur chargement:', err);
        } finally {
            setLoading(false);
        }
    }, [apiUrl, url, loading]);

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            getAllData(nextPage, false);
        }
    }, [page, loading, hasMore, getAllData]);

    const refresh = useCallback(() => {
        setPage(1);
        setHasMore(true);
        getAllData(1, true);
    }, [getAllData]);

    return { 
        allData, 
        hasMore, 
        loading, 
        loadMore, 
        refresh,     
        page 
    };
}