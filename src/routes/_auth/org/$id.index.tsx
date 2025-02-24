import { createFileRoute } from "@tanstack/react-router";
import { RoleLevel, useSingleOrg } from "../../../hooks/use-org";

export const Route = createFileRoute("/_auth/org/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data, isLoading } = useSingleOrg(params.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div className="space-y-2 w-full">
        <h5>{data.name}</h5>
        <hr />
        {data.role_levels.map((rl) => (
          <RoleLevelComp key={rl.id} rl={rl} />
        ))}
      </div>
    );
  }
}

function RoleLevelComp({ rl }: { rl: RoleLevel }) {
  return (
    <div className="p-4 border-[1px] border-amber-600 shadow-amber-500 shadow-sm rounded-sm w-full">
      <h5 className="text-sm font-bold">Level - {rl.level}</h5>
      <h6>Roles</h6>
      <ul className="flex gap-4 flex-wrap">
        {rl.roles.map((role) => (
          <li key={role.id} className="text-gray-600 text-sm">
            {role.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
