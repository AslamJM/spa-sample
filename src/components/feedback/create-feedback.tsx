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
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { formOptions } from "@tanstack/react-form";

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

const formOpt = formOptions({
  defaultValues: {
    name: "",
    description: "",
  },
  validators: {
    onChange: schema,
  },
});

export default function CreateFeedback() {
  const { create } = useCreateFeedbackForm();

  const form = useForm({
    ...formOpt,
    onSubmit: async ({ value, formApi }) => {
      const res = await create({
        name: value.name,
        description: value.description,
      });
      if (res) {
        formApi.reset();
      }
    },
  });
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Create Feedback Form</AccordionTrigger>
        <AccordionContent>
          <form
            className="p-2 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="name"
              children={(field) => (
                <Input
                  name="name"
                  placeholder="Title"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
            <form.Field
              name="description"
              children={(field) => (
                <Textarea
                  placeholder="Descripiton"
                  name="description"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              )}
            />
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
