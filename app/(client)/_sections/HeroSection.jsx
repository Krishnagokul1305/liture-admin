import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Animated } from "../_components/Animated";
import { fadeMove } from "@/app/utils/animations";
// import bgVideo from "@/public/bgvideo1.mp4";

function HeroSection() {
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center">
      {/* <video
        className="absolute inset-0 w-full h-full object-cover"
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
      /> */}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black to-transparent" />

      {/* Content */}
      <section className="relative z-10 max-w-7xl mx-auto text-center w-full px-6 py-10  text-white">
        <Animated variants={fadeMove("up", 50, 0.1)}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Education is <br /> a{" "}
            <span className="text-primary">Privilege</span>
          </h1>
        </Animated>

        {/* Paragraph */}
        <Animated variants={fadeMove("up", 50, 0.2)}>
          <p className="mt-6 max-w-2xl mx-auto text-white/80 text-base md:text-lg">
            Liture EdTech is a next-generation learning platform delivering
            high-quality education, industry-driven skill training, and
            real-world opportunities for students, professionals, and
            institutions.
          </p>
        </Animated>

        <Animated variants={fadeMove("up", 50, 0.3)}>
          <Button
            className="md:mt-8 mt-6 rounded-full group text-lg py-5"
            onClick={() => handleScrollToSection("about")}
          >
            Explore Now
            <ArrowRight
              className="ml-2 size-5 transition-transform duration-300
              group-hover:translate-x-1"
            />
          </Button>
        </Animated>
      </section>
    </div>
  );
}

export default HeroSection;
