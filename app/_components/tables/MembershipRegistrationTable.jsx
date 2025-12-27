"use client";

import { useRef, useState } from "react";
import DataTable from "@/components/table/Table";
import DeleteModal from "../DeleteModal";
import { deleteMembershipRegistrationAction } from "@/app/lib/action";
import { useRouter } from "next/navigation";

export default function MembershipRegistrationTable({
  data,
  pagination,
  type,
}) {
  const deleteModalRef = useRef(null);
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <div className="bg-sidebar rounded-lg">
      <DeleteModal
        ref={deleteModalRef}
        onDelete={async () => {
          await deleteMembershipRegistrationAction(selectedRow?._id, type);
        }}
      />

      <DataTable
        columnCofig={[
          { accessorKey: "fullName", header: "Full Name" },
          { accessorKey: "email", header: "Email" },
          { accessorKey: "phoneNumber", header: "Phone Number" },
          { accessorKey: "name", header: "Membership" },
          { accessorKey: "createdAt", header: "Registered On" },
        ]}
        data={data}
        pagination={pagination}
        actionItems={(row) => [
          {
            label: "view",
            action: () => {
              router.push(`/registrations/memberships/${row?._id}?mode=view`);
            },
          },
          {
            label: "Edit",
            action: () => {
              router.push(`/registrations/memberships/${row?._id}?mode=edit`);
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
