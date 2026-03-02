"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { webinarregistrationaction } from "@/app/lib/action";

const webinarFormSchema = z.object({
  webinar_id: z.number().min(1),
  reason: z.string().min(10, "Please explain briefly"),
});

export default function WebinarRegistrationForm({ webinarId, close }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(webinarFormSchema),
    defaultValues: {
      reason: "",
      webinar_id: webinarId,
    },
  });

  const onSubmit = (values) => {
    startTransition(async () => {
      const result = await webinarregistrationaction(values);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Webinar registration successful");
      close?.();
      form.reset({ reason: "", webinar_id: webinarId });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
        className="space-y-5 max-w-lg"
      >
        <FormField
          control={form.control}
          name="webinar_id"
          render={({ field }) => <input type="hidden" {...field} />}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want to attend this webinar?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us briefly..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Registering..." : "Register Now"}
        </Button>
      </form>
    </Form>
  );
}
