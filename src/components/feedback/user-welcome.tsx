import { User } from "@/store";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSingleOrg } from "@/hooks/use-org";
import { Building2Icon, ChartBarIncreasingIcon } from "lucide-react";

type Props = {
  user: User;
};

export default function UserWelcome({ user }: Props) {
  const { data } = useSingleOrg(user.role.role_level.organization_id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome {user?.name}</CardTitle>
        <div className="flex items-center gap-4">
          <CardDescription className="flex items-center gap-2">
            <Building2Icon className="w-4 h-4 text-primary" /> {data?.name}
          </CardDescription>
          <CardDescription className="flex items-center gap-2">
            <ChartBarIncreasingIcon className="w-4 h-4 text-primary" />{" "}
            {user.role.role_level.level}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
