import { getAllInternships } from "@/service/internshipService";
import InternshipCard from "./InternshipCard";
import { EmptyState } from "./EmptyState";
import { Animated } from "./Animated";
import { fadeMove, container } from "@/app/utils/animations";
import TablePagination from "@/components/table/TablePagination";

export default async function IntershipListing({ searchParams = {} }) {
  const search = (searchParams?.search || "").toString();
  const page = Number(searchParams?.page || 1);
  const pageSize = Number(searchParams?.page_size || 6);
  let internships = [];
  let pagination = null;
  try {
    const res = await getAllInternships({
      search,
      page,
      limit: pageSize,
      cache: true,
      is_active: true,
    });
    internships = res?.internships || [];
    pagination = res?.pagination || null;
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
        <div className="space-y-8">
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
          {pagination?.totalPages > 1 && (
            <TablePagination
              pagination={{
                ...pagination,
                page_size:
                  pagination?.page_size || pagination?.limit || pageSize,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
