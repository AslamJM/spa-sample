import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { login } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setAccessToken, user, initiateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const isSuperAdmin = user.role.role_level.level === 0;
      const orgId = user.role.role_level.organization_id;
      if (isSuperAdmin) {
        navigate({ to: "/orgs" });
      } else {
        navigate({ to: "/orgs/$id", params: { id: orgId } });
      }
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
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
              <Input name="email" type="email" placeholder="email" />
            </div>
            <div>
              <Input name="password" placeholder="password" />
            </div>
            <div>
              <Button type="submit">Login</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
