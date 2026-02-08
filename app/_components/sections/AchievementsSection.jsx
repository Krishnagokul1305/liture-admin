"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Animated } from "../Animated";
import { fadeMove } from "@/app/utils/animations";

function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const barVariants = {
    hidden: { scaleY: 0 },
    visible: (i) => ({
      scaleY: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-50/50 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          <div>
            <Animated variants={fadeMove("up", 40, 0)} className="space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                Our Results In <span className="text-primary">Numbers</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                At Liture EdTech, we measure success through real outcomes.
                These numbers reflect our commitment to quality education,
                career growth, and learner satisfaction.
              </p>
            </Animated>
            <div
              ref={ref}
              className="grid grid-cols-2 lg:grid-cols-4 w-full gap-4 items-end mt-10"
            >
              {/* Bar 1 */}
              <motion.div
                custom={0}
                variants={barVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ originY: 1 }}
                className="bg-red-50/50 rounded-lg p-6 h-full lg:h-44 border flex flex-col justify-between"
              >
                <div className="text-xs text-muted-foreground mb-2">
                  Expert Webinars
                </div>
                <div className="text-3xl font-bold">30+</div>
              </motion.div>

              {/* Bar 2 */}
              <motion.div
                custom={1}
                variants={barVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ originY: 1 }}
                className="bg-primary rounded-lg p-6 h-full lg:h-64 border flex flex-col justify-between"
              >
                <div className="text-xs text-primary-foreground/80 mb-2">
                  Students Trained
                </div>
                <div className="text-3xl font-bold text-white">500+</div>
              </motion.div>

              {/* Bar 3 */}
              <motion.div
                custom={2}
                variants={barVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ originY: 1 }}
                className="bg-primary/60 rounded-lg p-6 h-full lg:h-52 border flex flex-col justify-between"
              >
                <div className="text-xs text-primary-foreground/80 mb-2">
                  Internship Opportunities
                </div>
                <div className="text-3xl font-bold text-white">40+</div>
              </motion.div>

              {/* Bar 4 */}
              <motion.div
                custom={3}
                variants={barVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ originY: 1 }}
                className="rounded-lg p-6 lg:h-40 h-full border flex flex-col justify-between"
              >
                <div className="text-xs text-muted-foreground mb-2">
                  Student Satisfaction
                </div>
                <div className="text-3xl font-bold">95%</div>
              </motion.div>
            </div>
          </div>

          {/* Right side - Image */}
          <Animated
            variants={fadeMove("up", 40, 0.2)}
            className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-full rounded-lg overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Students learning at Liture EdTech"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Optional soft overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" /> */}
          </Animated>
        </div>
      </div>
    </section>
  );
}

export default AchievementsSection;
