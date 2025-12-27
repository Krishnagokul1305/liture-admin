"use client";

import DataTable from "@/components/table/Table";

export default function MembersTable({ data }) {
  return (
    <div className="bg-sidebar rounded-lg">
      <DataTable
        columnCofig={[
          { accessorKey: "id", header: "ID" },
          { accessorKey: "name", header: "Name" },
          { accessorKey: "email", header: "Email" },
          { accessorKey: "role", header: "Role" },
          { accessorKey: "status", header: "Status" },
          { accessorKey: "createdAt", header: "Created" },
        ]}
        data={data}
        count={data.length}
        actionItems={
          // data/demoTableActions.js
          (row) => [
            {
              label: "View",
              action: (rowData) => {
                // replace with router push or modal open
                alert("View: " + rowData.id);
              },
            },
            {
              label: "Edit",
              action: (rowData) => {
                alert("Edit: " + rowData.id);
              },
            },
            {
              label: "Delete",
              action: (rowData) => {
                // show confirmation or call API
                alert("Delete: " + rowData.id);
              },
              separator: true,
            },
          ]
        } // pass function or array
        isNeededHeader={true}
        isNeededPagination={true}
      />
    </div>
  );
}
