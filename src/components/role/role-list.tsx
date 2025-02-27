import { Role } from "@/hooks/use-org";
import { Button } from "../ui/button";
import { Link, useSearch } from "@tanstack/react-router";

type Props = {
  roles: Role[];
  orgId: string;
};

export default function RoleList({ roles, orgId }: Props) {
  const { level } = useSearch({ from: "/_auth/orgs/$id/level" });

  return (
    <div className="space-y-2">
      <h6 className="text-sm font-semibold">Roles</h6>
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
          <Button
            variant="link"
            className="text-muted-foreground text-sm block"
          >
            {r.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
