"use client";

import { useState } from "react";
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
  approved: {
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
  onApprove,
  onReject,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  const statusInfo = statusConfig[registrationStatus];
  const StatusIcon = statusInfo.icon;
  const isPending = registrationStatus === "pending";

  // Ensure statusInfo properties are safely accessed
  const badgeClass = statusInfo?.badgeClass || "";
  const containerClass = statusInfo?.containerClass || "";
  const headingClass = statusInfo?.headingClass || "";
  const textClass = statusInfo?.textClass || "";

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await onApprove();
      toast.success("Registration approved!");
    } catch (error) {
      toast.error("Failed to approve registration");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    setIsProcessing(true);
    try {
      await onReject(rejectReason);
      toast.success("Registration rejected!");
      setShowRejectForm(false);
      setRejectReason("");
    } catch (error) {
      toast.error("Failed to reject registration");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Status Badge */}
      <div className="flex items-center gap-2">
        <StatusIcon className={`h-5 w-5 ${textClass}`} />
        <Badge className={badgeClass}>{statusInfo.label}</Badge>
      </div>

      {/* Approval Actions */}
      {isPending && (
        <div className={`rounded-lg p-4 ${containerClass}`}>
          <h4 className={`mb-4 font-semibold ${headingClass}`}>
            Approval Action Required
          </h4>
          {!showRejectForm ? (
            <div className="flex gap-3">
              <Button
                onClick={handleApprove}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
              >
                {isProcessing ? "Processing..." : "Approve"}
              </Button>
              <Button
                onClick={() => setShowRejectForm(true)}
                disabled={isProcessing}
                variant="outline"
                className="border-destructive text-destructive dark:border-red-500 dark:text-red-400 hover:bg-destructive/10 dark:hover:bg-red-950"
              >
                Reject
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Rejection Reason *
                </label>
                <Textarea
                  placeholder="Enter the reason for rejecting this registration..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleReject}
                  disabled={isProcessing || !rejectReason.trim()}
                  className="bg-destructive hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                >
                  {isProcessing ? "Processing..." : "Confirm Rejection"}
                </Button>
                <Button
                  onClick={() => {
                    setShowRejectForm(false);
                    setRejectReason("");
                  }}
                  disabled={isProcessing}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rejection Reason */}
      {registrationStatus === "rejected" && rejectReason && (
        <div className={`rounded-lg p-4 ${containerClass}`}>
          <h4 className={`mb-2 font-semibold ${headingClass}`}>
            Rejection Reason
          </h4>
          <p className={`text-sm ${textClass}`}>{rejectReason}</p>
        </div>
      )}

      {/* Approved Message */}
      {registrationStatus === "approved" && (
        <div className={`rounded-lg p-4 ${containerClass}`}>
          <h4 className={`mb-2 font-semibold ${headingClass}`}>Approved</h4>
          <p className={`text-sm ${textClass}`}>
            This registration was approved.
          </p>
        </div>
      )}
    </div>
  );
}
