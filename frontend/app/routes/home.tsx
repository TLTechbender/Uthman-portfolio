import HeroSection from "~/components/heroSection";
import type { Route } from "./+types/home";
import ProjectsSection from "~/components/projectsSection";
import ExperienceTimeline from "~/components/experiencesSection";
import PortfolioSection from "~/components/beyondPortfolioSection";

import TestimoniesSection from "~/components/testimoniesSection";
import BillingSection from "~/components/billingSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="flex flex-col">
      <div id="#home">
        <HeroSection />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="experiences">
        <ExperienceTimeline />
      </div>
      <div>
        <PortfolioSection />
      </div>
      <div>
        <TestimoniesSection />
      </div>
      <div>
        <BillingSection />
      </div>
    </main>
  );
}
