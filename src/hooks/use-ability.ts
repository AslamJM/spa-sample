import { useAuth } from "./useAuth";

export const useAbility = () => {
    const { user } = useAuth();

    const read = user && user.role.can_read;
    const create = user && user.role.can_create;
    const update = user && user.role.can_update;
    const remove = user && user.role.can_delete;

    return { read, create, update, remove };
}
