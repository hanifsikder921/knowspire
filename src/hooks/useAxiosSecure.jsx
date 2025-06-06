import { useEffect } from "react";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

const useAxiosSecure = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        axiosInstance.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
    }, []);

    return axiosInstance;
};

export default useAxiosSecure;
