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
      <div className="relative flex flex-col py-16">
        <div className="mb-8">
          <h2 className="text-white text-4xl font-bold mb-4 capitalize text-center">
            featured project
          </h2>
          <h3 className="text-[#FFFFFF99] text-xl text-center capitalize">
            projects and case studies that proves my expertise
          </h3>
        </div>

        <div className="relative">
          <ProjectCard />
        </div>

        <span className="w-full flex justify-center">
          <button className="px-3 py-2 bg-[#0FB492] text-white w-fit mx-auto rounded-lg animate-pulse hover:animate-none transition-all duration-300">
            view more
          </button>
        </span>
      </div>
    </div>
  );
};

export default ProjectsSection;
