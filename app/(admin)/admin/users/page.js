import DemoTable from "@/app/(admin)/_components/DemoTable";
import { EmptyState } from "@/app/(admin)/_components/EmptyState";
import UserForm from "@/app/(admin)/_components/forms/UserForm";
import Modal from "@/app/(admin)/_components/Modal";
import TableFilter from "@/components/table/TableFilter";
import TableSearch from "@/components/table/TableSearch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function page() {
  const demoData = [
    {
      id: "u_001",
      name: "Asha Patel",
      email: "asha.patel@example.com",
      role: "Intern",
      status: "Active",
      createdAt: "2025-11-12T09:23:00Z",
    },
    {
      id: "u_002",
      name: "Daniel Kim",
      email: "daniel.kim@example.com",
      role: "Member",
      status: "Invited",
      createdAt: "2025-12-01T14:45:00Z",
    },
    {
      id: "u_003",
      name: "María García",
      email: "maria.garcia@example.com",
      role: "Admin",
      status: "Active",
      createdAt: "2024-07-30T08:10:00Z",
    },
    {
      id: "u_004",
      name: "Oluwaseun Adeyemi",
      email: "seun.adeyemi@example.com",
      role: "Member",
      status: "Suspended",
      createdAt: "2023-02-17T16:05:00Z",
    },
    {
      id: "u_005",
      name: "Liam O'Connor",
      email: "liam.oconnor@example.com",
      role: "Intern",
      status: "Active",
      createdAt: "2025-10-03T12:00:00Z",
    },
  ];
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

      {demoData.length == 0 ? (
        <EmptyState
          title="No projects yet"
          message="There aren't any projects at the moment"
        />
      ) : (
        <DemoTable data={demoData} />
      )}
    </div>
  );
}

export default page;
