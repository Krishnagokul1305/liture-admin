import TableFilter from "@/components/table/TableFilter";
import { getAllInternshipsOptions } from "@/service/internshipService";

async function InternshipFilter() {
  const options = await getAllInternshipsOptions();

  return (
    <TableFilter
      name="internshipId"
      className="w-full"
      options={[{ label: "All", value: "all" }, ...options]}
    />
  );
}

export default InternshipFilter;
