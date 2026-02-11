import { EmptyState } from "@/app/_components/EmptyState";
import TableSearch from "@/components/table/TableSearch";
import { getCurrentUserStatus } from "@/service/userService";
import { getAllInternshipRegistrations } from "@/service/internshipService";
import RegistrationTable from "@/app/_components/tables/RegistrationTable";
import StatusFilter from "@/app/_components/StatusFilter";
import TableFilter from "@/components/table/TableFilter";

async function page({ searchParams }) {
  const { isAdmin, isStaff } = await getCurrentUserStatus();
  const searchs = await searchParams;
  const data = await getAllInternshipRegistrations(searchs);
  return (
    <div className="space-y-5">
      <div className="flex md:items-center flex-col lg:flex-row justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-3xl font-bold">
            Internship Registrations
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Manage registrations for internships.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row rounded-md gap-4 items-center justify-between">
        <TableSearch />
        <div className="w-full md:w-fit flex gap-4 items-center">
          <StatusFilter />
          <TableFilter
            name="attended"
            className={"w-full"}
            options={[
              { label: "All", value: "all" },
              { label: "Attended", value: "true" },
              { label: "Not Attended", value: "false" },
            ]}
          />
        </div>
      </div>

      {data?.pagination?.total === 0 ? (
        <EmptyState
          title="No registrations yet"
          message="There aren't any registrations at the moment"
        />
      ) : (
        <RegistrationTable
          type={"internships"}
          data={data?.registrations}
          pagination={data?.pagination}
        />
      )}
    </div>
  );
}

export default page;
