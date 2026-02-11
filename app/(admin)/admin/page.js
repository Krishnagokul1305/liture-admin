import { Suspense } from "react";
import ChartSkeleton from "@/app/_components/dashboard/ChartSkeleton";
import DashboardStatsSkeleton from "@/app/_components/dashboard/DashboardStatsSkeleton";
import ChartWrapper from "@/app/_components/dashboard/ChartWrapper";
import DashboardStats from "@/app/_components/dashboard/DashboardStats";
import RecentRegistrationsTable from "@/app/_components/dashboard/RecentRegistrationsTable";
import TableSkeleton from "@/app/_components/dashboard/TableSkeleton";
import ChartPieSkeleton from "@/app/_components/dashboard/ChartPieSkeleton";
import ChartPieWrapper from "@/app/_components/dashboard/ChartPieWrapper";
import { getCurrentUserStatus } from "@/service/userService";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function page() {
  const { isAdmin, isStaff } = await getCurrentUserStatus();
  if (!isAdmin && !isStaff) {
    redirect("/login");
  }
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>
      <Suspense fallback={<ChartSkeleton />}>
        <ChartWrapper />
      </Suspense>
      <Suspense fallback={<ChartPieSkeleton />}>
        <ChartPieWrapper />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <RecentRegistrationsTable />
      </Suspense>
    </div>
  );
}

export default page;
