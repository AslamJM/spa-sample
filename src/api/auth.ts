import { User } from "@/store";
import axios from "axios";

export async function login({ email, password }: { email: string, password: string }) {
    const { data } = await axios.post<{ data: { token: string, user: User } }>
        ('http://localhost:3500/sapi/auth/spa-login', { email, password }, { withCredentials: true });

    const { data: { token, user } } = data

    return { token, user }
}

export async function logout() {
    const res = await axios.post<{
        data: {
            success: true
        }
    }>('http://localhost:3500/sapi/auth/logout', {}, { withCredentials: true });

    return res.data.data
}