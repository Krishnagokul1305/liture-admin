import { Button } from "@/components/ui/button";
import WebinarRegistrationForm from "./forms/WebinarRegistrationForm";
import Modal from "./Modal";

export default function WebinarCard({ webinar }) {
  return (
    <div className="overflow-hidden h-full rounded-sm bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        <img
          src={webinar?.image || "/placeholder.svg"}
          alt={webinar?.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-3 top-3 rounded-sm bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          {webinar?.type || "Webinar"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 font-semibold">{webinar?.title}</h3>

        {/* Description */}
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {webinar?.description}
        </p>

        {/* CTA */}
        <Modal
          title="Register for Webinar"
          description={`Join the webinar: ${webinar?.title}`}
          Trigger={<Button className="w-full">Register Now</Button>}
        >
          <WebinarRegistrationForm webinarId={webinar?.id} />
        </Modal>
      </div>
    </div>
  );
}
