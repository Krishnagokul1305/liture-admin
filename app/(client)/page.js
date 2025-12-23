"use client";

import AboutUsSection from "./_sections/AboutUsSection";
import AchievementsSection from "./_sections/AchievementsSection";
import ContactSection from "./_sections/ContactSection";
import HeroSection from "./_sections/HeroSection";
import MembershipSection from "./_sections/MembershipSection";
import MembersSection from "./_sections/MembersSection";
import OpportunitiesSection from "./_sections/OpportunitiesSection";

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
