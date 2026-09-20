export const fadeUp = (delay = 0, duration = 0.6) => ({
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration,
      ease: "easeOut",
    },
  },
});