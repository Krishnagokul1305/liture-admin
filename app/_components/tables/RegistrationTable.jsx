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

  // Determine column configuration based on registration type
  const getColumnConfig = () => {
    const baseColumns = [
      { accessorKey: "user_email", header: "Email" },
      { accessorKey: "title", header: "Title" },
      { accessorKey: "status", header: "Status" },
      {
        accessorKey: "attended",
        header: "Attended",
        cell: (row) => (row.getValue() ? "Yes" : "No"),
      },
      { accessorKey: "reason", header: "Reason" },
      { accessorKey: "registered_at", header: "Registered On" },
    ];

    // Add resume column for internships
    if (type === "internships") {
      baseColumns.splice(5, 0, {
        accessorKey: "resume",
        header: "Resume",
        cell: (row) => {
          const resume = row.getValue();
          return resume ? (
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Resume
            </a>
          ) : (
            "N/A"
          );
        },
      });
    }

    return baseColumns;
  };

  return (
    <div className="bg-sidebar rounded-lg">
      <DeleteModal
        ref={deleteModalRef}
        onDelete={async () => {
          await deleteRegistrationAction(selectedRow?.id, type);
        }}
      />

      <DataTable
        columnCofig={getColumnConfig()}
        data={data}
        pagination={pagination}
        actionItems={(row) => [
          {
            label: "view",
            action: () => {
              router.push(`/registrations/${type}/${row?.id}`);
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
