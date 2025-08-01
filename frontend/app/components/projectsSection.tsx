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
            to={"/portfolio"}
            className={`
                        inline-flex items-center gap-3 group relative overflow-hidden
                        bg-gradient-to-r from-[#0FB492] to-teal-500
                        hover:from-teal-500 hover:to-emerald-500
                        text-black hover:text-white font-semibold
                        px-6 py-3 rounded-xl shadow-lg
                        transition-all duration-300 ease-out
                        transform hover:scale-105 hover:shadow-teal-500/25
                        focus:outline-none focus:ring-2 focus:ring-teal-500
                       
                      `}
            style={{
              transition: "all 0.3s ease-out",
              transitionDelay: "300ms",
            }}
          >
            <span className="relative z-10">view more</span>
            <FaArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 ease-out -rotate-45 group-hover:rotate-0" />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
