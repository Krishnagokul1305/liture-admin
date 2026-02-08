import AboutUsSection from "../_components/sections/AboutUsSection";
import AchievementsSection from "../_components/sections/AchievementsSection";
import ContactSection from "../_components/sections/ContactSection";
import HeroSection from "../_components/sections/HeroSection";
import MembershipSection from "../_components/sections/MembershipSection";
import MembersSection from "../_components/sections/MembersSection";
import OpportunitiesSection from "../_components/sections/OpportunitiesSection";

function page() {
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

export default page;
