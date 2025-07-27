import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import AnimatedGradientExperiencesSection from "./effects/animatedGradientExperiencesSection";
import ExperienceCard from "./experiencesCard";
import type { Experience } from "~/sanity/interfaces/homepage";

interface ExperiencesTimelineProps {
  experiences: Experience[];
}

const ExperiencesTimeline: React.FC<ExperiencesTimelineProps> = ({
  experiences,
}) => {
  console.log(experiences);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <AnimatedGradientExperiencesSection />
      </motion.div>

      <div className="w-full p-8" ref={containerRef}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-16 relative " // Added z-10 for proper stacking
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-white mb-2 text-center">
              {" "}
              Experience
            </h1>
            <p className="text-white/70 text-lg mb-4 text-center">
              {" "}
              Experiences that prove my expertise
            </p>
          </motion.div>

          <div className="relative pl-12">
            <motion.div
              className="absolute left-6 w-0.5 bg-[#0FB492] origin-top"
              style={{
                top: "1.5rem",
                height: `calc(100% - 3rem)`,
                scaleY: scrollYProgress,
              }}
            />

            <motion.div
              className="space-y-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-6 top-6 w-4 h-4 bg-white rounded-full border-4 border-[#0FB492] transform -translate-x-1/2" />

                  <ExperienceCard {...exp} index={index} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesTimeline;
