"use client";

import { useRef, useState } from "react";
import DataTable from "@/components/table/Table";
import Modal from "../Modal";
import DeleteModal from "../DeleteModal";
import WebinarForm from "../forms/WebinarForm";
import { deleteWebinarAction } from "@/app/lib/action";
import { useRouter } from "next/navigation";

export default function WebinarTable({ data, pagination }) {
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const router = useRouter();

  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div className="bg-sidebar rounded-lg">
      <Modal
        ref={editModalRef}
        title="Edit Webinar"
        description="Update webinar details"
      >
        <WebinarForm initialData={selectedRow} isCreate={false} />
      </Modal>

      <DeleteModal
        ref={deleteModalRef}
        onDelete={async () => {
          await deleteWebinarAction(selectedRow?._id);
        }}
      />

      <DataTable
        columnCofig={[
          { accessorKey: "title", header: "Title" },
          { accessorKey: "eventDate", header: "Event Date" },
          {
            accessorKey: "status",
            header: "Status",
            customRender: (value) => {
              const statusClasses = {
                completed: "bg-blue-200 text-blue-800",
                active: "bg-green-200 text-green-800",
                inactive: "bg-red-200 text-red-800",
              };

              const indicatorClasses = {
                completed: "bg-blue-500",
                active: "bg-green-500",
                inactive: "bg-red-500",
              };

              return (
                <span
                  className={`px-2 py-1 flex items-center gap-2 w-fit rounded-md ${
                    statusClasses[value] || "bg-gray-200 text-gray-800"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      indicatorClasses[value] || "bg-gray-500"
                    }`}
                  ></span>
                  {value}
                </span>
              );
            },
          },
          { accessorKey: "createdAt", header: "Created" },
        ]}
        data={data}
        pagination={pagination}
        actionItems={(row) => [
          {
            label: "View",
            action: () => {
              router.push(`webinars/${row?._id}`);
            },
          },
          {
            label: "Edit",
            action: () => {
              router.push(`webinars/${row?._id}?mode=edit`);
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
