import { useMyFeedbacks } from "@/hooks/use-feedback";
import { SelectSeparator } from "../ui/select";
import Spinner from "../custom/spinner";
import FeedbackFormCard from "./feedback-form-card";

export default function MyForms() {
  const { data, isLoading } = useMyFeedbacks();

  return (
    <div className="space-y-2">
      <h5 className="text-sm font-semibold">Forms Created By Me</h5>
      <SelectSeparator className="mb-4" />
      {isLoading && (
        <div className="py-4 flex items-center gap-2">
          <Spinner /> <span>Getting...</span>
        </div>
      )}
      {data && data.length === 0 && (
        <div className="py-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            No forms created by you
          </span>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {data?.map((form) => (
          <FeedbackFormCard key={form.id} form={form} />
        ))}
      </div>
    </div>
  );
}
