"use client";

import { useState } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function getStatusColor(status) {
  switch (status) {
    case "accepted":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "pending":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "rejected":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-neutral-500/20 text-neutral-400";
  }
}

function getStatusLabel(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function RegistrationCard({ registration }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="group border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
            {registration.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {registration.user_email}
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <span className="text-xs text-muted-foreground">
              <span className="text-foreground/70">Registered:</span>{" "}
              {registration.registered_at}
            </span>
            <span className="text-xs text-muted-foreground">
              <span className="text-foreground/70">Attendance:</span>{" "}
              {registration.attended ? "✓ Yes" : "— No"}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <Badge className={`${getStatusColor(registration.status)} border`}>
            {getStatusLabel(registration.status)}
          </Badge>
          {registration.status === "rejected" && registration.reason && (
            <button
              onClick={() => setIsExpanded((current) => !current)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ChevronDown
                className={`h-3 w-3 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
              View reason
            </button>
          )}
        </div>
      </div>

      {registration.status === "rejected" &&
        isExpanded &&
        registration.reason && (
          <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/10 p-4">
            <div className="flex gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
              <div>
                <p className="font-medium text-destructive">
                  Reason for Rejection
                </p>
                <p className="mt-1 text-sm text-destructive/80">
                  {registration.reason}
                </p>
              </div>
            </div>
          </div>
        )}
    </Card>
  );
}
