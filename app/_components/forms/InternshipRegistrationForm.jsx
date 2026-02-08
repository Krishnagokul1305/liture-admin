"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
// import Spinner from "../Spinner";
// import { useRegisterInternship } from "../../hooks/useRegisterInternship";

const internshipFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phoneNumber: z.string().min(10, "Enter a valid phone number").max(15),
  reason: z.string().min(10, "Please explain briefly"),
  internship: z.string().min(1, "Select an internship"),
});

export default function InternshipRegistrationForm({ internshipId, close }) {
  //   const { register, submitting } = useRegisterInternship();

  const form = useForm({
    resolver: zodResolver(internshipFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      reason: "",
      internship: internshipId,
    },
  });

  const onSubmit = (values) => {
    // register(values, {
    //   onSuccess: () => {
    //     toast.success("Internship registration successful");
    //     close();
    //     form.reset({
    //       ...form.getValues(),
    //       fullName: "",
    //       email: "",
    //       phoneNumber: "",
    //       reason: "",
    //     });
    //   },
    //   onError: (err) => {
    //     toast.error(err.message);
    //   },
    // });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-w-lg"
      >
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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

        {/* Submit */}
        <Button type="submit" className="w-full">
          {/* {submitting ? <Spinner size={20} /> : "Apply Now"} */}apply
        </Button>
      </form>
    </Form>
  );
}
