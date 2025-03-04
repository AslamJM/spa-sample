import { Role } from "@/hooks/use-org";
import { Link, useSearch } from "@tanstack/react-router";
import { BadgeCheck, Eye, Pencil, PlusCircle, Trash } from "lucide-react";

type Props = {
  roles: Role[];
  orgId: string;
};

export default function RoleList({ roles, orgId }: Props) {
  const { level } = useSearch({ from: "/_auth/orgs/$id/level" });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <BadgeCheck className="text-primary w-4 h-4" />
        <h6 className="text-sm font-semibold">Roles</h6>
      </div>
      {roles.length === 0 && (
        <h6 className=" text-sm text-muted-foreground">No Roles Created</h6>
      )}
      {roles.map((r) => (
        <Link
          to={`/orgs/$id/level`}
          key={r.id}
          params={{ id: orgId }}
          search={{ role: r.id, level }}
        >
          <div className="text-muted-foreground text-sm flex items-center gap-1 my-1 hover:underline ">
            {r.name}
            {r.form_create && <PlusCircle className="h-3 w-3 text-primary" />}
            {r.form_read && <Eye className="h-3 w-3 text-green-500" />}
            {r.form_create && <Pencil className="h-3 w-3 text-orange-500" />}
            {r.form_create && <Trash className="h-3 w-3 text-destructive" />}
          </div>
        </Link>
      ))}
    </div>
  );
}
