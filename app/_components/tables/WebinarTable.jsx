"use client";

import { useRef, useState } from "react";
import DataTable from "@/components/table/Table";
import Modal from "../Modal";
import DeleteModal from "../DeleteModal";
import WebinarForm from "../forms/WebinarForm";
import { deleteWebinarAction } from "@/app/lib/action";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
          await deleteWebinarAction(selectedRow?.id);
        }}
      />

      <DataTable
        columnCofig={[
          {
            accessorKey: "image",
            header: "Image",
            customRender: (value) => {
              if (!value)
                return <span className="text-muted-foreground">No image</span>;
              return (
                <Image
                  src={value}
                  height={70}
                  width={100}
                  unoptimized
                  alt="Webinar image"
                />
              );
            },
          },
          { accessorKey: "title", header: "Title" },
          { accessorKey: "event_date", header: "Event Date" },
          {
            accessorKey: "is_active",
            header: "Status",
            customRender: (value) => {
              const isActive = value === true || value === "true";
              const statusClasses = isActive
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800";

              const indicatorClasses = isActive ? "bg-green-500" : "bg-red-500";

              return (
                <span
                  className={`px-2 py-1 flex items-center gap-2 w-fit rounded-md ${statusClasses}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${indicatorClasses}`}
                  ></span>
                  {isActive ? "Active" : "Inactive"}
                </span>
              );
            },
          },
          { accessorKey: "created_at", header: "Created" },
        ]}
        data={data}
        pagination={pagination}
        actionItems={(row) => [
          {
            label: "View",
            action: () => {
              router.push(`webinars/${row?.id}`);
            },
          },
          {
            label: "Edit",
            action: () => {
              router.push(`webinars/${row?.id}?mode=edit`);
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
