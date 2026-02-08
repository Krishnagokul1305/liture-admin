import AboutUsSection from "./sections/AboutUsSection";
import AchievementsSection from "./sections/AchievementsSection";
import ContactSection from "./sections/ContactSection";
import HeroSection from "./sections/HeroSection1";
import MembershipSection from "./sections/MembershipSection";
import MembersSection from "./sections/MembersSection";
import OpportunitiesSection from "./sections/OpportunitiesSection";

function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutUsSection />
      <AchievementsSection />
      <OpportunitiesSection />
      <MembershipSection />
      <MembersSection />
      <ContactSection />
    </div>
  );
}

export default Home;
