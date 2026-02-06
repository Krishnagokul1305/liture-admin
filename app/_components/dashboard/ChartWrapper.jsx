import { getPastRegistration } from "@/service/statsService";
import Chart from "./Chart";

async function ChartWrapper() {
  const data = await getPastRegistration();
  return <Chart chartData={data} />;
}

export default ChartWrapper;
