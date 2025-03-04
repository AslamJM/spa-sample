import { Reaction } from "@/hooks/use-feedback";
import { reactionIcons } from "./reaction";
import { cn } from "@/lib/utils";
import { SelectSeparator } from "../ui/select";
import { MapPin, Phone } from "lucide-react";

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
          {response.name !== "" ? response.name : "Anonymous"}
        </span>
        {response.phone !== "" && (
          <span className="text-sm font-thin text-[12px] flex items-center gap-1 text-muted-foreground">
            <Phone className="w-4 h-4 text-violet-300" /> {response.phone}
          </span>
        )}
        {response.address !== "" && (
          <span className="text-sm font-thin text-[12px] flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4 text-violet-300" /> {response.address}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{response.comments}</p>
      </div>
      <SelectSeparator />
    </div>
  );
};
