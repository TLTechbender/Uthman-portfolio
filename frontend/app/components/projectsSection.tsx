import { div } from "framer-motion/client";
import SportaAICard from "./effects/projectCard";
import AnimatedGradientProjectsSection from "./effects/animatedGradientProjectsSection";
import ProjectCard from "./effects/projectCard";

const ProjectsSection = () => {
  return (
    <div className="w-full relative h-full">
      {/* Background layer - lowest z-index */}
      <AnimatedGradientProjectsSection />

      {/* Content layer - higher z-index with proper positioning */}
      <div className="relative flex flex-col py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 lg:mb-12 max-w-4xl mx-auto w-full">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 capitalize text-center leading-tight">
            featured project
          </h2>
          <h3 className="text-[#FFFFFF99] text-sm sm:text-base md:text-lg lg:text-xl text-center capitalize leading-relaxed px-2 sm:px-4 max-w-2xl mx-auto">
            projects and case studies that proves my expertise
          </h3>
        </div>

        {/* Project Card Container */}
        <div className="relative mb-8 sm:mb-10 lg:mb-12">
          <ProjectCard />
        </div>

        {/* Call-to-Action Button */}
        <div className="w-full flex justify-center px-4 sm:px-0">
          <button className="px-4 sm:px-6 py-3 sm:py-4 bg-[#0FB492] hover:bg-teal-500 text-white text-sm sm:text-base font-semibold w-fit mx-auto rounded-lg sm:rounded-xl animate-pulse hover:animate-none transition-all duration-300 shadow-lg hover:shadow-teal-500/25 focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-[120px] active:scale-95">
            view more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
