import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useSingleOrg } from "@/hooks/use-org";
import { useParams } from "@tanstack/react-router";

const users = [
  {
    email: "super@email.com",
    name: "Super Admin",
  },
  {
    name: "lv-01 user",
    email: "mental@ep.com",
  },
  {
    name: "lv-02 user",
    email: "l2@ep.com",
  },
  {
    name: "lv2 readonly",
    email: "l2ro@ep.com",
  },
];

export default function SwitchUsers() {
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();

  const params = useParams({ from: "/_auth/orgs/$id" });

  const { refetch } = useSingleOrg(params.id);

  const onSelect = async (value: string) => {
    try {
      setLoading(true);
      await loginUser(value, "123456");
      await refetch();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select onValueChange={onSelect} disabled={loading}>
      <SelectTrigger>
        <SelectValue placeholder="Switch User" />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.email} value={user.email}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
