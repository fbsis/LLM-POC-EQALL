// src/hooks/useFetchData.ts
import { useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';
import axiosInstance from './axiosInstance';

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

const useFetchData = <T,>(url: string, config?: AxiosRequestConfig): FetchState<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get<T>(url, config);
                setData(response.data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [url, config]);

    return { data, loading, error };
};

export default useFetchData;
