import { getPastRegistrationStats } from "@/service/registrationService";
import Chart from "./Chart";

async function ChartWrapper() {
  const data = await getPastRegistrationStats();
  return <Chart chartData={data} />;
}

export default ChartWrapper;
