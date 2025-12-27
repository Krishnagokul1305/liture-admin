import TableFilter from "@/components/table/TableFilter";
import { getAllMembershipsOptions } from "@/service/membershipService";

async function MembershipFilter() {
  const options = await getAllMembershipsOptions();
  return (
    <TableFilter
      name="membershipId"
      className="w-full"
      options={[{ label: "All", value: "all" }, ...options]}
    />
  );
}

export default MembershipFilter;
