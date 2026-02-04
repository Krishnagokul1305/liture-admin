"use client";

import { useRef, useState } from "react";
import DataTable from "@/components/table/Table";
import Modal from "../Modal";
import DeleteModal from "../DeleteModal";
import UserForm from "../forms/UserForm";
import { deleteInternshipAction } from "@/app/lib/action";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function InternshipTable({ data, pagination }) {
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const router = useRouter();

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
          await deleteInternshipAction(selectedRow?.id);
        }}
      />

      <DataTable
        columnCofig={[
          {
            accessorKey: "image",
            header: "Image",
            customRender: (value) => {
              return value ? (
                <Image
                  src={value}
                  height={70}
                  width={100}
                  unoptimized
                  alt="Internship image"
                />
              ) : (
                <span className="text-muted-foreground">No image</span>
              );
            },
          },
          { accessorKey: "title", header: "Title" },
          {
            accessorKey: "description",
            header: "Description",
            customRender: (value) => {
              return value?.length > 50
                ? `${value.substring(0, 50)}...`
                : value;
            },
          },
          {
            accessorKey: "event_date",
            header: "Event Date",
            customRender: (value) => {
              return value ? new Date(value).toLocaleString() : "-";
            },
          },
          {
            accessorKey: "is_active",
            header: "Status",
            customRender: (value) => {
              const isActive = value;
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
          {
            accessorKey: "created_at",
            header: "Created",
            customRender: (value) => {
              return value ? new Date(value).toLocaleString() : "-";
            },
          },
        ]}
        data={data}
        pagination={pagination}
        actionItems={(row) => [
          {
            label: "View",
            action: () => {
              router.push(`internships/${row?.id}`);
            },
          },
          {
            label: "Edit",
            action: () => {
              router.push(`internships/${row?.id}?mode=edit`);
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
