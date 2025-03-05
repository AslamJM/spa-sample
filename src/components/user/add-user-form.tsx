import { useCreateUser } from "@/hooks/use-org";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useParams, useSearch } from "@tanstack/react-router";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Spinner from "../custom/spinner";
import { z } from "zod";
import { formOptions, useForm } from "@tanstack/react-form";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const formOpt = formOptions({
  defaultValues: {
    name: "",
    email: "",
    password: "",
  },
  validators: {
    onChange: schema,
  },
});
export default function AddUserForm() {
  const { id } = useParams({ from: "/_auth/orgs/$id/level" });
  const { level, role } = useSearch({ from: "/_auth/orgs/$id/level" });

  const { create } = useCreateUser({ id });

  const form = useForm({
    ...formOpt,
    onSubmit: async ({ value, formApi }) => {
      const res = await create({
        name: value.name,
        email: value.email,
        password: value.password,
        roleId: role!,
        level: level!,
      });
      if (res) {
        formApi.reset();
      }
    },
  });

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-2">
        <AccordionTrigger>Add User</AccordionTrigger>
        <AccordionContent>
          <form
            className="space-y-2 p-1"
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div>
              <form.Field
                name="name"
                children={(field) => (
                  <Input
                    name="name"
                    placeholder="Name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </div>
            <div>
              <form.Field
                name="email"
                children={(field) => (
                  <Input
                    name="email"
                    placeholder="Email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </div>
            <div>
              <form.Field
                name="password"
                children={(field) => (
                  <Input
                    name="password"
                    placeholder="Password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              />
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting && <Spinner />}
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              )}
            />
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
