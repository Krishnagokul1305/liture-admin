import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Header */}
      <div className="flex md:items-center flex-col lg:flex-row justify-between mb-6">
        <div className="space-y-2 w-full lg:w-auto">
          <Skeleton className="h-6 md:h-10 w-40 md:w-60 rounded-md" />
          <Skeleton className="h-4 md:h-5 w-64 md:w-80 rounded-md mt-1" />
        </div>
        <Skeleton className="h-10 w-32 mt-5 lg:mt-0 rounded-md" />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row rounded-md gap-4 items-center justify-between">
        <Skeleton className="h-10 w-full md:w-64 rounded-md" />
        <div className="w-full md:w-fit flex gap-4 items-center">
          <Skeleton className="h-10 w-full md:w-32 rounded-md" />
          <Skeleton className="h-10 w-full md:w-32 rounded-md" />
        </div>
      </div>

      {/* Table / Empty state */}
      <div className="flex flex-col gap-4 mt-4">
        <Skeleton className="h-[50vh] w-full rounded-md" />
      </div>
    </div>
  );
}
