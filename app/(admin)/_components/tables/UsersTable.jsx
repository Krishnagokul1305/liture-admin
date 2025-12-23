"use client";

import { useRef, useState } from "react";
import DataTable from "@/components/table/Table";
import Modal from "../Modal";
import DeleteModal from "../DeleteModal";
import UserForm from "../forms/UserForm";
import { deleteUserAction } from "@/app/lib/action";

export default function UsersTable({ data }) {
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);

  const [selectedRow, setSelectedRow] = useState(null);

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
          await deleteUserAction(selectedRow?._id);
        }}
      />

      <DataTable
        columnCofig={[
          { accessorKey: "name", header: "Name" },
          { accessorKey: "email", header: "Email" },
          { accessorKey: "role", header: "Role" },
          { accessorKey: "createdAt", header: "Created" },
        ]}
        data={data}
        count={data.length}
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
