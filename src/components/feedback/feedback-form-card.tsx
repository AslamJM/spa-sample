import { FeedBackForm } from "@/hooks/use-feedback";
import { CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, CopyIcon } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export default function FeedbackFormCard({ form }: { form: FeedBackForm }) {
  const router = useRouter();
  return (
    <div className="p-4 border rounded-md   transition-all duration-200">
      <CardTitle>{form.name}</CardTitle>
      <CardDescription className="line-clamp-2">
        {form.description}
      </CardDescription>
      <div className="flex items-center gap-2 justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            navigator.clipboard.writeText(
              `${window.location.origin}/pub/form/${form.id}`
            )
          }
        >
          <CopyIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.navigate({ to: `/forms/${form.id}` })}
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
