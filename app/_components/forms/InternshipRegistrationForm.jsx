"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition, useRef, useState } from "react";
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
import { internshipregistrationaction } from "@/app/lib/action";

const internshipFormSchema = z.object({
  internship_id: z.number().min(1),
  reason: z.string().min(10, "Please explain briefly"),
  resume: z
    .any()
    .refine((files) => files && files.length > 0, "Resume is required"),
});

export default function InternshipRegistrationForm({ internshipId, close }) {
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const form = useForm({
    resolver: zodResolver(internshipFormSchema),
    defaultValues: {
      reason: "",
      internship_id: internshipId,
      resume: undefined,
    },
  });

  const onSubmit = (values) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("internship_id", values.internship_id);
      formData.append("reason", values.reason);
      if (values.resume?.[0]) {
        formData.append("resume", values.resume[0]);
      }

      const result = await internshipregistrationaction(formData);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Internship registration successful");
      close?.();
      form.reset({
        reason: "",
        internship_id: internshipId,
        resume: undefined,
      });
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
          name="internship_id"
          render={({ field }) => <input type="hidden" {...field} />}
        />

        {/* Reason */}
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want this internship?</FormLabel>
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

        {/* Resume */}
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume (PDF)</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <div
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                      isDragging
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 hover:bg-muted"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      field.onChange(e.dataTransfer.files);
                    }}
                  >
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF only, up to 10MB
                    </p>
                    {field.value?.[0]?.name && (
                      <p className="mt-2 text-xs font-medium text-gray-700">
                        {field.value[0].name}
                      </p>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Applying..." : "Apply Now"}
        </Button>
      </form>
    </Form>
  );
}
