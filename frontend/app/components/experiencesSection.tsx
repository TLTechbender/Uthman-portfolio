import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import AnimatedGradientExperiencesSection from "./effects/animatedGradientExperiencesSection";
import ExperienceCard from "./experiencesCard";

const ExperienceTimeline = () => {
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

  const experiences = [
    {
      company: "InspireCraft",
      role: "UX Designer",
      period: "Apr 2025 - Present",
      description:
        "Crafted a high-converting website for an AI-powered software that helps brands recover abandoned carts using ethical intelligence and predictive analytics. Currently designing the product interface with a focus on seamless AI-driven workflows and user trust.",
      icon: "✨",
      isExploreProject: true,
    },
    {
      company: "SpreadAI",
      role: "UI/UX Designer",
      period: "2024 - Present",
      description:
        "Collaborated with a team to design intuitive user interfaces that make data insights and predictive analytics accessible to non-technical users, integrating complex financial calculations with clean visual design for enhanced user experience.",
      icon: "📊",
      isExploreProject: true,
    },
    {
      company: "Convoya",
      role: "UI/UX Designer",
      period: "2024 - Present",
      description:
        "Designed a smart techniques blending app with gamification, visual feedback and dynamic content. The app features adaptive and sophisticated algorithms that adjust to individual user behavior and real-time data for compelling and accessibility.",
      icon: "🚀",
      isExploreProject: true,
    },
    {
      company: "Musafirr",
      role: "Product Designer",
      period: "Jun 2023 - Apr 2024",
      description:
        "Designed and optimized core marketplace features focused on improving user trust and travel experiences based on browsing and offline strategies. Directly contributed to a 1.2x increase in booking confirmation and overall platform reliability through detailed UI/UX improvements and accessibility.",
      icon: "✈️",
      isExploreProject: true,
    },
    {
      company: "ITCC, University of Ibadan",
      role: "Lead Designer",
      period: "2019 - Present",
      description:
        "Designed and oversaw collaborative senior software used by thousands of students for managing booking, parking, library, registrations, and academics. Led collaborative improvement projects as they progressed, improving monthly active and enhancing overall user satisfaction in the university community.",
      icon: "🎓",
      isExploreProject: true,
    },
  ];

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

export default ExperienceTimeline;
