import AnimatedGradientProjectsSection from "./effects/animatedGradientProjectsSection";
import ProjectCard from "./effects/projectCard";
import type { PortfolioPageContentData } from "~/sanity/interfaces/portfolioPage";
import { urlFor } from "~/sanity/sanityClient";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa6";

interface ProjectsSectionProps {
  content: PortfolioPageContentData;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ content }) => {
  return (
    <div className=" relative font-arial ">
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
        <div className="relative mb-8 sm:mb-10 lg:mb-12 z-10">
          {content.portfolioProjects.map((project, i) => (
            <ProjectCard
              key={i}
              title={project.projectName}
              //I have alwasy found typing sanity image assets tricky up until this day nigga
              previewImage={urlFor(project.projectImage.asset._id)
                .quality(100)
                .format("webp")
                .url()}
              shortDescription={project.shortDescription}
              buttonLink={project.projectLink.url}
              buttonText={project.projectLink.text}
            />
          ))}
        </div>

        <div className="w-full flex justify-center px-4 sm:px-0">
          <Link
            to="/portfolio"
            className="
          group relative inline-flex items-center gap-3 overflow-hidden
          bg-transparent border-2 border-white 
          text-white font-semibold
          px-6 py-3 rounded-xl
          transition-all duration-300 ease-out
          hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/25
          hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900
        "
          >
            <div
              className="
          absolute inset-0 
          bg-gradient-to-r from-teal-500 to-emerald-500
          transform scale-x-0 origin-left
          transition-transform duration-300 ease-out
          group-hover:scale-x-100
        "
            />

            {/* Shimmer effect */}
            <div
              className="
          absolute inset-0 
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          transform -skew-x-12 -translate-x-full
          transition-transform duration-500 ease-out
          group-hover:translate-x-full
          opacity-0 group-hover:opacity-100
        "
            />

            {/* Content */}
            <span
              className="
          relative z-10 capitalize
          transition-colors duration-300 ease-out
         
        "
            >
              view more
            </span>

            <FaArrowRight
              className="
          w-4 h-4 relative z-10 
          transform -rotate-45 
          transition-all duration-300 ease-out
          group-hover:rotate-0 group-hover:translate-x-1
        "
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
