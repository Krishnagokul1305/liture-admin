// ChartSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChartSkeleton() {
  return (
    <Card className="pt-0">
      <CardHeader className="border-b py-5">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-72 mt-2" />
      </CardHeader>
      <CardContent className="px-6">
        <Skeleton className="h-[250px] w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
