import { getRegistrationStatus } from "@/service/statsService";
import { ChartPieLabelList } from "./ChartPieLabelList";

async function ChartPieWrapper() {
  const stats = await getRegistrationStatus();
  return <ChartPieLabelList data={stats} />;
}

export default ChartPieWrapper;
