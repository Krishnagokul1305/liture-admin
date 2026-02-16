"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import InputField from "../InputField";
import { forgotPasswordAction } from "@/app/lib/action";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export function ForgotPasswordForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    toast.promise(
      (async () => {
        await forgotPasswordAction(data.email);
        return true;
      })(),
      {
        loading: "Sending reset link...",
        success: "Reset link sent to your email",
        error: "Error sending the link",
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email and we’ll send you a reset link
        </p>
      </div>

      <div className="grid gap-6">
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="m@example.com"
          register={register("email")}
          error={errors.email}
          disabled={isSubmitting}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>
      </div>
    </form>
  );
}
