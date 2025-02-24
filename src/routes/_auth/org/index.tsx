import { createFileRoute, Link } from "@tanstack/react-router";
import { useOrgs } from "../../../hooks/use-org";

export const Route = createFileRoute("/_auth/org/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useOrgs();
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-bold text-center">All Organizations</h4>
      <hr />
      <div className="grid grid-cols-3 gap-4">
        {data?.map((org) => (
          <Link key={org.id} to={`/org/$id`} params={{ id: org.id }}>
            <div className="p-4 border-[1px] border-amber-600 shadow-amber-500 shadow-sm rounded-sm">
              <h5>{org.name}</h5>
              <p>heirarchy levels: {org.role_levels.length}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
