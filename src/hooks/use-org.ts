import { useMutation, useQuery } from "@tanstack/react-query"
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
    users: {
        id: number
        name: string
        email: string
    }[]
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

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["org"],
        queryFn,

    })

    return { data, isLoading, refetch }
}

export const useCreateOrg = () => {
    const client = useAxios()

    const { refetch } = useOrgs()

    const createOrg = async (input: {
        name: string,
        user: {
            name: string,
            email: string,
            password: string
        }
    }) => {
        const res = await client.post("/organizations", input)
        if (res.status === 201) {
            return true
        }
        return false
    }

    const { mutateAsync, isPending } = useMutation({
        mutationFn: createOrg,
        onSuccess: (res) => {
            if (res) {
                refetch()
            }
        }
    })

    return {
        create: mutateAsync,
        loading: isPending
    }
}



export const useSingleOrg = (id: string) => {
    const client = useAxios()

    const queryFn = async () => {
        const { data } = await client.get<{ data: SingleOrg }>("/organizations/" + id)
        return data.data
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["org", id],
        queryFn
    })

    return { data, isLoading, refetch }
}

export const useCreateRoleLevel = (id: string) => {
    const client = useAxios()

    const { refetch } = useSingleOrg(id)

    const createRoleLevel = async (level: number) => {
        const res = await client.post(`/organizations/${id}/role-levels/${level}`)
        if (res.status === 201) {
            return true
        }
        return false
    }

    const { mutate, isPending } = useMutation({
        mutationFn: createRoleLevel,
        onSuccess: (res) => {
            if (res) {
                refetch()
            }
        }
    })

    return {
        create: mutate,
        loading: isPending
    }
}


export const useCreateRole = (id: string) => {
    const client = useAxios()

    const { refetch } = useSingleOrg(id)

    const createRole = async ({ level, role }: { level: number, role: Omit<Role, "id" | "users"> }) => {
        const res = await client.post(`/organizations/${id}/roles/${level}`, role)
        console.log(res.data);

        if (res.status === 201) {
            return true
        }
        return false
    }

    const { mutateAsync, isPending } = useMutation({
        mutationFn: createRole,
        onSuccess: (res) => {
            if (res) {
                refetch()
            }
        }
    })

    return {
        create: mutateAsync,
        loading: isPending
    }
}

export const useCreateUser = ({ id, }: {
    id: string,

}) => {
    const client = useAxios()

    const { refetch } = useSingleOrg(id)



    const createUser = async (input: {
        name: string,
        email: string,
        password: string
        roleId: number,
        level: number
    }) => {
        const { roleId, level, ...rest } = input
        const res = await client.post(`/organizations/${id}/users/${level}`, {
            ...rest,
            role: { connect: { id: roleId } }
        })
        if (res.status === 201) {
            return true
        }
        return false
    }

    const { mutateAsync, isPending } = useMutation({
        mutationFn: createUser,
        onSuccess: (res) => {
            if (res) {
                refetch()
            }
        }
    })

    return {
        create: mutateAsync,
        loading: isPending
    }
}
