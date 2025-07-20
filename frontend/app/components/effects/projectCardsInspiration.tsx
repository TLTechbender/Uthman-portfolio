import React, { useState, useEffect, useRef } from "react";

// Sample project data - in a real app, this would come from props or API
const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack React app with payment integration",
    longDescription:
      "A comprehensive e-commerce platform built with React, Node.js, and Stripe. Features include user authentication, product management, shopping cart functionality, and secure payment processing. The app uses Redux for state management and includes real-time inventory updates.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    technologies: ["React", "TypeScript", "Node.js", "Stripe", "PostgreSQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.com",
  },
  {
    id: 2,
    title: "AI Chat Interface",
    description: "Real-time chat with AI integration and WebSocket",
    longDescription:
      "An intelligent chat interface that leverages OpenAI's GPT models for natural conversations. Built with React and WebSocket for real-time messaging, featuring message history, typing indicators, and customizable AI personalities. Includes advanced features like message reactions and file sharing.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    technologies: ["React", "WebSocket", "OpenAI", "Express", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.com",
  },
  {
    id: 3,
    title: "Data Visualization Dashboard",
    description: "Interactive charts and analytics platform",
    longDescription:
      "A powerful data visualization platform that transforms complex datasets into interactive charts and graphs. Features real-time data updates, customizable dashboards, and advanced filtering options. Built with D3.js for custom visualizations and includes export functionality for reports.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["React", "D3.js", "Python", "Flask", "Redis"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.com",
  },
];

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

interface CursorPosition {
  x: number;
  y: number;
}

const PortfolioCards: React.FC = () => {
  // Cursor tracking state
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [isMagnetic, setIsMagnetic] = useState(false);

  // Modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Track cursor movement for magnetic effect
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      {/* Custom Cursor - Only visible on desktop */}
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-300 ease-out hidden md:block ${
          isMagnetic
            ? "w-16 h-16 bg-purple-500/20 border-2 border-purple-400"
            : "w-5 h-5 bg-white/80 mix-blend-difference"
        } rounded-full`}
        style={{
          left: cursorPosition.x - (isMagnetic ? 32 : 10),
          top: cursorPosition.y - (isMagnetic ? 32 : 10),
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Featured Projects
          </h1>
          <p className="text-xl text-gray-300">
            Hover over cards for magnetic cursor effects, click images for
            details
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onImageClick={() => openModal(project)}
              onCardHover={setIsMagnetic}
              cursorPosition={cursorPosition}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

// Individual Project Card Component
const ProjectCard: React.FC<{
  project: Project;
  onImageClick: () => void;
  onCardHover: (hovering: boolean) => void;
  cursorPosition: CursorPosition;
}> = ({ project, onImageClick, onCardHover, cursorPosition }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGlowing, setIsGlowing] = useState(false);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [isTouched, setIsTouched] = useState(false); // For mobile interactions

  // Calculate magnetic effect based on cursor proximity
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Apply magnetic effect when cursor is within 100px
    if (distance < 100) {
      const strength = (100 - distance) / 100;
      setMagneticOffset({
        x: deltaX * strength * 0.1,
        y: deltaY * strength * 0.1,
      });
    }
  };

  const handleMouseEnter = () => {
    onCardHover(true);
  };

  const handleMouseLeave = () => {
    onCardHover(false);
    setMagneticOffset({ x: 0, y: 0 });
  };

  // Mobile touch handlers
  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsTouched(false), 200);
  };

  return (
    <div
      ref={cardRef}
      className={`group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 border border-slate-700/50 ${
        isTouched
          ? "scale-105 shadow-2xl shadow-purple-500/20"
          : "hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
      }`}
      style={{
        transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px) ${isTouched ? "scale(1.05)" : ""}`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image Section - Clickable for modal */}
      <div
        className="relative h-48 overflow-hidden cursor-pointer group/image"
        onClick={onImageClick}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">
            Click for details
          </span>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs bg-slate-600/50 text-slate-300 rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* View More Button with Glow Effect */}
        <button
          className={`relative w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 transform ${
            isGlowing || isTouched
              ? "shadow-lg shadow-purple-500/50 scale-105"
              : "hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
          }`}
          onMouseEnter={() => setIsGlowing(true)}
          onMouseLeave={() => setIsGlowing(false)}
          onClick={() => onImageClick()}
        >
          {/* Animated background */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 transition-opacity duration-300 ${
              isGlowing || isTouched ? "opacity-20" : "group-hover:opacity-20"
            }`}
          />

          {/* Shimmer effect */}
          <div
            className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ${
              isGlowing || isTouched ? "translate-x-full" : ""
            }`}
          />

          <span className="relative z-10">View Project</span>
        </button>
      </div>

      {/* Mobile: Pulse effect indicator */}
      <div className="md:hidden absolute top-4 right-4">
        <div
          className={`w-3 h-3 bg-purple-400 rounded-full ${isTouched ? "animate-ping" : ""}`}
        />
      </div>
    </div>
  );
};

// Modal Component
const ProjectModal: React.FC<{
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, isOpen, onClose }) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-700">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-200 text-xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            {project.longDescription}
          </p>

          {/* All Technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-2 text-sm bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={project.githubUrl}
              className="flex-1 py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-200 text-center border border-slate-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Code
            </a>
            <a
              href={project.liveUrl}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 text-center shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCards;
