import WebinarForm from "@/app/_components/forms/WebinarForm";
import { getWebinarById } from "@/service/webinarService";
import Link from "next/link";

export default async function Page({ params, searchParams }) {
  const { id } = await params;
  let { mode = "view" } = await searchParams;
  const pageConfig = {
    edit: {
      title: "Edit Webinar",
      description: "Update the webinar session on the platform.",
    },
    view: {
      title: "View Webinar",
      description: "Review webinar details in read-only mode.",
    },
  };

  mode = mode === "edit" ? "edit" : "view";

  const current = pageConfig[mode];
  const currentWebinar = await getWebinarById(id);

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <Link
        href="/webinars"
        className="inline-flex text-sm items-center text-primary font-medium mb-6 transition"
      >
        ← Back
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">{current.title}</h1>
        <p className="text-muted-foreground mt-1">{current.description}</p>
      </div>

      <WebinarForm mode={mode} webinarId={id} initialData={currentWebinar} />
    </div>
  );
}
