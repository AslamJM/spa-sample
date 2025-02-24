import { create } from 'zustand'

export type User = {
    id: string;
    email: string;
    role: {
        id: number;
        can_create: boolean;
        can_read: boolean;
        can_update: boolean;
        can_delete: boolean;
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
