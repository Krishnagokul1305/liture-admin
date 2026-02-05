import RegistrationForm from "@/app/_components/forms/RegistrationForm";
import RegistrationApproval from "@/app/_components/RegistrationApproval";
import { getInternshipRegistrationById } from "@/service/internshipService";
import Link from "next/link";

export default async function Page({ params, searchParams }) {
  const { id } = await params;
  let { mode = "view" } = await searchParams;

  const pageConfig = {
    view: {
      title: "View Internship Registration",
      description: "Review internship registration details in read-only mode.",
    },
  };

  mode = "view"; // Force view mode only

  const current = pageConfig[mode];
  const currentRegistration = await getInternshipRegistrationById(id);

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <Link
        href="/registrations/internships"
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

      <RegistrationForm
        mode={mode}
        registrationId={id}
        initialData={currentRegistration}
      />
      <RegistrationApproval registrationStatus="pending" />
    </div>
  );
}
