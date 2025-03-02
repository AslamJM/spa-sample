import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function CreateFeedback() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Create Feedback Form</AccordionTrigger>
        <AccordionContent>
          <form className="p-2 space-y-4">
            <Input name="name" placeholder="Title" />
            <Textarea placeholder="Descripiton" name="description" />
            <Button>Create</Button>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
