import { SingleOrg } from "@/hooks/use-org";
import { Link } from "@tanstack/react-router";
import { Label } from "../ui/label";
type Props = {
  data: SingleOrg;
};

export default function OrgLevels({ data }: Props) {
  const not_created = data.hierarchy_limit - data.role_levels.length;
  const elems = Array.from(
    { length: not_created },
    (_, d) => d + data.role_levels.length + 1
  );

  return (
    <div className="space-y-4">
      {data.role_levels.map((rl) => (
        <Link
          to={`/orgs/$id/level`}
          params={{ id: data.id }}
          search={{ level: rl.level }}
          key={rl.id}
          className="block"
        >
          <div className="flex items-center gap-2">
            <Label>Level {rl.level}</Label>
            <p className="text-sm text-muted-foreground">{rl.name}</p>
          </div>
        </Link>
      ))}
      {elems.length > 0 &&
        elems.map((el) => (
          <Link
            to={`/orgs/$id/level`}
            params={{ id: data.id }}
            search={{ level: el }}
            key={el}
            className="block"
          >
            <div className="flex items-center gap-2">
              <Label>Level {el}</Label>
              <p className="text-sm text-muted-foreground">not created</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
