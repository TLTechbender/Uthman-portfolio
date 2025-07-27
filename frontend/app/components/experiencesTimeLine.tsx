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

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <AnimatedGradientExperiencesSection />
      </motion.div>

      <div className="w-full p-4 sm:p-6 lg:p-8" ref={containerRef}>
        <div className="max-w-4xl mx-auto">
          {/* Section Header - Mobile responsive */}
          <motion.div
            className="mb-8 sm:mb-12 lg:mb-16 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 text-center">
              Experience
            </h1>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg mb-4 text-center px-4">
              Experiences that prove my expertise
            </p>
          </motion.div>

          {/* Timeline Container - Responsive spacing */}
          <div className="relative pl-8 sm:pl-12">
            {/* Animated Timeline Line - Responsive positioning */}
            <motion.div
              className="absolute left-4 sm:left-6 w-0.5 bg-[#0FB492] origin-top"
              style={{
                top: "1rem",
                height: `calc(100% - 2rem)`,
                scaleY: scrollYProgress,
              }}
            />

            {/* Timeline Dots Container - Responsive */}
            <div className="absolute left-4 sm:left-6 top-0 w-0.5 h-full">
              {experiences.map((_, index) => (
                <div
                  key={index}
                  className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full border-2 sm:border-4 border-[#0FB492] transform -translate-x-1/2"
                  style={{
                    top: `${(index / Math.max(experiences.length - 1, 1)) * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Experience Cards */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  <ExperienceCard {...exp} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesTimeline;
