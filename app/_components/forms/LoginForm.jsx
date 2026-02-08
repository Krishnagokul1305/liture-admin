"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { signInSchema } from "../../lib/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { signInAction } from "../../lib/action";
import { useRouter } from "next/navigation";

export function LoginForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await signInAction(data);
      toast.success("Logged in successfully");
    } catch (error) {
      if (error?.digest?.startsWith("NEXT_REDIRECT")) return;
      toast.error("Invalid email or password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Sign in with your email
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
        <InputField
          id="password"
          label="Password"
          placeholder={"********"}
          type="password"
          register={register("password")}
          error={errors.password}
          disabled={isSubmitting}
        />
        <Link
          href="forgot-password"
          className="text-sm text-muted-foreground underline text-right"
        >
          Forgot password ?
        </Link>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="underline text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
