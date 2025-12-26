"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const registrationSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    reason: z.string().min(1, "Reason is required"),
    type: z.enum(["internship", "webinar"], {
      message: "Please select a type",
    }),
    internship: z.string().optional(),
    webinar: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "internship") return !!data.internship;
      if (data.type === "webinar") return !!data.webinar;
      return true;
    },
    { message: "Please select an option", path: ["internship"] }
  );

export default function RegistrationForm() {
  const router = useRouter();
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

  const typeValue = form.watch("type");

  // Fetch internships
  const { data: internshipsData, isLoading: loadingInternships } = useQuery({
    queryKey: ["internships"],
    queryFn: async () => {
      const res = await fetch("/api/internships/minimal");
      const data = await res.json();
      return data.success ? data.data : [];
    },
    enabled: typeValue === "internship",
  });

  // Fetch webinars
  const { data: webinarsData, isLoading: loadingWebinars } = useQuery({
    queryKey: ["webinars"],
    queryFn: async () => {
      const res = await fetch("/api/webinars/minimal");
      const data = await res.json();
      return data.success ? data.data : [];
    },
    enabled: typeValue === "webinar",
  });
  const options =
    typeValue === "internship" ? internshipsData || [] : webinarsData || [];
  const loadingOptions =
    typeValue === "internship" ? loadingInternships : loadingWebinars;

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to register");

      toast.success("Registration successful!");
      router.push("/success");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit registration");
    } finally {
      setSubmitting(false);
    }
  };

  console.log(internshipsData);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Info */}
        <div className="grid md:gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className={"py-6"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className={"py-6"}
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  className={"py-6"}
                  type="tel"
                  placeholder="Enter your phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type Selection */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                className={"py-6"}
                disabled={submitting}
              >
                <FormControl>
                  <SelectTrigger className="w-full py-6">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Opportunity Selection */}
        {loadingInternships || loadingWebinars ? (
          <Skeleton className={"w-full h-16"} />
        ) : (
          <FormField
            control={form.control}
            name={typeValue === "internship" ? "internship" : "webinar"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {typeValue === "internship"
                    ? "Select Internship"
                    : "Select Webinar"}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  disabled={loadingOptions || submitting}
                >
                  <FormControl>
                    <SelectTrigger className="w-full py-6">
                      <SelectValue
                        placeholder={
                          loadingOptions ? "Loading..." : `Select ${typeValue}`
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options.length > 0 ? (
                      options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        {loadingOptions ? "Loading..." : "No options available"}
                      </SelectItem>
                    )}
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
              <FormLabel>Why are you interested?</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us why" {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Registration"}
        </Button>
      </form>
    </Form>
  );
}
