import { useCreateRole, useSingleOrg } from "@/hooks/use-org";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Spinner from "../custom/spinner";
import { Eye, Pencil, PlusCircle, Trash } from "lucide-react";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  orgId: string;
  level: number;
};

export default function AddRoleForm({ orgId, level }: Props) {
  const { create, loading } = useCreateRole(orgId);
  const { data: org } = useSingleOrg(orgId);

  const parentLevels = useMemo(() => {
    return org?.role_levels
      .filter((rl) => rl.level == level - 1)
      .flatMap((rl) => rl.roles)
      .map((rl) => ({ label: rl.name, value: rl.id }));
  }, [org, level]);

  console.log(parentLevels);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Add Role</AccordionTrigger>
        <AccordionContent>
          <form
            className="space-y-2 pr-2"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const role = {
                name: formData.get("name") as string,
                form_create: formData.get("form_create") === "on",
                form_read: formData.get("form_read") === "on",
                form_update: formData.get("form_update") === "on",
                form_delete: formData.get("form_delete") === "on",
                admin_create: false,
                admin_read: false,
                admin_update: false,
                admin_delete: false,
                analytics_read: false,
                notification_manage: false,
                hierarchy_manage: false,
                parent: {
                  connect: {
                    id: Number(formData.get("parent")),
                  },
                },
              };
              await create({ level, role });
            }}
          >
            <Select name="parent">
              <SelectTrigger>
                <SelectValue placeholder="Under" />
              </SelectTrigger>
              <SelectContent>
                {parentLevels?.map((pl) => (
                  <SelectItem key={pl.value} value={pl.value.toString()}>
                    {pl.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="text" name="name" placeholder="Role Name" />

            {/* form permissions */}
            <div className="space-y-2">
              <Label>Form Permissions</Label>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex gap-2 items-center">
                  <Checkbox name="form_create" />
                  <PlusCircle className="w-4 h-4" />
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox name="form_read" />
                  <Eye className="w-4 h-4" />
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox name="form_update" />
                  <Pencil className="w-4 h-4" />
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox name="form_delete" />
                  <Trash className="w-4 h-4" />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={loading}>
              {loading && <Spinner />}
              {loading ? "Creating..." : "Create"}
            </Button>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
