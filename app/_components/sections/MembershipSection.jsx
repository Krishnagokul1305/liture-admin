import { getAllMemberships } from "@/service/membershipService";
import MembershipList from "../MembershipList";
import { Animated } from "../Animated";
import { fadeMove } from "@/app/utils/animations";

export default async function MembershipSection() {
  let plans = [];
  try {
    plans = await getAllMemberships({}, true);
  } catch (err) {
    console.error("Failed to load memberships in server component:", err);
    plans = [];
  }

  return (
    <section
      className="min-h-[80vh] py-12 md:py-24 px-6 md:px-4 lg:px-8"
      id="membership"
    >
      <div className="mx-auto max-w-7xl">
        <Animated
          variants={fadeMove("up", 40, 0)}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl f                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ont-bold mb-4 text-balance">
            Become a <span className="text-primary">Member</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Become a Liture EdTech member and enjoy webinars, course discounts,
            career counselling, internship priority, certificates, and early
            access to new programs.
          </p>
        </Animated>
        <MembershipList plans={plans} />
      </div>
    </section>
  );
}
