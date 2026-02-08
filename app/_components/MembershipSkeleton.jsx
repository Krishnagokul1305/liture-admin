import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function MembershipSkeleton() {
  return (
    <Card className="animate-pulse rounded-lg border border-gray-200">
      <CardHeader className="space-y-3">
        <div className="h-6 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
      </CardHeader>

      <CardContent className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded-full" />
            <div className="h-4 w-full bg-gray-200 rounded" />
          </div>
        ))}

        <div className="h-12 w-full bg-gray-200 rounded-lg mt-6" />
      </CardContent>
    </Card>
  );
}

export default MembershipSkeleton;
