import { useMutation, useQuery } from "@tanstack/react-query"
import useAxios from "../api/client"

export type Organization = {
    role_levels: {
        id: number;
        organization_id: string;
        level: number;
    }[];
} & {
    id: string;
    name: string;
    hierarchy_limit: number;
    status: boolean;
    created_at: Date;
    updated_at: Date;
}

export type Role = {
    id: number
    name: string
    form_create: boolean;
    form_read: boolean;
    form_update: boolean;
    form_delete: boolean;
    admin_create: boolean;
    admin_read: boolean;
    admin_update: boolean;
    admin_delete: boolean;
    analytics_read: boolean;
    notification_manage: boolean;
    hierarchy_manage: boolean;
    users: {
        id: string
        name: string
        email: string
    }[]
}

export type RoleLevel = {
    id: number;
    name: string;
    level: number;
    roles: Role[]
}

export type SingleOrg = {
    id: string;
    name: string;
    hierarchy_limit: number;
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
        hierarchy_limit: number,
        top_level_name: string,
        user: {
            role_name: string,
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


export const useCreateRole = (id: string) => {
    const client = useAxios()

    const { refetch } = useSingleOrg(id)

    const createRole = async ({ level, role }: {
        level: number,
        role: Omit<Role, "id" | "users"> & { parent?: { connect: { id: number } } }
    }) => {
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

export const useUpdateOrg = (id: string) => {
    const client = useAxios()

    const { refetch } = useSingleOrg(id)

    const updateOrg = async (input: {
        name: string
    }) => {
        const res = await client.patch(`/organizations/${id}`, input)
        if (res.status === 200) {
            return true
        }
        return false
    }

    const { mutateAsync, isPending } = useMutation({
        mutationFn: updateOrg,
        onSuccess: (res) => {
            if (res) {
                refetch()
            }
        }
    })

    return {
        update: mutateAsync,
        loading: isPending
    }
}

export const useRemoveRole = (id: string,) => {
    const client = useAxios()

    const { refetch } = useSingleOrg(id)

    const removeRole = async ({ level, role }: { level: number, role: number }) => {
        const res = await client.delete(`/organizations/${id}/roles/${level}/${role}`)
        if (res.status === 200) {
            return true
        }
        return false
    }

    const { mutateAsync, isPending } = useMutation({
        mutationFn: removeRole,
        onSuccess: (res) => {
            if (res) {
                refetch()
            }
        }
    })

    return {
        remove: mutateAsync,
        loading: isPending
    }
}

export const useCreateRoleLevel = ({ id }: { id: string }) => {
    const client = useAxios()

    const { refetch } = useSingleOrg(id)

    const createRoleLevel = async ({ name, level }: { name: string, level: number }) => {
        const res = await client.post(`/organizations/${id}/role-levels/${level}`, { name })
        if (res.status === 201) {
            return true
        }
        return false
    }

    const { mutateAsync, isPending } = useMutation({
        mutationFn: createRoleLevel,
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

