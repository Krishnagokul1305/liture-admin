import TableFilter from "@/components/table/TableFilter";
import { getAllWebinarsMinimal } from "@/service/webinarService";

async function WebinarFilter() {
  const options = await getAllWebinarsMinimal();
  return (
    <TableFilter
      name="webinarId"
      className="w-full"
      options={[{ label: "All", value: "all" }, ...options]}
    />
  );
}

export default WebinarFilter;
