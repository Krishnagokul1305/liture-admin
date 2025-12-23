// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";

// function AchievementsBanner() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   const stats = [
//     {
//       value: 30,
//       suffix: "+",
//       label: "Expert Webinars",
//     },
//     {
//       value: 500,
//       suffix: "+",
//       label: "Students Trained",
//     },
//     {
//       value: 40,
//       suffix: "+",
//       label: "Internship Opportunities",
//     },
//     {
//       value: 95,
//       suffix: "%",
//       label: "Student Satisfaction",
//     },
//   ];

//   return (
//     <section ref={ref} className="w-full bg-primary text-white py-16 px-4">
//       <div className="mx-auto max-w-6xl">
//         <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
//           {stats.map((stat, index) => (
//             <div key={index} className="text-center">
//               <motion.div
//                 className="mb-2 text-5xl font-bold"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: isInView ? 1 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <motion.span
//                   initial={{ count: 0 }}
//                   animate={{ count: isInView ? stat.value : 0 }}
//                   transition={{ duration: 1.8, ease: "easeOut" }}
//                 >
//                   {Math.floor(isInView ? stat.value : 0)}
//                 </motion.span>
//                 {stat.suffix}
//               </motion.div>

//               <div className="text-sm md:text-base font-semibold text-muted">
//                 {stat.label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default AchievementsBanner;
// //
function AchievementsBanner() {
  const stats = [
    {
      value: 30,
      suffix: "+",
      label: "Expert Webinars",
    },
    {
      value: 500,
      suffix: "+",
      label: "Students Trained",
    },
    {
      value: 40,
      suffix: "+",
      label: "Internship Opportunities",
    },
    {
      value: 95,
      suffix: "%",
      label: "Student Satisfaction",
    },
  ];

  return (
    <div className="bg-primary w-[90%] mx-auto text-white rounded-3xl p-12 md:p-16">
      <div className="">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-16">
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Tracking Growth, Impact, and Success
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-muted text-base md:text-lg leading-relaxed">
              At Liture EdTech, we measure success through real outcomes. These
              numbers reflect our commitment to quality education, career
              growth, and learner satisfaction.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative">
              {index > 0 && (
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-accent/50" />
              )}
              <div className={index > 0 ? "md:pl-8" : ""}>
                <div className="text-4xl md:text-5xl font-bold mb-3">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-muted text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AchievementsBanner;
