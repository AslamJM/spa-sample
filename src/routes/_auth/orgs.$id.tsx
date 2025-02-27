import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useSingleOrg } from "../../hooks/use-org";
import { Button } from "@/components/ui/button";
import OrgLevels from "@/components/org/org-levels";
import LoaderComp from "@/components/custom/loader-comp";
import { Building2, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_auth/orgs/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { data, isLoading } = useSingleOrg(params.id);

  if (isLoading) {
    return <LoaderComp />;
  }

  if (data) {
    return (
      <div className="space-y-2 w-full">
        <div className="flex justify-between items-center">
          <h5 className=" font-semibold flex items-center gap-2">
            <Building2 className="w-4 h-4" /> {data.name}
          </h5>
          <Button variant="link" asChild>
            <Link to={`/orgs/$id/settings`} params={{ id: params.id }}>
              Settings <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <hr />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 border-r border-slate-300 ">
            <OrgLevels data={data} />
          </div>
          <div className="col-span-2">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
}
