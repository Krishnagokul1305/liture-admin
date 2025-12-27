// components/table/TableSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="bg-sidebar rounded-lg overflow-hidden">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <Skeleton className="h-5 w-40" />
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-6 gap-4 px-6 py-3 border-b">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-6 gap-4 px-6 py-4 border-b last:border-b-0"
        >
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-28" />
        </div>
      ))}
    </div>
  );
}
