import RegistrationApproval from "@/app/_components/RegistrationApproval";
import { getMembershipRegistrationById } from "@/service/membershipService";
import { changeMembershipRegistrationStatus } from "@/app/lib/action";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function Page({ params }) {
  const { id } = await params;
  const currentRegistration = await getMembershipRegistrationById(id);
  const pageConfig = {
    title: "View Membership Registration",
    description: "Review membership registration details in read-only mode.",
  };

  const handleApprove = async () => {
    "use server";
    await changeMembershipRegistrationStatus(id, "accepted");
  };

  const handleReject = async (reason) => {
    "use server";
    await changeMembershipRegistrationStatus(id, "rejected", reason);
  };
  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <Link
        href="/admin/registrations/memberships"
        className="inline-flex text-sm items-center text-primary font-medium mb-6 transition"
      >
        ← Back
      </Link>

      <div className="mb-6">
        <h1 className="text-xl md:text-3xl font-bold">{pageConfig.title}</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          {pageConfig.description}
        </p>
      </div>

      <div className="space-y-6">
        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              disabled
              value={currentRegistration?.fullName || ""}
              className="py-6"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              disabled
              value={currentRegistration?.email || ""}
              className="py-6"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Input
            disabled
            value={currentRegistration?.phoneNumber || "N/A"}
            className="py-6"
          />
        </div>

        {/* Membership */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Membership</label>
          <Input
            disabled
            value={currentRegistration?.membershipName || ""}
            className="py-6"
          />
        </div>

        {/* Registered At */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Registered At</label>
          <Input
            disabled
            value={currentRegistration?.registeredAt || ""}
            className="py-6"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Input
            disabled
            value={
              currentRegistration?.status
                ? currentRegistration.status.charAt(0).toUpperCase() +
                  currentRegistration.status.slice(1)
                : ""
            }
            className="py-6"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Reason</label>
          <Textarea
            disabled
            value={currentRegistration?.reason || "No reason"}
            rows={4}
          />
        </div>
      </div>

      <RegistrationApproval
        registrationStatus={currentRegistration?.status || "pending"}
        rejectionReason={currentRegistration?.rejection_reason}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
