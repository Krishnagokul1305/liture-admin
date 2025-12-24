"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../lib/zod";
import { registerUserAction } from "../lib/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegisterForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await registerUserAction(data);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        {/* Reuse InputField for fullName, email, and password */}
        <InputField
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          register={register("name")}
          error={errors.name}
          disabled={isSubmitting}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="m@example.com"
          register={register("email")}
          error={errors.email}
          disabled={isSubmitting}
        />
        <InputField
          id="password"
          label="Password"
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
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
