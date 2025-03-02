import CreateFeedback from "@/components/feedback/create-feedback";
import MyForms from "@/components/feedback/myforms";
import UserWelcome from "@/components/feedback/user-welcome";

import { useAbility } from "@/hooks/use-ability";
import { useAuth } from "@/hooks/useAuth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/forms/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const { form_create } = useAbility();

  return (
    <div className="space-y-4">
      {user && <UserWelcome user={user} />}
      <div className="grid grid-cols-2 gap-4">
        {form_create && <CreateFeedback />}
        {form_create && (
          <div className="bg-violet-100 rounded p-2">
            <p className="text-sm text-muted-foreground">
              since you are in {user?.role.role_level.level} level of heirarchy.
              you can create feedback forms for the next level
            </p>
          </div>
        )}
      </div>
      <MyForms />
    </div>
  );
}
