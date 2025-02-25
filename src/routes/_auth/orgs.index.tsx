import { createFileRoute, Link } from "@tanstack/react-router";
import { useCreateOrg, useOrgs } from "../../hooks/use-org";
import { useAuth } from "@/hooks/useAuth";
import Unauthorized from "@/components/custom/uanuthorized";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
          <Link key={org.id} to={`/orgs/$id`} params={{ id: org.id }}>
            <div className="p-4 border-[1px] border-amber-600 shadow-amber-500 shadow-sm rounded-sm">
              <h5 className="font-semibold">{org.name}</h5>
              <p className="text-sm text-muted-foreground">
                heirarchy levels: {org.role_levels.length}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function AddNewOrg() {
  const { create, loading } = useCreateOrg();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Add New Organization</AccordionTrigger>
        <AccordionContent>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              await create({
                name: formData.get("name") as string,
                user: {
                  name: formData.get("admin_name") as string,
                  email: formData.get("email") as string,
                  password: formData.get("password") as string,
                },
              });
              e.currentTarget.reset();
            }}
          >
            <Input
              type="text"
              placeholder="Organization Name"
              name="name"
              className="w-1/2"
            />
            <div className="space-y-2">
              <Label>Admin User</Label>
              <Input
                type="email"
                placeholder="Admin Email"
                className="w-1/2"
                name="email"
              />
              <Input
                type="text"
                placeholder="Admin Name"
                name="admin_name"
                className="w-1/2"
              />
              <Input
                placeholder="Admin Password"
                name="password"
                className="w-1/2"
              />
            </div>
            <Button variant="outline" type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </Button>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
