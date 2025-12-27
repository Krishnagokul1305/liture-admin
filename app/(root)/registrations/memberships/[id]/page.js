import MembershipRegistrationForm from "@/app/_components/forms/MembershipRegistrationForm";
import { getMembershipRegistrationById } from "@/service/membershipRegistrationService";
import { getAllMembershipsOptions } from "@/service/membershipService";
import Link from "next/link";

export default async function Page({ params, searchParams }) {
  const { id } = await params;
  let { mode = "view" } = await searchParams;

  const pageConfig = {
    edit: {
      title: "Edit Membership Registration",
      description: "Update the membership registration details.",
    },
    view: {
      title: "View Membership Registration",
      description: "Review membership registration details in read-only mode.",
    },
  };

  mode = mode === "edit" ? "edit" : "view";
  const current = pageConfig[mode];

  const currentRegistration = await getMembershipRegistrationById(id);
  const membershipOptions = await getAllMembershipsOptions();

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <Link
        href="/registrations/memberships"
        className="inline-flex text-sm items-center text-primary font-medium mb-6 transition"
      >
        ← Back
      </Link>

      <div className="mb-6">
        <h1 className="text-xl md:text-3xl font-bold">{current.title}</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          {current.description}
        </p>
      </div>

      <MembershipRegistrationForm
        mode={mode}
        registrationId={id}
        initialData={currentRegistration}
        membershipOptions={membershipOptions}
      />
    </div>
  );
}
