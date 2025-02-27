import { create } from 'zustand'

export type User = {
    id: string;
    email: string;
    role: {
        id: number;
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
        role_level: {
            level: number;
            organization_id: string;
        };
    };
}

interface AppState {
    user: User | null
    token: string | null
}

interface Actions {
    setUser: (user: User | null) => void
    setToken: (token: string | null) => void
}

export const useStore = create<AppState & Actions>((set) => ({
    user: null,
    token: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token })
}))
