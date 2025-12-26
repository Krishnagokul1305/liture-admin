"use client";

import { useRef, useState } from "react";
import DataTable from "@/components/table/Table";
import Modal from "../Modal";
import DeleteModal from "../DeleteModal";
export default function RegistrationTable({ data, pagination }) {
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);

  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div className="bg-sidebar rounded-lg">
      <Modal
        ref={editModalRef}
        title="Edit Registration"
        description="Update registration details"
      >
        <div>hello</div>
      </Modal>

      <DeleteModal
        ref={deleteModalRef}
        onDelete={async () => {
          console.log("hello");
        }}
      />

      <DataTable
        columnCofig={[
          { accessorKey: "fullName", header: "Full Name" },
          { accessorKey: "email", header: "Email" },
          { accessorKey: "phoneNumber", header: "Phone Number" },
          { accessorKey: "reason", header: "Reason" },
          { accessorKey: "type", header: "Type" },
          { accessorKey: "title", header: "Internship / Webinar" },
          { accessorKey: "createdAt", header: "Registered On" },
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
