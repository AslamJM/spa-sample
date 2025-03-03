import { FeedBackForm } from "@/hooks/use-feedback";
import { CardDescription, CardTitle } from "../ui/card";

export default function FeedbackFormCard({ form }: { form: FeedBackForm }) {
  return (
    <div className="p-4 border rounded-md cursor-pointer hover:bg-muted transition-all duration-200">
      <CardTitle>{form.name}</CardTitle>
      <CardDescription>{form.description}</CardDescription>
    </div>
  );
}
