import { useAuth } from "./useAuth";

export const useAbility = () => {
    const { user } = useAuth();

    const heirarchy_manage = user && user.role.hierarchy_manage;
    const notification_manage = user && user.role.notification_manage;
    const analytics_read = user && user.role.analytics_read;

    const form_create = user && user.role.form_create;
    const form_read = user && user.role.form_read;
    const form_update = user && user.role.form_update;
    const form_delete = user && user.role.form_delete;

    const admin_create = user && user.role.admin_create;
    const admin_read = user && user.role.admin_read;
    const admin_update = user && user.role.admin_update;
    const admin_delete = user && user.role.admin_delete;


    return {
        heirarchy_manage,
        notification_manage,
        analytics_read,
        form_create,
        form_read,
        form_update,
        form_delete,
        admin_create,
        admin_read,
        admin_update,
        admin_delete,
    };
}
