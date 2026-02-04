import { EmptyState } from "@/app/_components/EmptyState";
import UserForm from "@/app/_components/forms/UserForm";
import Modal from "@/app/_components/Modal";
import TableFilter from "@/components/table/TableFilter";
import TableSearch from "@/components/table/TableSearch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UsersTable from "../../_components/tables/UsersTable";
import { getAllUsers, getCurrentUserStatus } from "@/service/userService";

async function page({ searchParams }) {
  const { isAdmin } = await getCurrentUserStatus();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }
  const params = await searchParams;
  const data = await getAllUsers(params);
  return (
    <div className="space-y-5">
      <div className="flex md:items-center  flex-col lg:flex-row justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-3xl font-bold">Users Management</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Manage user roles and permissions
          </p>
        </div>
        <Modal
          title="Create User"
          description="Add new User to your list ."
          Trigger={
            <Button className={"mt-5 lg:mt-0"}>
              <Plus /> Add User
            </Button>
          }
        >
          <UserForm />
        </Modal>
      </div>
      <div className="flex rounded-md gap-4  items-center justify-between">
        <TableSearch />
        <TableFilter
          name="role"
          options={[
            { label: "All", value: "all" },
            { label: "Admin", value: "ADMIN" },
            { label: "Super Admin", value: "SUPERADMIN" },
            { label: "User", value: "USER" },
          ]}
        />
      </div>

      {data?.pagination?.total === 0 ? (
        <EmptyState
          title="No projects yet"
          message="There aren't any projects at the moment"
        />
      ) : (
        <UsersTable data={data?.users} pagination={data?.pagination} />
      )}
    </div>
  );
}

export default page;
