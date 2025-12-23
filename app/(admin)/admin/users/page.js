import { EmptyState } from "@/app/(admin)/_components/EmptyState";
import UserForm from "@/app/(admin)/_components/forms/UserForm";
import Modal from "@/app/(admin)/_components/Modal";
import TableFilter from "@/components/table/TableFilter";
import TableSearch from "@/components/table/TableSearch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UsersTable from "../../_components/tables/UsersTable";
import { getAllUsers } from "@/service/userService";

async function page() {
  const data = await getAllUsers();
  return (
    <div className="space-y-5">
      <div className="flex md:items-center flex-col lg:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground mt-1">
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
          name="status"
          options={[
            { label: "All", value: "all" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Completed", value: "completed" },
          ]}
        />
      </div>

      {data.length === 0 ? (
        <EmptyState
          title="No projects yet"
          message="There aren't any projects at the moment"
        />
      ) : (
        <UsersTable data={data?.users} />
      )}
    </div>
  );
}

export default page;
