import { motion } from "framer-motion";
import { Animated } from "../_components/Animated";
import { container, fadeMove } from "@/app/utils/animations";
function MembersSection() {
  const teamMembers = [
    {
      name: "CAMERON WILLIAMSON",
      role: "Head Counselor",
      image:
        "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bgColor: "bg-primary",
    },
    {
      name: "JANE COOPER",
      role: "Program Director",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bgColor: "bg-chart-4",
    },
    {
      name: "ROBERT FOX",
      role: "Assistant Director",
      image:
        "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bgColor: "bg-chart-2",
    },
    {
      name: "EMILY RODRIGUEZ",
      role: "Manager",
      image:
        "https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bgColor: "bg-chart-1",
    },
  ];

  const floatAnimation = (delay = 0) => ({
    animate: { y: [0, -12, 0] },
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      delay,
    },
  });

  return (
    <section className="relative bg-red-50/50 py-24 px-6 md:px-4 overflow-hidden">
      {/* ================= FLOATING SHAPES ================= */}
      <div className="hidden lg:block">
        <motion.div
          {...floatAnimation(0)}
          className="absolute top-8 left-8 w-8 h-8 border-4 border-primary rounded-full"
        />
        <motion.div
          {...floatAnimation(0.4)}
          className="absolute top-32 left-16 w-12 h-12 border-4 border-chart-4 rotate-45"
        />
        <motion.div
          {...floatAnimation(0.2)}
          className="absolute top-4 right-4 w-8 h-8 border-4 border-[#8FBE5C] rotate-45"
        />
        <motion.div
          {...floatAnimation(0.6)}
          className="absolute bottom-32 left-5 w-16 h-16 border-4 border-chart-4 rotate-12"
        />
        <motion.div
          {...floatAnimation(0.8)}
          className="absolute top-12 right-12 w-10 h-10 border-4 border-chart-1 rounded-full"
        />
        <motion.div
          {...floatAnimation(1)}
          className="absolute bottom-8 right-16 w-12 h-12 border-4 border-[#8FBE5C] rotate-45"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}
        <Animated
          variants={fadeMove("up", 40, 0)}
          className="text-center md:mb-16 mb-10"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-balance">
            Meet <span className="text-primary">Our Leadership</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Liture Edutech was founded with a vision to make quality learning
            accessible and career-focused for every learner, led by passionate
            educators and industry professionals.
          </p>
        </Animated>

        <motion.div
          variants={container(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12"
        >
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              variants={fadeMove("up", 40, i * 0.2)}
              className={`flex flex-col items-center ${
                i % 2 === 0 ? "lg:mt-10" : ""
              }`}
            >
              <div
                className={`${member.bgColor} rounded-full w-48 h-48 sm:w-52 sm:h-52 lg:w-56 lg:h-56 mb-6 overflow-hidden`}
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-black text-xl sm:text-2xl mb-2 text-center">
                {member.name}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                {member.role}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default MembersSection;
