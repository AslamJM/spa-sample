import useAxios from "@/api/client"
import { useQuery } from "@tanstack/react-query"

export type FeedBackForm = {
    id: string
    name: string
    description: string
    created_at: Date
}

export const useUsersForm = ({ user, org }: { user: string, org: string }) => {

    const client = useAxios()

    const getAllFeedback = async () => {
        const { data } = await client.get<{ data: FeedBackForm[] }>(`forms/${org}/user/${user}`)
        return data.data
    }

    const { data, isLoading } = useQuery({
        queryKey: ['user_forms', org, user],
        queryFn: getAllFeedback
    })

    return { data, isLoading }
}