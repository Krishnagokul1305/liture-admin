"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { verifyEmailAction } from "@/app/lib/action";
import { cn } from "@/lib/utils";

function VerifyEmailForm({ token }) {
  const router = useRouter();
  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      if (!token) {
        toast.error("Invalid or expired verification link");
        router.push("/signup");
        return;
      }

      const action = verifyEmailAction(token);

      toast.promise(action, {
        loading: "Verifying your email...",
        success: "Email verified successfully",
        error: (error) => error?.message || "Verification failed",
      });

      try {
        await action;
        if (cancelled) return;
        router.push("/login");
      } catch {
        if (cancelled) return;
        router.push("/signup");
      }
    };

    verify();

    return () => {
      cancelled = true;
    };
  }, [token, router]);

  return (
    <div
      className={cn("flex flex-col items-center gap-4 text-center")}
      role="status"
      aria-live="polite"
    >
      <h1 className="text-2xl font-bold">Verifying your email</h1>
    </div>
  );
}

export default VerifyEmailForm;
