import { Organization } from "@/hooks/use-org";
import { Card, CardContent } from "../ui/card";
import { Link } from "@tanstack/react-router";

type Props = {
  org: Organization;
};

export default function OrgCard({ org }: Props) {
  return (
    <Link to="/orgs/$id" params={{ id: org.id }}>
      <Card>
        <CardContent className="space-y-2">
          <h5 className="text-sm font-semibold">{org.name}</h5>
          <p className="text-sm text-muted-foreground">
            heirarchy levels limit: {org.hierarchy_limit}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
