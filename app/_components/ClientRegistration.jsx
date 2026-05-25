"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, GraduationCap, Tv2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/app/_components/EmptyState";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import TablePagination from "@/components/table/TablePagination";
import PencilLoader from "@/app/_components/PencilLoader";
import RegistrationCard from "@/app/_components/RegistrationCard";

export default function ClientRegistration({ searchParams = {} }) {
  const [activeTab, setActiveTab] = useState("internships");
  const [searchTerm, setSearchTerm] = useState("");

  const page = Number(searchParams?.page || 1);
  const pageSize = Number(searchParams?.page_size || 6);
  const registrationParams = {
    type: activeTab,
    search: searchTerm,
    page,
    limit: pageSize,
  };

  const registrationQuery = useQuery({
    queryKey: ["registration-list", activeTab, page, pageSize, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams({
        type: registrationParams.type,
        search: registrationParams.search,
        page: String(registrationParams.page),
        limit: String(registrationParams.limit),
      });

      const response = await fetch(`/api/registrations?${params.toString()}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Failed to fetch registrations");
      }

      return response.json();
    },
  });

  const registrationData = registrationQuery?.data;

  const queryRegistrations = registrationData?.registrations || [];
  const pagination = registrationData?.pagination || {
    total: queryRegistrations.length,
    page,
    limit: pageSize,
    totalPages: 1,
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

  const isLoading =
    registrationQuery?.isLoading || registrationQuery?.isFetching;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 md:px-8">
      {/* Search and Tab Row */}
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
      </div>

      {/* Registration Cards */}
      {isLoading ? (
        <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-border bg-card">
          <PencilLoader />
        </div>
      ) : registrationQuery?.isError ? (
        <EmptyState
          bg="bg-red-50/50"
          title="Failed to load registrations"
          description={registrationQuery?.error?.message || "Please try again."}
        />
      ) : queryRegistrations.length > 0 ? (
        <div className="space-y-4">
          <div className="grid gap-4">
            {queryRegistrations.map((registration) => (
              <RegistrationCard
                key={registration.id}
                registration={registration}
              />
            ))}
          </div>

          {pagination?.totalPages > 1 && (
            <TablePagination
              pagination={{
                ...pagination,
                page_size:
                  pagination?.page_size || pagination?.limit || pageSize,
              }}
            />
          )}
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
