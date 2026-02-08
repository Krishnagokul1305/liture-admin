import { Button } from "@/components/ui/button";
// import InternshipRegistrationForm from "./forms/InternshipRegistrationForm";
import Modal from "./Modal";
import InternshipRegistrationForm from "./forms/InternshipRegistrationForm";

export default function InternshipCard({ internship }) {
  return (
    <div className="w-full rounded-sm overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        <img
          src={internship?.image || "/placeholder.svg"}
          alt={internship?.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-3 top-3 rounded-sm bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          {internship?.type}
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-2 line-clamp-2 font-semibold ">
          {internship?.title}
        </h3>

        <div className=" mb-2 flex items-center gap-3 text-muted-foreground">
          <p className="text-muted-foreground line-clamp-2">
            {internship?.description}
          </p>
        </div>

        <Modal
          title="Apply for Internship"
          description={`Apply to the ${internship?.title} internship`}
          Trigger={<Button className="w-full">Apply Now</Button>}
        >
          <InternshipRegistrationForm internshipId={internship?.id} />
        </Modal>
      </div>
    </div>
  );
}
