import useAxios from "@/api/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import { useParams } from "@tanstack/react-router"

export type FeedBackForm = {
    id: string
    name: string
    description: string
    created_at: Date
}

export type Reaction = {
    points: number
    comments: string
    created_at: Date
    name: string
    phone: string
    address: string
}

export type SingleFeedback = {
    id: string
    name: string
    description: string
    created_at: Date
    responses: Reaction[]
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

export const useMyFeedbacks = () => {
    const { user } = useAuth()
    const client = useAxios()

    const getAllFeedback = async () => {
        const { data } = await client.get<{ data: FeedBackForm[] }>(`forms/me`)
        return data.data
    }

    const queryClient = useQueryClient()

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['my_feedbacks', user],
        queryFn: getAllFeedback
    })

    const addData = (data: FeedBackForm) => {
        queryClient.setQueryData(['my_feedbacks', user], (old: FeedBackForm[]) => [...old, data])
    }

    return { data, isLoading, refetch, addData }
}

export const useCreateFeedbackForm = () => {
    const client = useAxios()
    const { addData } = useMyFeedbacks()

    const createFeedback = async (input: { name: string, description: string }) => {
        const { data } = await client.post<{ data: FeedBackForm }>(`forms`, input)
        return data.data
    }

    const { mutate, isPending } = useMutation({
        mutationFn: createFeedback,
        onSuccess: (data) => {
            addData(data)
        }
    })

    return { mutate, isPending }
}

export const useMySingleFeedback = () => {
    const client = useAxios()
    const { id } = useParams({ from: '/_auth/forms/$id/' })
    const getFeedback = async () => {
        const { data } = await client.get<{ data: SingleFeedback }>(`forms/me/form/${id}`)
        return data.data
    }

    const { data, isLoading } = useQuery({
        queryKey: ['my_single_feedback', id],
        queryFn: getFeedback
    })

    return { data, isLoading }
}