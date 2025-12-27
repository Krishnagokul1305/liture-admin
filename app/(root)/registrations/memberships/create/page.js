import MembershipRegistrationForm from "@/app/_components/forms/MembershipRegistrationForm";
import { getAllMembershipsOptions } from "@/service/membershipService";
import Link from "next/link";

async function page() {
  const options = await getAllMembershipsOptions();
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <Link
        href={`/registrations/memberships`}
        className="inline-flex text-sm items-center text-primary font-medium mb-6 transition"
      >
        ← Back
      </Link>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Registration</h1>
        <p className="text-muted-foreground mt-2">
          Register for an Membership opportunity
        </p>
      </div>
      <MembershipRegistrationForm membershipOptions={options} />
    </div>
  );
}

export default page;
