import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAbility } from "@/hooks/use-ability";
import {
  useCreateUser,
  useSingleOrg,
  useCreateRole,
  useRemoveRole,
} from "@/hooks/use-org";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  level: z.number().optional(),
  role: z.number().optional(),
});

export const Route = createFileRoute("/_auth/orgs/$id/level")({
  component: RouteComponent,
  validateSearch: searchSchema,
});

function RouteComponent() {
  const search = Route.useSearch();
  const params = Route.useParams();

  const { data, isLoading } = useSingleOrg(params.id);
  const { create, remove } = useAbility();
  const { create: createRole, loading } = useCreateRole(params.id);
  const { create: createUser, loading: createUserLoading } = useCreateUser({
    id: params.id,
  });
  const { remove: removeRole, loading: removeRoleLoading } = useRemoveRole(
    params.id
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!search.level) {
    return <Navigate to={`/orgs/$id`} params={{ id: params.id }} />;
  }

  const sectionData = data?.role_levels.find((rl) => rl.level === search.level);

  if (sectionData) {
    const roles = sectionData.roles;

    const removeRoleHandle = async (id: number) => {
      await removeRole({ level: search.level!, role: id });
    };

    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">LEVEL - {search.level}</h3>
          <div className="space-y-2">
            {roles.length === 0 && (
              <h6 className=" text-sm text-muted-foreground">
                No Roles Created
              </h6>
            )}
            {roles.map((r) => (
              <Button
                variant="ghost"
                key={r.id}
                className="text-muted-foreground text-sm block"
              >
                <Link
                  to={`/orgs/$id/level`}
                  params={{ id: params.id }}
                  search={{ role: r.id, level: search.level }}
                >
                  {r.name} {r.can_create ? "🔄" : ""} {r.can_read ? "🔍" : ""}
                  {r.can_update ? "✏️" : ""} {r.can_delete ? "🗑️" : ""}
                </Link>
              </Button>
            ))}
          </div>
          {create && (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Add Role</AccordionTrigger>
                <AccordionContent>
                  <form
                    className="space-y-2 p-1 w-[250px]"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const role = {
                        name: formData.get("name") as string,
                        can_create: formData.get("can_create") === "on",
                        can_read: formData.get("can_read") === "on",
                        can_update: formData.get("can_update") === "on",
                        can_delete: formData.get("can_delete") === "on",
                      };
                      await createRole({ level: search.level!, role });
                      e.currentTarget.reset();
                    }}
                  >
                    <Input type="text" name="name" placeholder="Role Name" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex gap-2 items-center">
                        <Checkbox name="can_create" />
                        <Label>Create</Label>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Checkbox name="can_read" defaultChecked={true} />
                        <Label>Read</Label>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex gap-2 items-center">
                        <Checkbox name="can_update" />
                        <Label>Update</Label>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Checkbox name="can_delete" />
                        <Label>Delete</Label>
                      </div>
                    </div>
                    <Button type="submit" variant="outline" disabled={loading}>
                      {loading ? "Creating..." : "Create"}
                    </Button>
                  </form>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          {remove && (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-4">
                <AccordionTrigger>Remove Level</AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    This will remove the level and all roles and users in that
                    level.
                  </p>
                  <Button variant="destructive" disabled={removeRoleLoading}>
                    {removeRoleLoading ? "Removing..." : "Remove"}
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
        <div>
          {search.role ? (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">
                {sectionData.roles.find((r) => r.id === search.role)?.name}
              </h3>
              <h5 className="text-sm font-semibold">Users</h5>
              <hr />
              {sectionData.roles
                .find((r) => r.id === search.role)
                ?.users.map((u) => (
                  <div key={u.id}>
                    <span className="text-sm font-semibold mr-4">{u.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {u.email}
                    </span>
                  </div>
                ))}
              <hr />
              {create && (
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Add User</AccordionTrigger>
                    <AccordionContent>
                      <form
                        className="space-y-2"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          await createUser({
                            name: formData.get("name") as string,
                            email: formData.get("email") as string,
                            password: formData.get("password") as string,
                            roleId: search.role!,
                            level: search.level!,
                          });
                          e.currentTarget.reset();
                        }}
                      >
                        <div>
                          <Input name="name" placeholder="Name" />
                        </div>
                        <div>
                          <Input name="email" placeholder="Email" />
                        </div>
                        <div>
                          <Input name="password" placeholder="Password" />
                        </div>
                        <Button
                          type="submit"
                          variant="outline"
                          disabled={createUserLoading}
                        >
                          {createUserLoading ? "Creating..." : "Create"}
                        </Button>
                      </form>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
              {remove && (
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Remove Role</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">
                        This will remove the role and all users with that role
                        will be removed.
                      </p>
                      <Button
                        variant="destructive"
                        disabled={removeRoleLoading}
                        onClick={() =>
                          removeRoleHandle(
                            sectionData.roles.find((r) => r.id === search.role)!
                              .id
                          )
                        }
                      >
                        {removeRoleLoading ? "Removing..." : "Remove"}
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          ) : (
            <div>
              <h6 className=" text-sm text-muted-foreground">
                No Role Selected
              </h6>
            </div>
          )}
        </div>
      </div>
    );
  }
}
