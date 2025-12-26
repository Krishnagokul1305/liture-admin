import { EmptyState } from "@/app/_components/EmptyState";
import TableSearch from "@/components/table/TableSearch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { hasCurrentUserRole } from "@/service/userService";
import { getAllRegistrations } from "@/service/registrationService";
import RegistrationTable from "@/app/_components/tables/RegistrationTable";
import WebinarFilter from "@/app/_components/WebinarFilter";
async function page({ searchParams }) {
  if (!(await hasCurrentUserRole("SUPERADMIN", "ADMIN"))) {
    throw new Error("Unauthorized");
  }
  const searchs = await searchParams;
  const params = { ...searchs, type: "webinar" }; // set type to webinar
  const data = await getAllRegistrations(params);
  return (
    <div className="space-y-5">
      <div className="flex md:items-center flex-col lg:flex-row justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-3xl font-bold">
            Webinar Registrations
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Manage registrations for webinars.
          </p>
        </div>
        <Button
          className={"mt-5 lg:mt-0"}
          href={"/registrations/create?type=webinar"}
        >
          <Plus /> Add
        </Button>
      </div>

      <div className="flex flex-col md:flex-row rounded-md gap-4 items-center justify-between">
        <TableSearch />
        <div className="w-full md:w-fit flex gap-4 items-center">
          <WebinarFilter />
        </div>
      </div>

      {data?.pagination?.total === 0 ? (
        <EmptyState
          title="No registrations yet"
          message="There aren't any registrations at the moment"
        />
      ) : (
        <RegistrationTable
          type={"webinars"}
          data={data?.registrations}
          pagination={data?.pagination}
        />
      )}
    </div>
  );
}

export default page;
