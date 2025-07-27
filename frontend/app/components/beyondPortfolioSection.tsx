import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { BeyondPortfolio } from "~/sanity/interfaces/homepage";
import { PortableText } from "@portabletext/react";
import { createPortal } from "react-dom";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

// Utility function to get image URL from Sanity image
const getImageUrl = (image: any): string => {
  if (!image?.asset?.url) {
    return "/placeholder-image.jpg"; // Fallback image
  }
  return image.asset.url;
};

// Type definitions for component props
interface PopupData {
  textBlock: any; // Portable Text content from Sanity
}

interface MousePosition {
  x: number;
  y: number;
}

interface PopupPortalProps {
  popup: PopupData;
  mousePosition: MousePosition;
  onClose: () => void;
}

interface MobilePopupProps {
  popup: PopupData;
  onClose: () => void;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  popup?: PopupData;
}

interface CurrentlyReadingProps {
  data: BeyondPortfolio["currentBook"];
}

interface TechStackProps {
  data: BeyondPortfolio["techStack"];
}

interface CollaboratorsProps {
  data: BeyondPortfolio["collaborators"];
}

interface RecentWorkProps {
  data: BeyondPortfolio["recentWork"];
}

interface PersonaProps {
  data: BeyondPortfolio["persona"];
}

interface BeyondPortfolioSectionProps {
  beyondPortfolioData: BeyondPortfolio;
}

const popupVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.15,
    },
  },
};

// ================== PORTABLE TEXT COMPONENTS ==================
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-xl font-semibold text-cyan-400 mb-3 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-lg font-semibold text-cyan-400 mb-2 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-base font-semibold text-cyan-300 mb-2 leading-tight">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-sm text-gray-300 mb-2 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-cyan-400/50 pl-4 my-3 text-sm text-gray-300 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-cyan-300">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-cyan-200">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-800/50 px-1.5 py-0.5 rounded text-xs font-mono text-cyan-300 border border-cyan-400/20">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400/50 hover:decoration-cyan-300"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-none space-y-1 mb-3 ml-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-none space-y-1 mb-3 ml-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-sm text-gray-300 flex items-start">
        <span className="text-cyan-400 mr-2 mt-0.5 text-xs">•</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children, index }: any) => (
      <li className="text-sm text-gray-300 flex items-start">
        <span className="text-cyan-400 mr-2 mt-0.5 text-xs font-mono">
          {(index || 0) + 1}.
        </span>
        <span>{children}</span>
      </li>
    ),
  },
  types: {
    code: ({ value }: any) => (
      <pre className="bg-gray-800/50 border border-cyan-400/20 rounded-lg p-3 mb-3 overflow-x-auto">
        <code className="text-xs font-mono text-cyan-300">{value?.code}</code>
      </pre>
    ),
  },
};

// ================== POPUP COMPONENTS ==================
const PopupPortal: React.FC<PopupPortalProps> = ({
  popup,
  mousePosition,
  onClose,
}) => {
  const popupContent = (
    <motion.div
      variants={popupVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed z-50 pointer-events-none"
      style={{
        left: mousePosition.x + 15,
        top: mousePosition.y - 100,
        transform: "translateX(-50%)",
      }}
    >
      <div className="bg-gray-900/95 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl w-80 max-w-[90vw] max-h-96 pointer-events-auto">
        <div className="p-4 overflow-y-auto max-h-96 custom-scrollbar">
          <PortableText
            value={popup.textBlock}
            components={portableTextComponents}
          />
        </div>
      </div>
    </motion.div>
  );

  return createPortal(popupContent, document.body);
};

const MobilePopup: React.FC<MobilePopupProps> = ({ popup, onClose }) => {
  const popupContent = (
    <>
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 max-w-[90vw] max-h-[80vh] z-50"
      >
        <div className="bg-gray-900 border border-cyan-400/30 rounded-xl shadow-2xl flex flex-col">
          <div className="flex justify-end items-center p-4 pb-2 border-b border-gray-700/50">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              ✕
            </button>
          </div>
          <div className="p-4 pt-2 overflow-y-auto flex-1 custom-scrollbar">
            <PortableText
              value={popup.textBlock}
              components={portableTextComponents}
            />
          </div>
        </div>
      </motion.div>
    </>
  );

  return createPortal(popupContent, document.body);
};

// ================== CARD COMPONENT ==================
const Card: React.FC<CardProps> = ({ children, className = "", popup }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    if (!isMobile && popup) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    if (isMobile && popup) {
      setIsPopupOpen(!isPopupOpen);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`relative border border-cyan-400/20 rounded-2xl overflow-hidden ${
        popup ? "cursor-pointer" : ""
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}

      <AnimatePresence>
        {isHovered && !isMobile && popup && (
          <PopupPortal
            popup={popup}
            mousePosition={mousePosition}
            onClose={() => setIsHovered(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPopupOpen && isMobile && popup && (
          <MobilePopup popup={popup} onClose={() => setIsPopupOpen(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Helper function for scattered positioning
const getScatteredPosition = (index: number, total: number, seed = 12345) => {
  const random = (s: number): number => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  // Much wider spread
  const x = random(seed + index * 200) * 90 + 20; 
  const y = random(seed + index * 20) * 85 + 7.5; 

  // Less rotation chaos
  const rotation = (random(seed + index * 1000) - 0.5) * 30;

  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  };
};

// Left Column Components
const HeaderSection: React.FC = () => (
  <motion.div
    className="mb-6"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <p className="text-cyan-400 font-mono text-xs sm:text-sm mb-2">
      BEYOND PORTFOLIO
    </p>
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light italic text-white">
      Get-to-know-more
      <br />
      <span className="block">about me</span>
    </h1>
  </motion.div>
);

const CurrentlyReading: React.FC<CurrentlyReadingProps> = ({ data }) => {
  if (!data) {
    return (
      <Card className="p-4 h-full bg-gray-900/50">
        <div className="text-gray-400 text-center">
          No reading data available
        </div>
      </Card>
    );
  }

  // Create popup data if popupContent exists
  const popup = data.popupContent
    ? { textBlock: data.popupContent }
    : undefined;

  return (
    <Card
      className="px-4 pt-4 h-full relative overflow-hidden bg-gray-900/50"
      popup={popup}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-t from-cyan-400/20 to-green-400/20 blur-3xl rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start gap-2 mb-4">
          <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-gray-900 text-xs">★</span>
          </div>
          <h2 className="text-lg font-semibold text-white">
            Currently Reading
          </h2>
        </div>

        <p className="text-gray-400 text-sm mb-6">
          {data.description || "Exploring new knowledge"}
        </p>

        <div className="flex-1 flex items-end justify-center overflow-hidden">
          <div className="w-full max-w-xs h-64 overflow-hidden rounded-t-lg shadow-lg">
            <img
              src={getImageUrl(data.bookImage)}
              alt={data.bookImage?.alt || "Current book"}
              className="w-full h-64 object-cover object-top"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

// Middle Column Components
const TechStack: React.FC<TechStackProps> = ({ data }) => {
  if (!data || !data.tools?.length) {
    return (
      <Card className="p-4 h-full bg-gray-900/50">
        <div className="text-gray-400 text-center">
          No tech stack data available
        </div>
      </Card>
    );
  }

  // Create popup data if popupContent exists
  const popup = data.popupContent
    ? { textBlock: data.popupContent }
    : undefined;

  return (
    <Card className="p-4 h-full bg-gray-900/50" popup={popup}>
      <div className="flex items-start gap-2 mb-4">
        <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
          <span className="text-gray-900 text-xs">+</span>
        </div>
        <h2 className="text-lg font-semibold text-white">Tech Stack</h2>
      </div>

      <p className="text-gray-400 text-sm mb-6">
        {data.heading || "Technologies I work with"}
      </p>

      <div className="grid grid-cols-3 gap-3">
        {data.tools.map((tool, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-cyan-400/20 rounded-xl p-3 aspect-square flex items-center justify-center hover:scale-105 transition-transform"
            title={tool.name || tool.alt}
          >
            <img
              src={getImageUrl(tool.logo)}
              alt={tool.alt || tool.name || `Tool ${index + 1}`}
              className="w-8 h-8 object-contain"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

const Collaborators: React.FC<CollaboratorsProps> = ({ data }) => {
  if (!data || !data.avatars?.length) {
    return (
      <Card className="bg-teal-600 p-4 h-full">
        <div className="text-teal-100 text-center">
          No collaborator data available
        </div>
      </Card>
    );
  }

  // Create popup data if popupContent exists
  const popup = data.popupContent
    ? { textBlock: data.popupContent }
    : undefined;

  return (
    <Card className="bg-teal-600 p-4 h-full" popup={popup}>
      <div className="flex flex-col h-full">
        <div className="flex -space-x-2 mb-4">
          {data.avatars.map((collab, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
              title={collab.name || collab.alt}
            >
              <img
                src={getImageUrl(collab.avatar)}
                alt={collab.alt || collab.name || `Collaborator ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 mb-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-teal-600 text-xs">+</span>
          </div>
          <h2 className="text-lg font-semibold text-white">Collaborators</h2>
        </div>

        <p className="text-teal-100 text-sm">
          {data.heading || "People I work with"}
        </p>
      </div>
    </Card>
  );
};

// Right Column Components
const RecentWork: React.FC<RecentWorkProps> = ({ data }) => {
  if (!data) {
    return (
      <Card className="p-4 h-full bg-gray-900/50">
        <div className="text-gray-400 text-center">
          No recent work data available
        </div>
      </Card>
    );
  }

  // Create popup data if popupContent exists
  const popup = data.popupContent
    ? { textBlock: data.popupContent }
    : undefined;

  return (
    <Card className="p-0 h-full" popup={popup}>
      <img
        src={getImageUrl(data.workImage)}
        alt={data.workImage?.alt || "Recent work"}
        className="w-full h-full object-cover"
      />
    </Card>
  );
};

const Persona: React.FC<PersonaProps> = ({ data }) => {
  if (!data || !data.personaItems?.length) {
    return (
      <Card className="p-4 h-full bg-gray-900/50">
        <div className="text-gray-400 text-center">
          No persona data available
        </div>
      </Card>
    );
  }

  // Create popup data if popupContent exists
  const popup = data.popupContent
    ? { textBlock: data.popupContent }
    : undefined;

  return (
    <Card className="p-4 h-full bg-gray-900/50" popup={popup}>
      <div className="flex flex-col h-full">
        <div className="flex items-start gap-2 mb-4">
          <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-gray-900 text-xs">+</span>
          </div>
          <h2 className="text-lg font-semibold text-white">Persona</h2>
        </div>

        <p className="text-gray-400 text-sm mb-6">
          {data.heading || "What defines me"}
        </p>

        {/* Scattered persona items */}
        <div className="relative flex-1 min-h-[200px]">
          {data.personaItems.map((item, index) => {
            const position = getScatteredPosition(
              index,
              data.personaItems!.length
            );

            return (
              <div
                key={index}
                className="absolute bg-cyan-400 text-gray-900 px-3 py-1.5 rounded-full text-sm font-medium hover:scale-105 transition-transform whitespace-nowrap"
                style={position}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

// Main Layout Component
const BeyondPortfolioLayout: React.FC<BeyondPortfolioSectionProps> = ({
  beyondPortfolioData,
}) => {
  if (!beyondPortfolioData) {
    return (
      <div className=" text-white p-4 flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <h2 className="text-xl mb-2">Beyond Portfolio</h2>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile-first responsive grid */}
        <div
          className="grid gap-4 
          grid-cols-1 
          md:grid-cols-[minmax(350px,1fr)_minmax(350px,1fr)] 
          lg:grid-cols-[minmax(350px,1fr)_minmax(350px,1fr)_minmax(350px,1fr)]
          sm:grid-cols-[minmax(180px,1fr)]"
        >
          {/* LEFT COLUMN */}
          <div className="lg:row-span-2 flex flex-col gap-4">
            <HeaderSection />
            <div className="flex-1">
              <CurrentlyReading data={beyondPortfolioData.currentBook} />
            </div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="flex flex-col gap-4 lg:row-span-2">
            <div className="flex-1">
              <TechStack data={beyondPortfolioData.techStack} />
            </div>
            <div className="lg:h-48">
              <Collaborators data={beyondPortfolioData.collaborators} />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4 lg:row-span-2">
            <div className="flex-1">
              <RecentWork data={beyondPortfolioData.recentWork} />
            </div>
            <div className="lg:h-64">
              <Persona data={beyondPortfolioData.persona} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeyondPortfolioLayout;
