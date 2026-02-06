import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const chartCategories = ["Internship", "Webinar", "Membership"];

export default function ChartPieSkeleton() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4">
      {Array.from(chartCategories, (category, index) => (
        <Card key={index} className="flex flex-col pt-0">
          <CardHeader className="py-5">
            {/* Skeleton for the title */}
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72 mt-2" />
          </CardHeader>
          <CardContent className="px-6">
            {/* Skeleton for the pie chart (circular shape) */}
            <Skeleton className="h-[250px] w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
