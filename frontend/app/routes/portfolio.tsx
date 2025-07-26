import AnimatedGradientProjectsSection from "~/components/effects/animatedGradientProjectsSection";
import ProjectCard from "~/components/effects/projectCard";

export default function Portfolio() {
  return (
    <div className="w-full relative h-full pt-24 pb-16">
      {/* Background layer - lowest z-index */}
      <AnimatedGradientProjectsSection />

      {/* Content layer - higher z-index with proper positioning */}
      <div className="relative flex flex-col py-16">
        <div className="mb-8">
          <h2 className="text-white text-4xl font-bold mb-4 capitalize text-center">
            My Portfolio
          </h2>
          <h3 className="text-[#FFFFFF99] text-xl text-center capitalize">
            projects and case studies that proves my expertise
          </h3>
        </div>

        <div className="relative">
          <ProjectCard />
        </div>
      </div>
    </div>
  );
}
