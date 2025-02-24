import useAxios from "../api/client";
import { User, useStore } from "../store";

export const useAuth = () => {

    const accessToken = useStore((state) => state.token);
    const setAccessToken = useStore((state) => state.setToken);
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);


    const client = useAxios()

    const initiateUser = async () => {
        const { data } = await client.get<{ data: User }>('/auth/profile');

        if (data.data) {
            setUser(data.data)
        } else {
            setUser(null)
        }
    }

    return { accessToken, setAccessToken, user, setUser, initiateUser }
}