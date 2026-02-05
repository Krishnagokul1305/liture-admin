import TableFilter from "@/components/table/TableFilter";

export default function StatusFilter() {
  return (
    <TableFilter
      name="status"
      className={"w-full"}
      options={[
        { label: "All", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "Accepted", value: "accepted" },
        { label: "Rejected", value: "rejected" },
      ]}
    />
  );
}
