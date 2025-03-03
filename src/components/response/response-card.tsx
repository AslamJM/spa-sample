import { Reaction } from "@/hooks/use-feedback";
import { reactionIcons } from "./reaction";
import { cn } from "@/lib/utils";

type ResponseCardProps = {
  response: Reaction;
};

export const ResponseCard = ({ response }: ResponseCardProps) => {
  const Icon = reactionIcons.find((ri) => ri.points === response.points);
  if (!Icon) return null;

  return (
    <div className="space-y-1">
      <div className="flex items-center  gap-2">
        <Icon.Icon className={cn(Icon.color, "w-4 h-4")} />
        <span className="text-sm text-muted-foreground italic">by</span>{" "}
        <span className="text-sm font-medium text-primary">
          {response.name ?? "Anonymous"}
        </span>
        <span className="text-sm text-muted-foreground"></span>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{response.comments}</p>
      </div>
    </div>
  );
};
