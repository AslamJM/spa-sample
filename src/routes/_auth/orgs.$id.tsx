import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useSingleOrg } from "../../hooks/use-org";
import { Button } from "@/components/ui/button";
import OrgLevels from "@/components/org/org-levels";
import LoaderComp from "@/components/custom/loader-comp";
import { Building2, FormInputIcon, Settings2Icon } from "lucide-react";

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
          <div className="flex items-center gap-4">
            <Button variant="link" asChild>
              <Link to={`/forms`} params={{ id: params.id }}>
                <FormInputIcon className="w-4 h-4" />
                Forms
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link to={`/orgs/$id/settings`} params={{ id: params.id }}>
                <Settings2Icon className="w-4 h-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-2 bg-violet-200 p-2 rounded ">
            <OrgLevels data={data} />
          </div>
          <div className="col-span-5">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
}
