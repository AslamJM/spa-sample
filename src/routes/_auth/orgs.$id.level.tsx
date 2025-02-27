import LoaderComp from "@/components/custom/loader-comp";
import RoleLevelCreate from "@/components/org/role-level-create";
import AddRoleForm from "@/components/role/add-role-form";
import RoleList from "@/components/role/role-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAbility } from "@/hooks/use-ability";
import { useCreateUser, useSingleOrg, useRemoveRole } from "@/hooks/use-org";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { StepForward } from "lucide-react";
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
  const navigate = Route.useNavigate();

  const { data, isLoading } = useSingleOrg(params.id);
  const { heirarchy_manage } = useAbility();
  const { create: createUser, loading: createUserLoading } = useCreateUser({
    id: params.id,
  });
  const { remove: removeRole, loading: removeRoleLoading } = useRemoveRole(
    params.id
  );
  if (isLoading) {
    return <LoaderComp />;
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
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <StepForward className="w-4 h-4 text-orange-500" />
          <h3 className="text-sm  font-semibold">LEVEL - {search.level}</h3>
        </div>
        <hr />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <RoleList roles={roles} orgId={params.id} />
            {heirarchy_manage && search.level && (
              <AddRoleForm orgId={params.id} level={search.level} />
            )}
            {heirarchy_manage && (
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
                      <span className="text-sm font-semibold mr-4">
                        {u.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {u.email}
                      </span>
                    </div>
                  ))}
                <hr />
                {heirarchy_manage && (
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
                {heirarchy_manage && (
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
                          onClick={async () => {
                            await removeRoleHandle(
                              sectionData.roles.find(
                                (r) => r.id === search.role
                              )!.id
                            );
                            navigate({
                              to: "/orgs/$id/level",
                              params: { id: params.id },
                              search: { level: search.level },
                            });
                          }}
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
      </div>
    );
  } else {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <StepForward className="w-4 h-4 text-orange-500" />
          <h3 className="text-sm  font-semibold">LEVEL - {search.level}</h3>
        </div>
        <hr />
        <RoleLevelCreate />
      </div>
    );
  }
}
