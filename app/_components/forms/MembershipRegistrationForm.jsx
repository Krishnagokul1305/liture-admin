"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

import {
  createMembershipRegistrationAction,
  updateMembershipRegistrationAction,
} from "@/app/lib/action";

/* -------------------- schema -------------------- */
const membershipRegistrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  reason: z.string().min(1, "Reason is required"),
  membership: z.string().min(1, "Please select a membership"),
});

/* -------------------- component -------------------- */
export default function MembershipRegistrationForm({
  mode = "create", // create | edit | view
  registrationId,
  initialData,
  membershipOptions = [], // [{ label, value }]
}) {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isCreate = mode === "create";

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(membershipRegistrationSchema),
    defaultValues: {
      fullName: initialData?.fullName ?? "",
      email: initialData?.email ?? "",
      phoneNumber: initialData?.phoneNumber ?? "",
      reason: initialData?.reason ?? "",
      membership: initialData?.membership?._id ?? "",
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      if (isCreate) {
        toast.promise(createMembershipRegistrationAction(data), {
          loading: "Creating registration...",
          success: "Registration created!",
          error: "Something went wrong",
        });
        toast.success("Registration created!");
      } else {
        toast.promise(
          updateMembershipRegistrationAction(registrationId, data),
          {
            loading: "Updating registration...",
            success: "Registration updated!",
            error: "Something went wrong",
          }
        );
      }
      router.refresh();
      router.back();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
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

        {/* Membership */}
        {isView ? (
          <div className="space-y-2">
            <FormLabel>Membership</FormLabel>
            <Input
              disabled
              value={initialData?.membership?.name || ""}
              className="py-6"
            />
          </div>
        ) : (
          <FormField
            control={form.control}
            name="membership"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Membership</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={submitting}
                >
                  <FormControl>
                    <SelectTrigger className="py-6 w-full">
                      <SelectValue placeholder="Select membership" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {membershipOptions.map((opt) => (
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
              <FormMessage />
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
