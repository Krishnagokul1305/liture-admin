"use client";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import ImageUploader from "@/components/ImageUploader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createWebinarAction, updateWebinarAction } from "@/app/lib/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const webinarSchema = z.object({
  image: z.union([z.instanceof(File), z.string().url(), z.null()]).optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  event_date: z.date({ message: "Event date is required" }),
  is_active: z.boolean(),
});

export default function WebinarForm({
  mode = "create",
  initialData = null,
  webinarId,
}) {
  const router = useRouter();
  const isViewMode = mode === "view";

  const form = useForm({
    resolver: zodResolver(webinarSchema),
    defaultValues: {
      image: initialData?.image || null,
      title: initialData?.title || "",
      description: initialData?.description || "",
      event_date: initialData?.event_date
        ? new Date(initialData.event_date)
        : new Date(),
      is_active:
        initialData?.is_active !== undefined ? initialData.is_active : true,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("event_date", data.event_date.toISOString());
      formData.append("is_active", data.is_active.toString());

      if (data.image instanceof File) {
        formData.append("image", data.image); // original file
      }

      if (mode === "create") {
        toast.promise(createWebinarAction(formData), {
          loading: "Creating Webinar...",
          success: "Created Webinar successfully!",
          error: "Error Creating Webinar",
        });
      }

      if (mode === "edit") {
        toast.promise(updateWebinarAction(webinarId, formData), {
          loading: "Updating Webinar...",
          success: "Updated Webinar successfully!",
          error: "Error Updating Webinar",
        });
      }

      router.push("/webinars");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className={"py-5"}
                  placeholder="Enter webinar title"
                  disabled={isViewMode}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter webinar description"
                  disabled={isViewMode}
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={"mb-1"}>Image</FormLabel>
              <FormControl>
                <ImageUploader
                  image={field.value}
                  disabled={isViewMode}
                  onImageChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name="event_date"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        disabled={isViewMode}
                        className="w-full justify-start text-left font-normal bg-transparent py-5"
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date > new Date("2100-12-31")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={field.value ? "true" : "false"}
                  disabled={isViewMode}
                >
                  <FormControl>
                    <SelectTrigger className={"w-full py-5"}>
                      <SelectValue placeholder="Select a status" />
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
        </div>

        {!isViewMode && (
          <Button
            type="submit"
            className={"d-block ms-auto"}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin border-white dark:border-black"></div>
              </div>
            ) : (
              `${mode === "create" ? "Create" : "Update"}`
            )}
          </Button>
        )}
      </form>
    </Form>
  );
}
