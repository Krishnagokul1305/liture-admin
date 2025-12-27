import { Suspense } from "react";
import ChartSkeleton from "../_components/dashboard/ChartSkeleton";
import DashboardStatsSkeleton from "../_components/dashboard/DashboardStatsSkeleton";
import ChartWrapper from "../_components/dashboard/ChartWrapper";
import DashboardStats from "../_components/dashboard/DashboardStats";
import RecentRegistrationsTable from "../_components/dashboard/RecentRegistrationsTable";
import TableSkeleton from "../_components/dashboard/TableSkeleton";

function page() {
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>
      <Suspense fallback={<ChartSkeleton />}>
        <ChartWrapper />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <RecentRegistrationsTable />
      </Suspense>
    </div>
  );
}

export default page;
