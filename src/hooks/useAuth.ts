import { login, logout } from "@/api/auth";
import useAxios from "../api/client";
import { User, useStore } from "../store";

export const useAuth = () => {

    const accessToken = useStore((state) => state.token);
    const setAccessToken = useStore((state) => state.setToken);
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);


    const client = useAxios()

    const loginUser = async (email: string, password: string) => {
        try {
            const { token, user } = await login({ email, password })
            setAccessToken(token)
            setUser(user)
            return true
        } catch (error) {
            console.error('Login failed:', error)
            return false
        }
    }

    const initiateUser = async () => {
        const { data } = await client.get<{ data: User }>('/auth/profile');

        if (data.data) {
            setUser(data.data)
            return data.data
        } else {
            setUser(null)
            return null
        }
    }

    const logoutUser = async () => {
        const res = await logout()

        if (res.success) {
            setAccessToken(null)
            setUser(null)
        }
    }

    return { accessToken, setAccessToken, user, setUser, initiateUser, loginUser, logoutUser }
}