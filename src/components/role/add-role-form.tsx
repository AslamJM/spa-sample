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
import {
  Bell,
  BarChart,
  Eye,
  Layers,
  Pencil,
  PlusCircle,
  Trash,
} from "lucide-react";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { z } from "zod";
import { formOptions, useForm } from "@tanstack/react-form";

type Props = {
  orgId: string;
  level: number;
};

const schema = z.object({
  name: z.string().min(1),
  parent: z.string(),
  form_create: z.boolean(),
  form_read: z.boolean(),
  form_update: z.boolean(),
  form_delete: z.boolean(),
  admin_create: z.boolean(),
  admin_read: z.boolean(),
  admin_update: z.boolean(),
  admin_delete: z.boolean(),
  analytics_read: z.boolean(),
  notification_manage: z.boolean(),
  hierarchy_manage: z.boolean(),
});

const formOpts = formOptions({
  defaultValues: {
    name: "",
    parent: "",
    form_create: false,
    form_read: false,
    form_update: false,
    form_delete: false,
    admin_create: false,
    admin_read: false,
    admin_update: false,
    admin_delete: false,
    analytics_read: false,
    notification_manage: false,
    hierarchy_manage: false,
  },
  validators: {
    onChange: schema,
  },
});

export default function AddRoleForm({ orgId, level }: Props) {
  const { create } = useCreateRole(orgId);
  const { data: org } = useSingleOrg(orgId);

  const parentLevels = useMemo(() => {
    return org?.role_levels
      .filter((rl) => rl.level == level - 1)
      .flatMap((rl) => rl.roles)
      .map((rl) => ({ label: rl.name, value: rl.id }));
  }, [org, level]);

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      const { parent, ...role } = value;
      const res = await create({
        level,
        role: {
          ...role,
          ...(parent.length > 1 && {
            parent: { connect: { id: Number(parent) } },
          }),
        },
      });

      if (res) {
        formApi.reset();
      }
    },
  });

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Add Role</AccordionTrigger>
        <AccordionContent>
          <form
            className="space-y-2 pr-2"
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="parent"
              children={(field) => (
                <Select
                  name="parent"
                  value={field.state.value ?? ""}
                  onValueChange={(value) => field.handleChange(value)}
                >
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
              )}
            />
            <form.Field
              name="name"
              children={(field) => (
                <Input
                  type="text"
                  name="name"
                  placeholder="Role Name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />

            {/* form permissions */}
            <div className="space-y-2">
              <Label>Form Permissions</Label>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex gap-2 items-center">
                  <form.Field
                    name="form_create"
                    children={(field) => (
                      <Checkbox
                        name="form_create"
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(
                            checked === "indeterminate" ? false : checked
                          )
                        }
                      />
                    )}
                  />
                  <PlusCircle className="w-4 h-4" />
                </div>
                <div className="flex gap-2 items-center">
                  <form.Field
                    name="form_read"
                    children={(field) => (
                      <Checkbox
                        name="form_read"
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(
                            checked === "indeterminate" ? false : checked
                          )
                        }
                      />
                    )}
                  />
                  <Eye className="w-4 h-4" />
                </div>
                <div className="flex gap-2 items-center">
                  <form.Field
                    name="form_update"
                    children={(field) => (
                      <Checkbox
                        name="form_update"
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(
                            checked === "indeterminate" ? false : checked
                          )
                        }
                      />
                    )}
                  />
                  <Pencil className="w-4 h-4" />
                </div>
                <div className="flex gap-2 items-center">
                  <form.Field
                    name="form_delete"
                    children={(field) => (
                      <Checkbox
                        name="form_delete"
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(
                            checked === "indeterminate" ? false : checked
                          )
                        }
                      />
                    )}
                  />
                  <Trash className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* admin permissions */}
            <div className="space-y-2">
              <Label>Admin Permissions</Label>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex gap-2 items-center">
                  <form.Field
                    name="admin_create"
                    children={(field) => (
                      <Checkbox
                        name="admin_create"
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(
                            checked === "indeterminate" ? false : checked
                          )
                        }
                      />
                    )}
                  />
                  <PlusCircle className="w-4 h-4" />
                </div>
                <div className="flex gap-2 items-center">
                  <form.Field
                    name="admin_read"
                    children={(field) => (
                      <Checkbox
                        name="admin_read"
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(
                            checked === "indeterminate" ? false : checked
                          )
                        }
                      />
                    )}
                  />
                  <Eye className="w-4 h-4" />
                </div>
                <div className="flex gap-2 items-center">
                  <form.Field
                    name="admin_update"
                    children={(field) => (
                      <Checkbox
                        name="admin_update"
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(
                            checked === "indeterminate" ? false : checked
                          )
                        }
                      />
                    )}
                  />
                  <Pencil className="w-4 h-4" />
                </div>
                <div className="flex gap-2 items-center">
                  <form.Field
                    name="admin_delete"
                    children={(field) => (
                      <Checkbox
                        name="admin_delete"
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(
                            checked === "indeterminate" ? false : checked
                          )
                        }
                      />
                    )}
                  />
                  <Trash className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Others */}
            <div className="space-y-2">
              <Label>Others</Label>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex gap-2 items-center">
                  <form.Field
                    name="analytics_read"
                    children={(field) => (
                      <Checkbox
                        name="analytics_read"
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(
                            checked === "indeterminate" ? false : checked
                          )
                        }
                      />
                    )}
                  />
                  <BarChart className="w-4 h-4" />
                </div>
                <div className="flex gap-2 items-center">
                  <form.Field
                    name="notification_manage"
                    children={(field) => (
                      <Checkbox
                        name="notification_manage"
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(
                            checked === "indeterminate" ? false : checked
                          )
                        }
                      />
                    )}
                  />
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex gap-2 items-center">
                  <form.Field
                    name="hierarchy_manage"
                    children={(field) => (
                      <Checkbox
                        name="hierarchy_manage"
                        checked={field.state.value}
                        onCheckedChange={(checked) =>
                          field.handleChange(
                            checked === "indeterminate" ? false : checked
                          )
                        }
                      />
                    )}
                  />
                  <Layers className="w-4 h-4" />
                </div>
              </div>
            </div>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Adding...
                    </>
                  ) : (
                    "Add"
                  )}
                </Button>
              )}
            />
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
