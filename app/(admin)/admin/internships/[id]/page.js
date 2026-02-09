import InternshipForm from "@/app/_components/forms/InternshipForm";
import { getInternshipById } from "@/service/internshipService";
import Link from "next/link";

export default async function Page({ params, searchParams }) {
  const { id } = await params;
  let { mode = "view" } = await searchParams;
  const pageConfig = {
    edit: {
      title: "Edit Internship",
      description: "Update the internship opportunity on the platform.",
    },
    view: {
      title: "View Internship",
      description: "Review internship details in read-only mode.",
    },
  };

  mode = mode === "edit" ? "edit" : "view";

  const current = pageConfig[mode];
  const currentInternship = await getInternshipById(id);

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <Link
        href="/admin/internships"
        className="inline-flex text-sm items-center text-primary font-medium mb-6 transition"
      >
        ← Back
      </Link>

      <div className="mb-6">
        <h1 className="text-xl md:text-3xl font-bold">{current.title}</h1>
        <p className="text-sm md:text-base ext-muted-foreground mt-1">
          {current.description}
        </p>
      </div>

      <InternshipForm
        mode={mode}
        internshipId={id}
        initialData={currentInternship}
      />
    </div>
  );
}
