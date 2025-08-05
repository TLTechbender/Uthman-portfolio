import { useScroll, motion, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import AnimatedGradientExperiencesSection from "./effects/animatedGradientExperiencesSection";
import ExperienceCard from "./experiencesCard";
import type { Experience } from "~/sanity/interfaces/homepage";

interface ExperiencesTimelineProps {
  experiences: Experience[];
}

// Enhanced Experience Card wrapper - fixed for mobile
const AnimatedExperienceCard: React.FC<
  Experience & {
    index: number;
  }
> = (props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isEven = props.index % 2 === 0;

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Adjusted scroll configuration for better mobile behavior
  const { scrollYProgress } = useScroll({
    target: cardRef,
    // More conservative offsets - cards stay visible longer
    offset: isMobile
      ? ["start 0.9", "end 0.1"] // Mobile: more generous visibility window
      : ["start end", "end start"], // Desktop: original behavior
  });

  // More mobile-friendly opacity curve
  const opacity = useTransform(
    scrollYProgress,
    isMobile
      ? [0, 0.15, 0.85, 1] // Mobile: fade in/out less aggressively
      : [0, 0.2, 0.8, 1], // Desktop: original curve
    [0, 1, 1, 0]
  );

  // Gentler translation values for mobile
  const translateX = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    isMobile
      ? [isEven ? -30 : 30, 0, 0] // Mobile: less dramatic slide
      : [isEven ? -60 : 60, 0, 0] // Desktop: original values
  );

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    isMobile ? [20, 0, 0] : [40, 0, 0] // Mobile: less vertical movement
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    isMobile
      ? [0.98, 1, 1, 0.99] // Mobile: minimal scaling
      : [0.95, 1, 1, 0.98] // Desktop: original scaling
  );

  // Filter effects - toned down for mobile
  const brightness = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8],
    isMobile ? [0.95, 1, 1] : [0.9, 1, 1]
  );
  const contrast = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 1.1, 1.1]);

  // Glow effect opacity - more subtle on mobile
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    isMobile
      ? [0, 0, 0.6, 0.4] // Mobile: more subtle glow
      : [0, 0, 1, 0.8] // Desktop: original glow
  );

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      style={{
        opacity,
        x: translateX,
        y: translateY,
        scale,
      }}
      initial={{ opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: isMobile ? 120 : 100, // Slightly snappier on mobile
        damping: isMobile ? 35 : 30, // More damped on mobile
        delay: props.index * (isMobile ? 0.05 : 0.1), // Faster stagger on mobile
      }}
    >
      <motion.div
        style={{
          filter: useTransform(
            [brightness, contrast],
            ([b, c]) => `brightness(${b}) contrast(${c})`
          ),
        }}
      >
        <ExperienceCard {...props} />
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at ${isEven ? "20%" : "80%"} 50%, 
              rgba(15, 180, 146, 0.1) 0%,
              rgba(59, 130, 246, 0.05) 40%,
              transparent 70%
            )
          `,
          opacity: glowOpacity,
        }}
      />
    </motion.div>
  );
};

const ExperiencesTimeline: React.FC<ExperiencesTimelineProps> = ({
  experiences,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Container-level scroll with mobile adjustments
  const { scrollYProgress: containerScrollProgress } = useScroll({
    target: containerRef,
    offset: isMobile
      ? ["start 0.8", "end 0.2"] // Mobile: more conservative
      : ["start end", "end start"], // Desktop: original
  });

  // Timeline line animation
  const { scrollYProgress: timelineProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Container animations with mobile considerations
  const containerOpacity = useTransform(
    containerScrollProgress,
    isMobile
      ? [0, 0.15, 0.85, 1] // Mobile: gentler fade
      : [0, 0.2, 0.8, 1], // Desktop: original
    [0, 1, 1, 1]
  );

  const containerScale = useTransform(
    containerScrollProgress,
    [0, 0.2],
    isMobile ? [0.99, 1] : [0.98, 1] // Mobile: minimal scaling
  );

  // Header animations
  const headerOpacity = useTransform(containerScrollProgress, [0, 0.3], [0, 1]);

  return (
    <div className="relative py-16 font-arial">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          opacity: containerOpacity,
          scale: containerScale,
        }}
      >
        <AnimatedGradientExperiencesSection />
      </motion.div>

      <div className="w-full p-4 sm:p-6 lg:p-8" ref={containerRef}>
        <div className="max-w-4xl mx-auto overflow-hidden">
          {/* Section Header */}
          <motion.div
            className="mb-8 sm:mb-12 lg:mb-16 relative"
            style={{
              opacity: headerOpacity,
            
             
            }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 text-center">
              Experience
            </h1>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg mb-4 text-center px-4">
              Experiences that prove my expertise
            </p>
          </motion.div>

          <div className="relative pl-8 sm:pl-12">
            {/* Timeline Line Container with masking */}
            <div className="absolute left-4 sm:left-6 top-0 w-0.5 h-full overflow-hidden">
              <motion.div
                className="absolute left-0 w-full bg-[#0FB492] origin-top"
                style={{
                  top: "1rem",
                  height: "calc(100% - 1rem)",
                  scaleY: timelineProgress,
                  maskImage: `linear-gradient(to bottom, 
                    transparent 0%, 
                    black 2rem, 
                    black calc(100% - 2rem), 
                    transparent 100%)`,
                  WebkitMaskImage: `linear-gradient(to bottom, 
                    transparent 0%, 
                    black 2rem, 
                    black calc(100% - 2rem), 
                    transparent 100%)`,
                }}
              />
            </div>

            {/* Timeline Dots Container */}
            <div className="absolute left-4 sm:left-6 top-0 w-0.5 h-full">
              {experiences.map((_, index) => {
                const progress = index / Math.max(experiences.length - 1, 1);
                const dotProgress = useTransform(
                  timelineProgress,
                  [
                    Math.max(0, progress - 0.15),
                    progress,
                    Math.min(1, progress + 0.15),
                  ],
                  [0, 1, 1]
                );

                const dotScale = useTransform(
                  dotProgress,
                  [0, 1],
                  isMobile ? [0.7, 1] : [0.5, 1] // Mobile: less dramatic scaling
                );
                const dotOpacity = useTransform(dotProgress, [0, 1], [0.3, 1]);

                return (
                  <motion.div
                    key={index}
                    className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full border-2 sm:border-4 border-[#0FB492] transform -translate-x-1/2 z-10"
                    style={{
                      top: `${2 + progress * 96}%`,
                      scale: dotScale,
                      opacity: dotOpacity,
                    }}
                  />
                );
              })}
            </div>

            {/* Experience Cards */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
              {experiences.map((exp, index) => (
                <AnimatedExperienceCard key={index} {...exp} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesTimeline;
