export const fadeMove = (
  direction = "up",
  distance = 40,
  delay = 0,
  duration = 0.7
) => {
  const axis = direction === "left" || direction === "right" ? "x" : "y";

  const value =
    direction === "up" || direction === "left" ? distance : -distance;

  return {
    hidden: {
      opacity: 0,
      [axis]: value,
    },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

export const container = (stagger = 0.15, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});
