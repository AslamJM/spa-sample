import { useQuery } from "@tanstack/react-query"
import useAxios from "../api/client"

type Organization = {
    role_levels: {
        id: number;
        organization_id: string;
        level: number;
    }[];
} & {
    id: string;
    name: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
}

export type Role = {
    id: number
    name: string
    can_create: boolean
    can_read: boolean
    can_update: boolean
    can_delete: boolean
}

export type RoleLevel = {
    id: number;
    level: number;
    roles: Role[]
}

export type SingleOrg = {
    id: string;
    name: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
    role_levels: RoleLevel[]
}

export const useOrgs = () => {

    const client = useAxios()

    const queryFn = async () => {
        const { data } = await client.get<{ data: Organization[] }>("/organizations")
        return data.data
    }

    const { data, isLoading } = useQuery({
        queryKey: ["org"],
        queryFn
    })

    return { data, isLoading }
}

export const useSingleOrg = (id: string) => {
    const client = useAxios()

    const queryFn = async () => {
        const { data } = await client.get<{ data: SingleOrg }>("/organizations/" + id)
        return data.data
    }

    const { data, isLoading } = useQuery({
        queryKey: ["org", id],
        queryFn
    })

    return { data, isLoading }
}