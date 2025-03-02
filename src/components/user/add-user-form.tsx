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

export default function AddUserForm() {
  const { id } = useParams({ from: "/_auth/orgs/$id/level" });
  const { level, role } = useSearch({ from: "/_auth/orgs/$id/level" });

  const { create, loading } = useCreateUser({ id });

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-2">
        <AccordionTrigger>Add User</AccordionTrigger>
        <AccordionContent>
          <form
            className="space-y-2 p-1"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await create({
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                roleId: role!,
                level: level!,
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
            <Button type="submit" variant="outline" disabled={loading}>
              {loading && <Spinner />}
              {loading ? "Creating..." : "Create"}
            </Button>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
