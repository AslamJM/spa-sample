import Spinner from "@/components/custom/spinner";
import { reactionIcons } from "@/components/response/reaction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePublicForm, usePublicFormReaction } from "@/hooks/use-public";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/pub/form/$id")({
  component: RouteComponent,
});

type Form = {
  name: string;
  phone: string;
  address: string;
  feedback: string;
  reaction: number | null;
};

function RouteComponent() {
  const { data, isLoading } = usePublicForm();
  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    address: "",
    feedback: "",
    reaction: null,
  });

  const { mutateAsync, isPending } = usePublicFormReaction();

  const handleSubmit = async () => {
    if (!form.reaction) {
      return;
    }

    const response = await mutateAsync({
      name: form.name,
      phone: form.phone,
      address: form.address,
      comments: form.feedback,
      points: form.reaction,
    });

    if (response.success) {
      setForm({
        name: "",
        phone: "",
        address: "",
        feedback: "",
        reaction: null,
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-background   w-[600px]  h-full p-4">
        <div className="space-y-4 mt-12">
          <CardTitle className="text-xl font-bold text-center">
            Feedback Form
          </CardTitle>
          {isLoading && (
            <div className="flex items-center gap-2">
              <Spinner />
              Loading...
            </div>
          )}
          {data && (
            <Card>
              <CardContent>
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold">{data.name}</h5>
                  <p className="text-sm text-muted-foreground">
                    {data.description}
                  </p>
                  <div className="flex items-center gap-2">
                    {reactionIcons.map((reaction) => (
                      <Button
                        key={reaction.points}
                        variant="ghost"
                        onClick={() =>
                          setForm({ ...form, reaction: reaction.points })
                        }
                        className={cn(
                          form.reaction === reaction.points &&
                            "bg-primary text-primary-foreground"
                        )}
                      >
                        <reaction.Icon />
                      </Button>
                    ))}
                  </div>
                  <Textarea
                    placeholder="Write your feedback here..."
                    value={form.feedback}
                    onChange={(e) =>
                      setForm({ ...form, feedback: e.target.value })
                    }
                  />
                  <div className="space-y-2">
                    <Label>Personal Info (Optional)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                      <Input
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </div>
                    <Input
                      placeholder="Address"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" onClick={handleSubmit}>
                      {isPending && <Spinner />}
                      {"Submit"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
