import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useCreateRoleLevel, useSingleOrg } from "../../hooks/use-org";
import { useAbility } from "@/hooks/use-ability";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_auth/orgs/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data, isLoading } = useSingleOrg(params.id);

  const { create } = useAbility();
  const { create: createRoleLevel, loading } = useCreateRoleLevel(params.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div className="space-y-2 w-full">
        <div className="flex justify-between items-center">
          <h5 className=" font-semibold">🏫 {data.name}</h5>
          <Button variant="link" asChild>
            <Link to={`/orgs/$id/settings`} params={{ id: params.id }}>
              Settings ➡️
            </Link>
          </Button>
        </div>
        <hr />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 border-r border-slate-300 ">
            {data.role_levels.map((rl) => (
              <Button variant="link" key={rl.id} asChild className="block">
                <Link
                  to={`/orgs/$id/level`}
                  params={{ id: params.id }}
                  search={{ level: rl.level }}
                >
                  Level {rl.level}
                </Link>
              </Button>
            ))}
            {create && (
              <Button
                onClick={() =>
                  createRoleLevel(
                    Math.max(...data.role_levels.map((rl) => rl.level)) + 1
                  )
                }
                disabled={loading}
                variant="outline"
              >
                ⬇️ Add Level Below
              </Button>
            )}
          </div>
          <div className="col-span-2">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
}
