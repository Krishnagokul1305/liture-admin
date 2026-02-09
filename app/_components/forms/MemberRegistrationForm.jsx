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
import { membershipregistrationaction } from "@/app/lib/action";

const membershipFormSchema = z.object({
  membership_id: z.number().min(1),
  reason: z.string().min(10, "Please explain briefly"),
});

export default function MembershipRegistrationForm({ membershipId, close }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(membershipFormSchema),
    defaultValues: {
      reason: "",
      membership_id: membershipId,
    },
  });

  const onSubmit = (values) => {
    startTransition(async () => {
      try {
        await membershipregistrationaction(values);
        toast.success("Registered successfully");
        close?.();
        form.reset({ reason: "", membership_id: membershipId });
      } catch (err) {
        toast.error(err?.message || "Registration failed");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-w-lg"
      >
        <FormField
          control={form.control}
          name="membership_id"
          render={({ field }) => <input type="hidden" {...field} />}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want this membership?</FormLabel>
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

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
