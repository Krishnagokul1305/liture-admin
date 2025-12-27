import { Suspense } from "react";
import ChartSkeleton from "../_components/dashboard/ChartSkeleton";
import ChartWrapper from "../_components/dashboard/ChartWrapper";
import DashboardStats from "../_components/dashboard/DashboardStats";

function page() {
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <DashboardStats />
      <Suspense fallback={<ChartSkeleton />}>
        <ChartWrapper />
      </Suspense>
    </div>
  );
}

export default page;
