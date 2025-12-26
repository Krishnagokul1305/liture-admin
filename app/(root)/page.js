import Chart from "../_components/dashboard/Chart";
import DashboardStats from "../_components/dashboard/DashboardStats";

function page() {
  return (
    <div className="flex flex-1 flex-col gap-4 pt-0">
      <DashboardStats />
      <Chart />
    </div>
  );
}

export default page;
