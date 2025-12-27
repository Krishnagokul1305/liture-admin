// components/dashboard/DashboardStatsSkeleton.tsx
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="@container/card">
          <CardHeader className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-20" />
          </CardHeader>
          <CardFooter>
            <Skeleton className="h-4 w-40" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
