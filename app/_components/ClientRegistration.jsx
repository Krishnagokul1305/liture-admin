"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  GraduationCap,
  Tv2,
  Users,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/app/_components/EmptyState";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Mock data matching the provided data structure
const mockRegistrations = [];

const getRegistrationType = (title) => {
  if (title.toLowerCase().includes("internship")) return "internships";
  if (
    title.toLowerCase().includes("webinar") ||
    title.toLowerCase().includes("workshop")
  )
    return "webinars";
  return "memberships";
};

export default function ClientRegistration() {
  const [activeTab, setActiveTab] = useState("internships");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");
  const [expandedRejection, setExpandedRejection] = useState(null);

  const filteredRegistrations = useMemo(() => {
    let filtered = mockRegistrations.filter((reg) => {
      const regType = getRegistrationType(reg.title);
      return regType === activeTab;
    });

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (reg) =>
          reg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.user_email.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((reg) => reg.status === filterStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.registered_at).getTime();
      const dateB = new Date(b.registered_at).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [activeTab, searchTerm, filterStatus, sortOrder]);

  const getStatusColor = (status) => {
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
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case "internships":
        return <GraduationCap className="h-4 w-4 shrink-0" />;
      case "webinars":
        return <Tv2 className="h-4 w-4 shrink-0" />;
      case "memberships":
        return <Users className="h-4 w-4 shrink-0" />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 md:px-8">
      {/* Search and Filter Row */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left Side: Search + Tab Navigation Select */}
        <div className="flex flex-1 flex-col sm:flex-row gap-3 md:max-w-xl sm:items-stretch">
          {/* Search Input */}
          <div className="relative flex-1 flex items-stretch">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search registrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/40 w-full"
            />
          </div>

          {/* Navigation Select */}
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full sm:w-[180px] py-5 bg-background border-input text-foreground capitalize flex items-center justify-between">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="internships" className="capitalize">
                <span className="flex items-center gap-2">
                  {getTabIcon("internships")} Internships
                </span>
              </SelectItem>
              <SelectItem value="webinars" className="capitalize">
                <span className="flex items-center gap-2">
                  {getTabIcon("webinars")} Webinars
                </span>
              </SelectItem>
              <SelectItem value="memberships" className="capitalize">
                <span className="flex items-center gap-2">
                  {getTabIcon("memberships")} Memberships
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right Side: Filter + Sort Dropdowns */}
        <div className="flex gap-3 justify-end items-center">
          {/* Filter Dropdown */}
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-10 border-border bg-background text-foreground hover:bg-muted"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <div className="absolute right-0 top-full z-20 mt-2 hidden w-48 rounded-lg border border-border bg-background shadow-xl group-hover:block">
              {["all", "pending", "accepted", "rejected"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                    filterStatus === status
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-10 border-border bg-background text-foreground hover:bg-muted"
            >
              <ArrowUpDown className="h-4 w-4" />
              <span className="hidden sm:inline">Sort</span>
            </Button>
            <div className="absolute right-0 top-full z-20 mt-2 hidden w-48 rounded-lg border border-border bg-background shadow-xl group-hover:block">
              {["latest", "oldest"].map((order) => (
                <button
                  key={order}
                  onClick={() => setSortOrder(order)}
                  className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                    sortOrder === order
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {order.charAt(0).toUpperCase() + order.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Registration Cards */}
      {filteredRegistrations.length > 0 ? (
        <div className="grid gap-4">
          {filteredRegistrations.map((registration) => (
            <Card
              key={registration.id}
              className="group border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
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
                  <Badge
                    className={`${getStatusColor(registration.status)} border`}
                  >
                    {getStatusLabel(registration.status)}
                  </Badge>
                  {registration.status === "rejected" &&
                    registration.reason && (
                      <button
                        onClick={() =>
                          setExpandedRejection(
                            expandedRejection === registration.id
                              ? null
                              : registration.id,
                          )
                        }
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <ChevronDown
                          className={`h-3 w-3 transition-transform ${
                            expandedRejection === registration.id
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                        View reason
                      </button>
                    )}
                </div>
              </div>

              {/* Rejection Reason */}
              {registration.status === "rejected" &&
                expandedRejection === registration.id &&
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
          ))}
        </div>
      ) : (
        <EmptyState
          bg="bg-red-50/50"
          title={
            activeTab === "internships"
              ? "No internships"
              : activeTab === "webinars"
                ? "No webinars"
                : "No memberships"
          }
          description={
            activeTab === "internships"
              ? "No internships match your search right now."
              : activeTab === "webinars"
                ? "No webinars match your search right now."
                : "No memberships match your search right now."
          }
        />
      )}
    </div>
  );
}
