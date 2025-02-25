import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <div className="flex gap-2">
        <Button variant="link" asChild>
          <Link to="/orgs">Organizations</Link>
        </Button>
        <Button variant="link" asChild>
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
