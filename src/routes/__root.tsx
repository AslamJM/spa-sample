import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [loading, setLoading] = useState(false);
  const { initiateUser, accessToken } = useAuth();

  useEffect(() => {
    setLoading(true);
    initiateUser().then(() => setLoading(false));
  }, [accessToken]);

  if (loading) {
    <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="h-screen bg-[#88AAEEB3] ">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
