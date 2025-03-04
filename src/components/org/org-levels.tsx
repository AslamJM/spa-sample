import { SingleOrg } from "@/hooks/use-org";
import { Link } from "@tanstack/react-router";
import { Label } from "../ui/label";
import { useMemo } from "react";
type Props = {
  data: SingleOrg;
};

export default function OrgLevels({ data }: Props) {
  const notCreatedElems = useMemo(() => {
    const latestLevel = data.role_levels.sort((a, b) => b.level - a.level)[0];
    const notCreated = data.hierarchy_limit - latestLevel.level;
    return Array.from(
      { length: notCreated },
      (_, d) => d + latestLevel.level + 1
    );
  }, [data]);

  return (
    <div className="space-y-4">
      {data.role_levels
        .sort((a, b) => a.level - b.level)
        .map((rl) => (
          <Link
            to={`/orgs/$id/level`}
            params={{ id: data.id }}
            search={{ level: rl.level }}
            key={rl.id}
            className="block"
          >
            <div className="flex items-center gap-2">
              <Label className="text-primary">Lv.{rl.level}</Label>
              <p className="text-sm italic text-muted-foreground">{rl.name}</p>
            </div>
          </Link>
        ))}
      {notCreatedElems.length > 0 &&
        notCreatedElems.map((el) => (
          <Link
            to={`/orgs/$id/level`}
            params={{ id: data.id }}
            search={{ level: el }}
            key={el}
            className="block"
          >
            <div className="flex items-center gap-2">
              <Label>Lv.{el}</Label>
              <p className="text-sm text-muted-foreground">not created</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
