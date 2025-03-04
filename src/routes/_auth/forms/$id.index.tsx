import Spinner from "@/components/custom/spinner";
import { reactionIcons } from "@/components/response/reaction";
import { ResponseCard } from "@/components/response/response-card";
import { SelectSeparator } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Reaction, useMySingleFeedback } from "@/hooks/use-feedback";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

export const Route = createFileRoute("/_auth/forms/$id/")({
  component: RouteComponent,
});

const calculateReactionCount = (reactions: Reaction[]) => {
  const count: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  reactions.forEach((reaction) => {
    count[reaction.points as keyof typeof count]++;
  });

  return count;
};

function RouteComponent() {
  const { data, isLoading } = useMySingleFeedback();
  const navigate = Route.useNavigate();

  const sortedResponses = useMemo(() => {
    if (!data) return;
    const icons = reactionIcons.map((ri) => ({
      ...ri,
      count: calculateReactionCount(data.responses)[ri.points],
    }));
    return icons.sort((a, b) => b.count - a.count);
  }, [data]);

  return (
    <div>
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate({ to: "/forms" })}
          className="my-2"
        >
          <ChevronLeftIcon />
          Forms
        </Button>
      </div>
      {isLoading && (
        <div className="flex items-center gap-2">
          <Spinner /> <span>Loading...</span>
        </div>
      )}
      {data && (
        <div className="space-y-2">
          <div className="p-4 bg-violet-100 rounded-lg">
            <h5 className="font-bold">{data.name}</h5>
            <p className="text-sm text-muted-foreground">{data.description}</p>
            <div className="flex items-center gap-4">
              {sortedResponses?.map((ri) => (
                <div key={ri.points} className="flex items-center gap-1 ">
                  <ri.Icon className={`w-4 h-4 ${ri.color}`} />
                  <span className="text-sm text-muted-foreground">
                    {ri.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 mt-6">
            <h6 className="text-lg font-bold">Feedbacks</h6>
            <SelectSeparator />
            {data.responses.length === 0 && (
              <p className="text-sm text-muted-foreground">No feedbacks yet</p>
            )}
            {data.responses.map((response, i) => (
              <ResponseCard key={`res-${i}`} response={response} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
