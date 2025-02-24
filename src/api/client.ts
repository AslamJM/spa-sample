import axios from 'axios';
import { useStore } from '../store'; // Adjust the import according to your store file location
import { useMemo } from 'react';

const API = 'http://localhost:3500/sapi';

const useAxios = () => {

    const accessToken = useStore((state) => state.token);
    const setAccessToken = useStore((state) => state.setToken);



    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: API,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Include cookies in requests
        });

        instance.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const response = await axios.post<{ data: { access_token: string } }>
                            (`${API}/auth/spa-refresh`, {}, { withCredentials: true });
                        if (response.status === 201) {
                            setAccessToken(response.data.data.access_token);
                            instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.access_token}`;
                            return instance(originalRequest);
                        }
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return instance;
    }, [accessToken, setAccessToken]);

    return axiosInstance;
};

export default useAxios;

