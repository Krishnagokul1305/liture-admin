"use client";

import { useRef, useState } from "react";
import DataTable from "@/components/table/Table";
import DeleteModal from "../DeleteModal";
import { deleteRegistrationAction } from "@/app/lib/action";
import { useRouter } from "next/navigation";
export default function RegistrationTable({ data, pagination, type }) {
  const deleteModalRef = useRef(null);
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div className="bg-sidebar rounded-lg">
      <DeleteModal
        ref={deleteModalRef}
        onDelete={async () => {
          await deleteRegistrationAction(selectedRow?._id, type);
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
            label: "view",
            action: () => {
              router.push(`/registrations/${row?._id}?mode=view`);
            },
          },
          {
            label: "Edit",
            action: () => {
              router.push(`/registrations/${row?._id}?mode=edit`);
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
