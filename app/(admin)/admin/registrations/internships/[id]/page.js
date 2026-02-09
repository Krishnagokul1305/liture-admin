import RegistrationApproval from "@/app/_components/RegistrationApproval";
import { getInternshipRegistrationById } from "@/service/internshipService";
import { changeInternshipRegistrationStatus } from "@/app/lib/action";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function Page({ params }) {
  const { id } = await params;
  const currentRegistration = await getInternshipRegistrationById(id);
  const pageConfig = {
    title: "View Internship Registration",
    description: "Review internship registration details in read-only mode.",
  };

  const handleApprove = async () => {
    "use server";
    await changeInternshipRegistrationStatus(id, "accepted");
  };

  const handleReject = async (reason) => {
    "use server";
    await changeInternshipRegistrationStatus(id, "rejected", reason);
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <Link
        href="/admin/registrations/internships"
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

        {/* Internship */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Internship</label>
          <Input
            disabled
            value={
              currentRegistration?.internship?._id?.title ||
              currentRegistration?.internship?.title ||
              ""
            }
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

        {currentRegistration?.resume && (
          <div className="space-x-2">
            <label className="text-sm font-medium">Resume</label>
            <a
              href={currentRegistration.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-200"
            >
              View Resume
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        )}

        {/* Reason */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Reason</label>
          <Textarea
            disabled
            value={currentRegistration?.reason || ""}
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
