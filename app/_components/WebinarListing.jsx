import { getAllWebinars } from "@/service/webinarService";
import WebinarCard from "./WebinarCard";
import Searchbar from "./Searchbar";
import { EmptyState } from "./EmptyState";
import { Animated } from "./Animated";
import { fadeMove, container } from "@/app/utils/animations";

export default async function WebinarListing({ searchParams = {} }) {
  const search = (searchParams?.search || "").toString();

  let webinars = [];
  try {
    const res = await getAllWebinars({
      search,
      page: 1,
      is_active: true,
      page_size: 100,
      cache: true,
    });
    webinars = res?.webinars || [];
  } catch (err) {
    console.error("Failed to load webinars:", err);
  }

  const filteredWebinars = webinars.filter((webinar) =>
    (webinar.title || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {filteredWebinars.length === 0 ? (
        <Animated variants={fadeMove("up", 30)}>
          <EmptyState
            bg="bg-red-50/50"
            title="No webinars found"
            description="Try a different keyword or check back later for upcoming sessions."
          />
        </Animated>
      ) : (
        <Animated
          variants={container(0.15)}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredWebinars.map((webinar) => (
            <Animated
              key={webinar.id || webinar.title}
              variants={fadeMove("up", 30)}
            >
              <WebinarCard webinar={webinar} />
            </Animated>
          ))}
        </Animated>
      )}
    </div>
  );
}
