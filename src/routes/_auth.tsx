import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../api/auth";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, setAccessToken, setUser } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const logoutHandle = async () => {
    const res = await logout();
    console.log(res);

    if (res.success) {
      setAccessToken(null);
      setUser(null);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center max-w-4xl mx-auto">
      <div className="flex items-center justify-between w-[800px]">
        <h3>Authenticated Sections 🔒</h3>
        <div className="flex">
          <div className="flex flex-col ">
            <span className="text-sm text-slate-500">{user.email}</span>
            <span className="text-sm text-slate-500">{user.id}</span>
          </div>
          <button
            className="text-2xl ml-4 cursor-pointer"
            onClick={logoutHandle}
          >
            📴
          </button>
        </div>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}
