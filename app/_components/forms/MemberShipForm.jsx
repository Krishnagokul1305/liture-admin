"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
  createMembershipAction,
  updateMembershipAction,
} from "@/app/lib/action";
import { toast } from "sonner";

const membershipSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  benefits: z.array(z.string().min(1, "Benefit cannot be empty")),
  is_active: z.boolean(),
});

export default function MembershipForm({
  mode = "create", // "create" | "edit"
  close,
  initialData = null,
}) {
  const form = useForm({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      benefits: initialData?.benefits?.length ? initialData.benefits : [""],
      is_active: initialData?.is_active ?? true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "benefits",
  });

  const handleSubmit = (data) => {
    try {
      if (mode == "create") {
        toast.promise(createMembershipAction(data), {
          loading: "Updating Internship...",
          success: "Updated Internship successfully!",
          error: "Error Updating Internship",
        });
      } else {
        toast.promise(updateMembershipAction(initialData.id, data), {
          loading: "Updating Internship...",
          success: "Updated Internship successfully!",
          error: "Error Updating Internship",
        });
      }
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Membership Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membership Name</FormLabel>
              <FormControl>
                <Input className="py-5" placeholder="Premium" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Describe this membership plan"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Benefits */}
        <FormItem>
          <FormLabel>Benefits</FormLabel>
          <FormDescription>
            List the features included in this membership
          </FormDescription>

          <div className="space-y-3">
            {fields.map((item, index) => (
              <FormField
                key={item.id}
                control={form.control}
                name={`benefits.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          className="py-5"
                          placeholder="Unlimited webinars"
                          {...field}
                        />
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => append("")}
            >
              + Add Benefit
            </Button>
          </div>
        </FormItem>

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="max-w-xs">
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={(v) => field.onChange(v === "true")}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="py-5 w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          className="d-block ms-auto"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin border-white" />
          ) : mode === "create" ? (
            "Create Membership"
          ) : (
            "Update Membership"
          )}
        </Button>
      </form>
    </Form>
  );
}
