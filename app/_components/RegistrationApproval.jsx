"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const statusConfig = {
  pending: {
    icon: Clock,
    badgeClass: "bg-blue-600 text-primary-foreground hover:bg-blue-700",
    containerClass:
      "bg-blue-50 dark:bg-slate-900 border-l-4 border-blue-500 dark:border-blue-400",
    headingClass: "text-blue-900 dark:text-blue-100",
    textClass: "text-blue-700 dark:text-blue-200",
    label: "Pending",
  },
  accepted: {
    icon: CheckCircle2,
    badgeClass: "bg-green-600 text-primary-foreground hover:bg-green-700",
    containerClass:
      "bg-green-50 dark:bg-slate-900 border-l-4 border-green-500 dark:border-green-400",
    headingClass: "text-green-900 dark:text-green-100",
    textClass: "text-green-700 dark:text-green-200",
    label: "Approved",
  },
  rejected: {
    icon: XCircle,
    badgeClass: "bg-destructive text-destructive-foreground hover:bg-red-700",
    containerClass:
      "bg-red-50 dark:bg-slate-900 border-l-4 border-red-500 dark:border-red-400",
    headingClass: "text-red-900 dark:text-red-100",
    textClass: "text-red-700 dark:text-red-200",
    label: "Rejected",
  },
};

export default function RegistrationApproval({
  registrationStatus,
  rejectionReason,
  onApprove,
  onReject,
}) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: { reason: "" },
  });

  const statusInfo = statusConfig[registrationStatus] || statusConfig.pending;
  const StatusIcon = statusInfo?.icon || Clock;

  const handleApprove = () => {
    startTransition(async () => {
      try {
        await onApprove();
        toast.success("Registration approved!");
      } catch (error) {
        toast.error("Failed to approve registration");
        console.error(error);
      }
    });
  };

  const handleReject = form.handleSubmit(({ reason }) => {
    startTransition(async () => {
      try {
        await onReject(reason);
        toast.success("Registration rejected!");
        setShowRejectForm(false);
        form.reset();
      } catch (error) {
        toast.error("Failed to reject registration");
        console.error(error);
      }
    });
  });

  return (
    <div className="space-y-4">
      {/* Status Badge */}
      <div className="flex items-center gap-2">
        <StatusIcon className={`h-5 w-5 ${statusInfo.textClass}`} />
        <Badge className={statusInfo.badgeClass}>{statusInfo.label}</Badge>
      </div>

      {/* Pending Actions */}
      {(registrationStatus === "pending" ||
        registrationStatus === "rejected") && (
        <div className={`rounded-lg p-4 ${statusInfo.containerClass}`}>
          <h4 className={`mb-4 font-semibold ${statusInfo.headingClass}`}>
            Approval Action Required
          </h4>

          {!showRejectForm ? (
            <div className="flex gap-3">
              <Button
                onClick={handleApprove}
                disabled={isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                {isPending ? "Processing..." : "Approve"}
              </Button>

              <Button
                onClick={() => setShowRejectForm(true)}
                disabled={isPending}
                variant="outline"
                className="border-destructive text-destructive"
              >
                Reject
              </Button>
            </div>
          ) : (
            <form onSubmit={handleReject} className="space-y-3">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Rejection Reason *
                </label>
                <Textarea
                  placeholder="Enter the reason for rejecting this registration..."
                  rows={4}
                  className="resize-none"
                  {...form.register("reason", {
                    required: "Rejection reason is required",
                  })}
                />
                {form.formState.errors.reason && (
                  <p className="mt-1 text-sm text-destructive">
                    {form.formState.errors.reason.message}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  variant="destructive"
                  className={"bg-destructive"}
                  disabled={isPending}
                >
                  {isPending ? "Processing..." : "Confirm Rejection"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => {
                    setShowRejectForm(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Rejected */}
      {registrationStatus === "rejected" && rejectionReason && (
        <div className={`rounded-lg p-4 ${statusInfo.containerClass}`}>
          <h4 className={`mb-2 font-semibold ${statusInfo.headingClass}`}>
            Rejection Reason
          </h4>
          <p className={`text-sm ${statusInfo.textClass}`}>{rejectionReason}</p>
        </div>
      )}

      {/* Approved */}
      {registrationStatus === "accepted" && (
        <div className={`rounded-lg p-4 ${statusInfo.containerClass}`}>
          <h4 className={`mb-2 font-semibold ${statusInfo.headingClass}`}>
            Approved
          </h4>
          <p className={`text-sm ${statusInfo.textClass}`}>
            This registration was approved.
          </p>
        </div>
      )}
    </div>
  );
}
