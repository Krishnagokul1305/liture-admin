"use client";

import { useRef, useState } from "react";
import DataTable from "@/components/table/Table";
import Modal from "../Modal";
import DeleteModal from "../DeleteModal";
import UserForm from "../forms/UserForm";
import { deleteUserAction } from "@/app/lib/action";

export default function UsersTable({ data, pagination }) {
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);

  const [selectedRow, setSelectedRow] = useState(null);

  const formatDate = (value) =>
    value ? new Date(value).toLocaleString() : "-";

  return (
    <div className="bg-sidebar rounded-lg">
      <Modal
        ref={editModalRef}
        title="Edit User"
        description="Update user details"
      >
        <UserForm initialData={selectedRow} isCreate={false} />
      </Modal>

      <DeleteModal
        ref={deleteModalRef}
        onDelete={async () => {
          await deleteUserAction(selectedRow?.id);
        }}
      />

      <DataTable
        columnCofig={[
          { accessorKey: "name", header: "Name" },
          { accessorKey: "email", header: "Email" },
          {
            accessorKey: "phone_number",
            header: "Phone",
            customRender: (value) => value || "-",
          },
          {
            accessorKey: "is_staff",
            header: "Staff",
            customRender: (value) => (value ? "Yes" : "No"),
          },
          {
            accessorKey: "is_superuser",
            header: "Admin",
            customRender: (value) => (value ? "Yes" : "No"),
          },
          {
            accessorKey: "is_active",
            header: "Active",
            customRender: (value) => (value ? "Yes" : "No"),
          },
          {
            accessorKey: "created_at",
            header: "Created",
            customRender: (value) => formatDate(value),
          },
        ]}
        data={data}
        pagination={pagination}
        actionItems={(row) => [
          {
            label: "Edit",
            action: () => {
              setSelectedRow(row);
              editModalRef.current?.open();
            },
          },
          {
            label: "Delete",
            action: () => {
              setSelectedRow(row);
              deleteModalRef.current?.open();
            },
          },
        ]}
        isNeededHeader
        isNeededPagination
      />
    </div>
  );
}
