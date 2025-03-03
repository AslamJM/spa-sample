import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useCreateFeedbackForm } from "@/hooks/use-feedback";

export default function CreateFeedback() {
  const { mutate, isPending } = useCreateFeedbackForm();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Create Feedback Form</AccordionTrigger>
        <AccordionContent>
          <form
            className="p-2 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const name = formData.get("name") as string;
              const description = formData.get("description") as string;
              mutate({ name, description });
            }}
          >
            <Input name="name" placeholder="Title" />
            <Textarea placeholder="Descripiton" name="description" />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
