"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  createRegistrationAction,
  updateRegistrationAction,
  // updateRegistrationAction,
} from "@/app/lib/action";
import { useRouter } from "next/navigation";

const registrationSchema = z
  .object({
    fullName: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string().min(10),
    reason: z.string().min(1),
    type: z.enum(["internship", "webinar"]),
    internship: z.string().optional(),
    webinar: z.string().optional(),
  })
  .refine(
    (data) =>
      data.type === "internship"
        ? !!data.internship
        : data.type === "webinar"
        ? !!data.webinar
        : true,
    { message: "Please select an option" }
  );

export default function RegistrationForm({
  mode = "create",
  registrationId,
  initialData,
}) {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isCreate = mode === "create";

  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      reason: "",
      type: "internship",
      internship: "",
      webinar: "",
    },
  });
  const router = useRouter();
  const type = initialData?.type;
  /* -------------------- hydrate initial data -------------------- */
  useEffect(() => {
    if (!initialData) return;

    form.reset({
      fullName: initialData.fullName,
      email: initialData.email,
      phoneNumber: initialData.phoneNumber,
      reason: initialData.reason,
      type: initialData.type,
      internship: initialData.internship?._id ?? "",
      webinar: initialData.webinar?._id ?? "",
    });
  }, [initialData, form]);

  const typeValue = form.watch("type");

  /* -------------------- options fetch -------------------- */
  const { data: internshipsData, isLoading: loadingInternships } = useQuery({
    queryKey: ["internships"],
    queryFn: async () => {
      const res = await fetch("/api/internships/minimal");
      const data = await res.json();
      return data.success ? data.data : [];
    },
    enabled: typeValue === "internship" && !isView,
  });

  const { data: webinarsData, isLoading: loadingWebinars } = useQuery({
    queryKey: ["webinars"],
    queryFn: async () => {
      const res = await fetch("/api/webinars/minimal");
      const data = await res.json();
      return data.success ? data.data : [];
    },
    enabled: typeValue === "webinar" && !isView,
  });

  const options =
    typeValue === "internship" ? internshipsData || [] : webinarsData || [];
  const loadingOptions =
    typeValue === "internship" ? loadingInternships : loadingWebinars;

  /* -------------------- submit -------------------- */
  const onSubmit = async (data) => {
    setSubmitting(true);

    const action = isCreate
      ? createRegistrationAction(data)
      : updateRegistrationAction(registrationId, data, type);

    toast.promise(action, {
      loading: isEdit ? "Updating registration..." : "Creating registration...",
      success: isEdit ? "Registration updated!" : "Registration created!",
      error: "Something went wrong",
    });

    setSubmitting(false);
    router.refresh();
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-4">
          {["fullName", "email"].map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {name === "fullName" ? "Full Name" : "Email"}
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isView} {...field} className="py-6" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input disabled={isView} {...field} className="py-6" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isView}
              >
                <FormControl>
                  <SelectTrigger className="py-6 w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {isView ? (
          <div className="space-y-2">
            <FormLabel>
              {typeValue === "internship" ? "Internship" : "Webinar"}
            </FormLabel>
            <Input
              disabled
              value={
                typeValue === "internship"
                  ? initialData?.internship?.title || ""
                  : initialData?.webinar?.title || ""
              }
              className="py-6"
            />
          </div>
        ) : loadingOptions ? (
          <Skeleton className="h-16 w-full" />
        ) : (
          <FormField
            control={form.control}
            name={typeValue === "internship" ? "internship" : "webinar"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {typeValue === "internship" ? "Internship" : "Webinar"}
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={submitting}
                >
                  <FormControl>
                    <SelectTrigger className="py-6 w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Reason */}
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea disabled={isView} {...field} rows={4} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit */}
        {!isView && (
          <Button type="submit" disabled={submitting}>
            {isEdit ? "Update Registration" : "Submit Registration"}
          </Button>
        )}
      </form>
    </Form>
  );
}
