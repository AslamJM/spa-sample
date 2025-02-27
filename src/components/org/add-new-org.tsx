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

export default function AddNewOrg() {
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
                hierarchy_limit: parseInt(
                  formData.get("hierarchy_limit") as string
                ),
                top_level_name: formData.get("top_level_name") as string,
                user: {
                  role_name: formData.get("role_name") as string,
                  name: formData.get("admin_name") as string,
                  email: formData.get("email") as string,
                  password: formData.get("password") as string,
                },
              });
              e.currentTarget.reset();
            }}
          >
            <div className="grid grid-cols-5 gap-4">
              <Input
                type="text"
                placeholder="Organization Name"
                name="name"
                className="col-span-2"
              />
              <Input
                type="number"
                placeholder="Hierarchy Limit"
                name="hierarchy_limit"
                className="col-span-1"
              />
              <Input
                type="text"
                placeholder="Top Level Name"
                name="top_level_name"
                className="col-span-2"
              />
            </div>
            <div className="space-y-2">
              <Label>Admin User</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Admin Role Name"
                  name="role_name"
                />
                <Input type="text" placeholder="Admin Name" name="admin_name" />
                <Input type="email" placeholder="Admin Email" name="email" />

                <Input placeholder="Admin Password" name="password" />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-[250px]">
              {loading ? (
                <>
                  <Spinner />
                  Adding...
                </>
              ) : (
                "Add"
              )}
            </Button>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
