import axios from "axios";

export async function login({ email, password }: { email: string, password: string }) {
    const { data } = await axios.post<{ data: { token: string } }>
        ('http://localhost:3500/sapi/auth/spa-login', { email, password }, { withCredentials: true });

    return data.data.token;
}

export async function logout() {
    const res = await axios.post<{
        data: {
            success: true
        }
    }>('http://localhost:3500/sapi/auth/logout', {}, { withCredentials: true });

    return res.data.data
}