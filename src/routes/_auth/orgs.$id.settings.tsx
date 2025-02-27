import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAbility } from "@/hooks/use-ability";
import { useSingleOrg, useUpdateOrg } from "@/hooks/use-org";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/orgs/$id/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data } = useSingleOrg(id);
  const { heirarchy_manage } = useAbility();
  const { update: updateOrg, loading: updateLoading } = useUpdateOrg(id);
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get("name");
            await updateOrg({ name: name as string });
          }}
        >
          <Label>Name</Label>
          <div className="flex items-center gap-2">
            <Input
              defaultValue={data?.name}
              disabled={!heirarchy_manage}
              className="flex-grow"
              name="name"
            />
            <Button
              variant="outline"
              disabled={!heirarchy_manage || updateLoading}
              size="icon"
              type="submit"
            >
              📝
            </Button>
          </div>
        </form>
      </div>
      <div className="space-y-2">
        <Label>Delete Organization</Label>
        <p className="text-sm text-muted-foreground">
          Deleting organization will delete all data and users associated with
          it.
        </p>
        <Button
          variant="destructive"
          disabled={!heirarchy_manage}
          className="block"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
