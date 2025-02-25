import axios from 'axios';
import { useMemo } from 'react';
import { logout } from './auth';
import { useStore } from '@/store';
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
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const response = await axios.post<{
                            data: {
                                access_token: string;
                            }
                        }>(`${API}/auth/spa-refresh`, {}, {
                            withCredentials: true
                        });

                        if (response.status === 200 || response.status === 201) {
                            const { access_token } = response.data.data;
                            setAccessToken(access_token);
                            instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                            return instance(originalRequest);
                        }
                    } catch (refreshError) {
                        await logout();
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

