import { createFileRoute } from "@tanstack/react-router";
import { useOrgs } from "../../hooks/use-org";
import { useAuth } from "@/hooks/useAuth";
import Unauthorized from "@/components/custom/uanuthorized";
import AddNewOrg from "@/components/org/add-new-org";
import OrgCard from "@/components/org/org-card";

export const Route = createFileRoute("/_auth/orgs/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useOrgs();
  const { user } = useAuth();

  if (!user || user.role.role_level.level !== 0) {
    return <Unauthorized />;
  }

  return (
    <div className="space-y-4">
      <AddNewOrg />
      <h4 className="text-xl font-bold text-center">All Organizations</h4>
      <hr />
      <div className="grid grid-cols-3 gap-4">
        {data?.map((org) => (
          <OrgCard key={org.id} org={org} />
        ))}
      </div>
    </div>
  );
}
