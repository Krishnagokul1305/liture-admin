import InternshipForm from "@/app/_components/forms/InternshipForm";
import Link from "next/link";

function page() {
  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <Link
        href="/admin/internships"
        className="inline-flex text-sm items-center text-primary font-medium mb-6 transition"
      >
        ← Back
      </Link>
      <div className="flex md:items-center  flex-col lg:flex-row justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-3xl font-bold">Create Internship</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Add a new internship opportunity to the platform.
          </p>
        </div>
      </div>
      <InternshipForm />
    </div>
  );
}

export default page;
