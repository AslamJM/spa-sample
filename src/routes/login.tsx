import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { login } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setAccessToken, user, initiateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate({ to: "/org" });
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="space-y-4 p-4 w-[600px] border-amber-600 border-[1px] shadow-amber-500 shadow-sm">
        <h5>Login</h5>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const payload = {
              email: formData.get("email") as string,
              password: formData.get("password") as string,
            };
            const token = await login(payload);
            if (token) {
              setAccessToken(token);
              await initiateUser();
              await Promise.resolve(() => setTimeout(() => {}, 1));
            }
          }}
        >
          <div>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="p-2 border-amber-500 rounded w-[350px] border-[1px] focus:border-2"
            />
          </div>
          <div>
            <input
              name="password"
              placeholder="password"
              className="p-2 border-amber-500 rounded w-[350px] border-[1px] focus:border-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-2 py-4 bg-amber-600 text-amber-50 w-[200px] rounded cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
