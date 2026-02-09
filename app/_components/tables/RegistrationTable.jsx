"use client";

import { useRef, useState } from "react";
import DataTable from "@/components/table/Table";
import DeleteModal from "../DeleteModal";
import {
  deleteWebinarRegistrationAction,
  deleteInternshipRegistrationAction,
  deleteMembershipRegistrationAction,
} from "@/app/lib/action";
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
      { accessorKey: "reason", header: "Reason" },
      { accessorKey: "registered_at", header: "Registered On" },
      {
        accessorKey: "status",
        header: "Status",
        customRender: (value) => {
          const status = value?.toLowerCase();
          const displayStatus = status === "accepted" ? "approved" : status;
          let statusClasses = "";
          let indicatorClasses = "";

          switch (displayStatus) {
            case "pending":
              statusClasses = "bg-yellow-200 text-yellow-800";
              indicatorClasses = "bg-yellow-500";
              break;
            case "rejected":
              statusClasses = "bg-red-200 text-red-800";
              indicatorClasses = "bg-red-500";
              break;
            case "approved":
              statusClasses = "bg-green-200 text-green-800";
              indicatorClasses = "bg-green-500";
              break;
            default:
              statusClasses = "bg-gray-200 text-gray-800";
              indicatorClasses = "bg-gray-500";
          }

          return (
            <span
              className={`px-2 py-1 flex items-center gap-2 w-fit rounded-md ${statusClasses}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${indicatorClasses}`}
              ></span>
              {displayStatus?.charAt(0).toUpperCase() +
                displayStatus?.slice(1) || "Unknown"}
            </span>
          );
        },
      },
    ];
    if (type == "webinars") {
      baseColumns.splice(4, 0, {
        accessorKey: "attended",
        header: "Attended",
        customRender: (value) => {
          const attended = value;
          const statusClasses = attended
            ? "bg-green-200 text-green-800"
            : "bg-yellow-200 text-yellow-800";
          const indicatorClasses = attended ? "bg-green-500" : "bg-yellow-500";

          return (
            <span
              className={`px-2 py-1 flex items-center gap-2 w-fit rounded-md ${statusClasses}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${indicatorClasses}`}
              ></span>
              {attended ? "Yes" : "No"}
            </span>
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
          if (type === "webinars") {
            await deleteWebinarRegistrationAction(selectedRow?.id);
          } else if (type === "internships") {
            await deleteInternshipRegistrationAction(selectedRow?.id);
          } else if (type === "memberships") {
            await deleteMembershipRegistrationAction(selectedRow?.id);
          }
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
              router.push(`/admin/registrations/${type}/${row?.id}`);
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
