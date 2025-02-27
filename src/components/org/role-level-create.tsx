import { useParams, useSearch } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCreateRoleLevel } from "@/hooks/use-org";
import Spinner from "../custom/spinner";

export default function RoleLevelCreate() {
  const { level } = useSearch({ from: "/_auth/orgs/$id/level" });
  const { id } = useParams({ from: "/_auth/orgs/$id/level" });

  const { create, loading } = useCreateRoleLevel({ id: id });

  return (
    <div className="space-y-2">
      <Label>Create Role Level</Label>
      <form
        className="space-y-2"
        onSubmit={(e) => {
          if (!level) return;
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const name = formData.get("name") as string;
          create({ level, name });
        }}
      >
        <Input name="name" placeholder="Role Level Name" />
        <Button disabled={loading}>{loading && <Spinner />}Create</Button>
      </form>
    </div>
  );
}
