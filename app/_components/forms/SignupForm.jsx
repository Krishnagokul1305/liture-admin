"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { signUpSchema } from "../../lib/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
// import { signUpAction } from "../../lib/action";
import { useRouter } from "next/navigation";
import { signupUserAction } from "@/app/lib/action";
import * as z from "zod";

export const customSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  email: z.string().email("Please enter a valid email"),

  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

function SignupForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      phone_number: "",
    },
    resolver: zodResolver(customSignupSchema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    const result = await signupUserAction(data);

    // Handle field validation errors
    if (result?.errors) {
      Object.entries(result.errors).forEach(([field, messages]) => {
        setError(field, {
          type: "server",
          message: Array.isArray(messages) ? messages[0] : messages,
        });
      });
      return;
    }

    // Handle general error
    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Account created successfully");
    router.push("/login");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Sign up with your details
        </p>
      </div>

      {/* Fields */}
      <div className="grid gap-6">
        <InputField
          id="name"
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
          id="phone_number"
          label="Phone Number"
          type="tel"
          placeholder="9876543210"
          register={register("phone_number")}
          error={errors.phone_number}
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Sign up"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline text-primary">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignupForm;
