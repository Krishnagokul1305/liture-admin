"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
// import { resetPasswordAction } from "../../lib/action";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import { resetPasswordAction } from "@/app/lib/action";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm({ token }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (!token) {
        toast.error("Invalid or expired reset link");
        return;
      }
      await resetPasswordAction(token, data.password);
      toast.success("Password reset successful");
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6")}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter a new password below
        </p>
      </div>

      <div className="grid gap-6">
        <InputField
          id="password"
          label="New Password"
          type="password"
          placeholder="********"
          register={register("password")}
          error={errors.password}
          disabled={isSubmitting}
        />

        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="********"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          disabled={isSubmitting}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </Button>
      </div>
    </form>
  );
}
