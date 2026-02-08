"use client";
import { motion } from "framer-motion";
import { fadeMove, container } from "@/app/utils/animations";

function AboutUsSection() {
  return (
    <section className="py-16 bg-red-50/50 px-6 md:py-20" id="about">
      <div className="mx-auto max-w-7xl space-y-12 lg:space-y-24">
        {/* ================= ROW 1 ================= */}
        <motion.div
          variants={container(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid min-h-[420px] grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
        >
          {/* Text */}
          <motion.div variants={fadeMove("up", 40, 0)}>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Who <span className="text-primary">we are?</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Liture EdTech is an innovative education-technology platform
              shaping the future of digital learning. We provide high-quality
              skill development courses, expert-driven webinars, industry
              internships, and career-focused programs.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={fadeMove("up", 40, 0.2)}
            className="order-2 lg:order-1 relative w-full overflow-hidden rounded-lg
                       h-[260px] sm:h-[320px] md:h-[380px] lg:h-[90%]"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1661347828110-435a158faa8e"
              alt="Team collaboration"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* ================= ROW 2 ================= */}
        <motion.div
          variants={container(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid min-h-[420px] grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
        >
          {/* Text */}
          <motion.div
            variants={fadeMove("up", 40, 0)}
            className="order-1 lg:order-2"
          >
            <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Our <span className="text-primary">Vision & Mission</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our vision and mission are to make quality education accessible,
              engaging, and impactful for learners across India and beyond by
              delivering world-class learning experiences that bridge the gap
              between academics and industry. We empower learners with practical
              skills, confidence, and real opportunities while building a global
              community of innovators and mentors.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={fadeMove("up", 40, 0.2)}
            className="order-2 lg:order-1 relative w-full overflow-hidden rounded-lg
                       h-[260px] sm:h-[320px] md:h-[380px] lg:h-[90%]"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1663099240679-34b7d3a6fa1f"
              alt="Team collaboration"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutUsSection;
