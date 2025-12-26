import { EmptyState } from "@/app/_components/EmptyState";
import TableFilter from "@/components/table/TableFilter";
import TableSearch from "@/components/table/TableSearch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { hasCurrentUserRole } from "@/service/userService";
import { getAllRegistrations } from "@/service/registrationService";
import RegistrationTable from "@/app/_components/tables/RegistrationTable";
import InternshipFilter from "@/app/_components/InternshipFilter";

async function page({ searchParams }) {
  if (!(await hasCurrentUserRole("SUPERADMIN", "ADMIN"))) {
    throw new Error("Unauthorized");
  }
  const searchs = await searchParams;
  const params = { ...searchs, type: "internship" };
  const data = await getAllRegistrations(params);

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
        <Button
          className={"mt-5 lg:mt-0"}
          href={"/registrations/create?type=internship"}
        >
          <Plus /> Add
        </Button>
      </div>

      <div className="flex flex-col md:flex-row rounded-md gap-4 items-center justify-between">
        <TableSearch />
        <div className="w-full md:w-fit flex gap-4 items-center">
          <InternshipFilter />
        </div>
      </div>

      {data?.pagination?.total === 0 ? (
        <EmptyState
          title="No registrations yet"
          message="There aren't any registrations at the moment"
        />
      ) : (
        <RegistrationTable
          data={data?.registrations}
          pagination={data?.pagination}
        />
      )}
    </div>
  );
}

export default page;
