import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import SwitchUsers from "@/components/custom/switch-users";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, logoutUser } = useAuth();

  const path = Route.fullPath;

  if (!user) {
    return <Navigate to="/login" />;
  }

  const logoutHandle = async () => {
    await logoutUser();
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center max-w-4xl mx-auto">
      <div className="flex items-center gap-4 justify-between w-[800px] py-2">
        <h3 className="text-sm font-bold">Authenticated Sections 🔒</h3>
        {path.startsWith("/orgs/") && <SwitchUsers />}
        <div className="flex">
          <div className="flex flex-col ">
            <span className="text-sm text-slate-500">{user.email}</span>
            <span className="text-sm text-slate-500">{user.id}</span>
          </div>
          <Button
            variant="outline"
            className="text-2xl ml-4 cursor-pointer"
            onClick={logoutHandle}
            size="icon"
          >
            📴
          </Button>
        </div>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}
