import { getAllInternships } from "@/service/internshipService";
import InternshipCard from "./InternshipCard";
import { EmptyState } from "./EmptyState";
import { Animated } from "./Animated";
import { fadeMove, container } from "@/app/utils/animations";

export default async function IntershipListing({ searchParams = {} }) {
  const search = (searchParams?.search || "").toString();
  let internships = [];
  try {
    const res = await getAllInternships({
      search,
      page: 1,
      limit: 100,
      cache: true,
      is_active: true,
    });
    internships = res?.internships || [];
  } catch (err) {
    console.error("Failed to load internships:", err);
    internships = [];
  }
  const filteredInternships = internships.filter((internship) =>
    (internship.title || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {filteredInternships.length === 0 ? (
        <Animated variants={fadeMove("up", 30)}>
          <EmptyState
            bg="bg-red-50/50"
            title="No internships"
            description="No internships match your search right now."
          />
        </Animated>
      ) : (
        <Animated
          variants={container(0.15)}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredInternships.map((internship) => (
            <Animated
              key={internship.id || internship.title}
              variants={fadeMove("up", 30)}
            >
              <InternshipCard internship={internship} />
            </Animated>
          ))}
        </Animated>
      )}
    </div>
  );
}
