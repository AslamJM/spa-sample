import { useCreateOrg } from "@/hooks/use-org";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Spinner from "../custom/spinner";
import { formOptions, useForm } from "@tanstack/react-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  hierarchy_limit: z.string().transform((val) => parseInt(val)),
  top_level_name: z.string().min(1),
  role_name: z.string().min(1),
  admin_name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const formOpts = formOptions({
  defaultValues: {
    name: "",
    hierarchy_limit: "",
    top_level_name: "",
    role_name: "",
    admin_name: "",
    email: "",
    password: "",
  },
  validators: {
    onChange: schema,
  },
});

export default function AddNewOrg() {
  const { create } = useCreateOrg();

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      const res = await create({
        name: value.name,
        hierarchy_limit: parseInt(value.hierarchy_limit),
        top_level_name: value.top_level_name,
        user: {
          role_name: value.role_name,
          name: value.admin_name,
          email: value.email,
          password: value.password,
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
        <AccordionTrigger>Add New Organization</AccordionTrigger>
        <AccordionContent>
          <form
            className="space-y-4 p-2"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="grid grid-cols-5 gap-4">
              <form.Field
                name="name"
                children={(field) => (
                  <Input
                    type="text"
                    placeholder="Organization Name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="col-span-2"
                  />
                )}
              />
              <form.Field
                name="hierarchy_limit"
                children={(field) => (
                  <Input
                    type="number"
                    placeholder="Hierarchy Limit"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="col-span-1"
                  />
                )}
              />
              <form.Field
                name="top_level_name"
                children={(field) => (
                  <Input
                    type="text"
                    placeholder="Top Level Name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="col-span-2"
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Admin User</Label>
              <div className="grid grid-cols-2 gap-4">
                <form.Field
                  name="role_name"
                  children={(field) => (
                    <Input
                      type="text"
                      placeholder="Admin Role Name"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                />
                <form.Field
                  name="admin_name"
                  children={(field) => (
                    <Input
                      type="text"
                      placeholder="Admin Name"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                />
                <form.Field
                  name="email"
                  children={(field) => (
                    <Input
                      type="email"
                      placeholder="Admin Email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                />
                <form.Field
                  name="password"
                  children={(field) => (
                    <Input
                      type="password"
                      placeholder="Admin Password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="w-[250px]"
                >
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
