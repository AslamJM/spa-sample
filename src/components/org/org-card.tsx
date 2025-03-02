import { Organization } from "@/hooks/use-org";
import { Card, CardContent } from "../ui/card";
import { Link } from "@tanstack/react-router";
import { Building2Icon } from "lucide-react";

type Props = {
  org: Organization;
};

export default function OrgCard({ org }: Props) {
  return (
    <Link to="/orgs/$id" params={{ id: org.id }}>
      <Card>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-1">
            <Building2Icon className="text-primary h-4 w-4 " />{" "}
            <h5 className="text-sm font-semibold">{org.name}</h5>
          </div>
          <p className="text-sm text-muted-foreground italic">
            heirarchy levels limit: {org.hierarchy_limit}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
