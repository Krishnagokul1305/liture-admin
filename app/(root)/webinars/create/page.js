import WebinarForm from "@/app/_components/forms/WebinarForm";
import Link from "next/link";

function page() {
  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <Link
        href="/webinars"
        className="inline-flex text-sm items-center text-primary font-medium mb-6 transition"
      >
        ← Back
      </Link>
      <div className="flex md:items-center  flex-col lg:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create Webinar</h1>
          <p className="text-muted-foreground mt-1">
            Add a new webinar session to the platform.
          </p>
        </div>
      </div>
      <WebinarForm />
    </div>
  );
}

export default page;
