import {
  createFileRoute,
  Outlet,
  Navigate,
  useNavigate,
} from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Code2Icon, LogOutIcon } from "lucide-react";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  if (!user) {
    return <Navigate to="/login" />;
  }

  const logoutHandle = async () => {
    await logoutUser();
  };

  const navigateToFHome = () => {
    if (user.role.role_level.level === 0) {
      navigate({ to: "/orgs" });
    } else {
      navigate({
        to: "/orgs/$id",
        params: { id: user.role.role_level.organization_id },
      });
    }
  };

  return (
    <div className="flex flex-col gap-4   mx-auto w-full md:w-[800px] bg-background h-full px-8">
      <div className="flex items-center gap-4 justify-between  py-2">
        <h3
          className="text-sm font-bold flex items-center gap-2 text-violet-700 hover:text-violet-600 cursor-pointer"
          onClick={navigateToFHome}
        >
          <Code2Icon /> Forms
        </h3>
        <div className="flex">
          <div className="flex flex-col ">
            <span className="text-sm font-semibold">{user.name}</span>
            <span className="text-sm text-muted-foreground">{user.email}</span>
          </div>
          <Button
            variant="outline"
            className="text-2xl ml-4 cursor-pointer"
            onClick={logoutHandle}
            size="icon"
          >
            <LogOutIcon className="text-primary" />
          </Button>
        </div>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}
