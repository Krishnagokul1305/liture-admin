import { EmptyState } from "@/app/_components/EmptyState";
import UserForm from "@/app/_components/forms/UserForm";
import Modal from "@/app/_components/Modal";
import TableFilter from "@/components/table/TableFilter";
import TableSearch from "@/components/table/TableSearch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { hasCurrentUserRole } from "@/service/userService";
import { getAllInternships } from "@/service/internshipService";
import WebinarTable from "@/app/_components/tables/WebinarTable";

async function page({ searchParams }) {
  if (!(await hasCurrentUserRole("SUPERADMIN", "ADMIN"))) {
    throw new Error("Unauthorized");
  }
  const params = await searchParams;
  const data = await getAllInternships(params);
  console.log(data);
  return (
    <div className="space-y-5">
      <div className="flex md:items-center  flex-col lg:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Webinars</h1>
          <p className="text-muted-foreground mt-1">
            Manage webinar sessions, schedules, and availability on the
            platform.
          </p>
        </div>
        <Modal
          title="Create User"
          description="Add new User to your list ."
          Trigger={
            <Button className={"mt-5 lg:mt-0"}>
              <Plus /> Add
            </Button>
          }
        >
          <UserForm />
        </Modal>
      </div>
      <div className="flex flex-col md:flex-row rounded-md gap-4  items-center justify-between">
        <TableSearch />
        <div className="w-full md:w-fit flex gap-4 items-center">
          <TableFilter
            name="time"
            className={"w-full"}
            options={[
              { label: "All", value: "all" },
              { label: "Past", value: "past" },
              { label: "Upcoming", value: "upcoming" },
            ]}
          />
          <TableFilter
            name="role"
            className={"w-full"}
            options={[
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
          />
        </div>
      </div>

      {data?.pagination?.total === 0 ? (
        <EmptyState
          title="No webinars yet"
          message="There aren't any webinars at the moment"
        />
      ) : (
        <WebinarTable data={data?.users} pagination={data?.pagination} />
      )}
    </div>
  );
}

export default page;
