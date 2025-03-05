import { Role } from "@/hooks/use-org";
import { Label } from "../ui/label";
import { BadgeX, Eye, Pencil, Trash } from "lucide-react";
import { BadgeCheck } from "lucide-react";

type Props = {
  role: Role;
};
export default function RoleInfo({ role }: Props) {
  return (
    <div className="space-y-1 bg-violet-50 p-2 rounded-md border border-primary/20">
      <h5 className="text-sm font-semibold">{role.name}</h5>
      <div className="flex items-center gap-2">
        <Label className="text-muted-foreground">forms</Label>
        <div className="flex items-center gap-2">
          {role.form_create && <BadgeCheck className="w-4 h-4 text-primary" />}
          {role.form_read && <Eye className="w-4 h-4 text-green-500" />}
          {role.form_update && <Pencil className="w-4 h-4 text-orange-500" />}
          {role.form_delete && <Trash className="w-4 h-4 text-destructive" />}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Label className="text-muted-foreground">admins</Label>
        <div className="flex items-center gap-2">
          {role.admin_create && <BadgeCheck className="w-4 h-4 text-primary" />}
          {role.admin_read && <Eye className="w-4 h-4 text-green-500" />}
          {role.admin_update && <Pencil className="w-4 h-4 text-orange-500" />}
          {role.admin_delete && <Trash className="w-4 h-4 text-destructive" />}
          {!role.admin_create &&
            !role.admin_read &&
            !role.admin_update &&
            !role.admin_delete && (
              <BadgeX className="w-4 h-4 text-muted-foreground" />
            )}
        </div>
      </div>
    </div>
  );
}
