import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { createPortal } from "react-dom";
import { PortableText } from "@portabletext/react";
import "../assets/styles/beyondPortfolio.css";
import type { BeyondPortfolio } from "~/sanity/interfaces/homepage";
import funnyStars from "../assets/images/funny-star-logo.svg";
import { urlFor } from "~/sanity/sanityClient";

// ================== INTERFACES ==================
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

interface BeyondPortfolioSectionProps {
  beyondPortfolioData: BeyondPortfolio;
}

interface Position {
  left: string;
  top: string;
  rotation: number;
  x: number; // Raw x coordinate for collision detection
  y: number; // Raw y coordinate for collision detection
}

// ================== ANIMATION VARIANTS ==================
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

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
      style={{
        border: "1.11px solid rgba(182, 252, 200, 0.17)",
      }}
      className={`relative border-solid rounded-2xl overflow-hidden ${className}`}
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

// ================== IMPROVED SCATTER FUNCTION ==================
// Helper function to check if a position collides with existing positions
const hasCollision = (
  x: number,
  y: number,
  existingPositions: Array<{ x: number; y: number }>,
  minDistance: number
): boolean => {
  return existingPositions.some((pos) => {
    const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
    return distance < minDistance;
  });
};

// Fallback grid-based positioning when random placement fails
const getFallbackPosition = (
  index: number,
  totalItems: number,
  containerWidth: number,
  containerHeight: number,
  padding: number
): Position => {
  // Create a more generous grid layout as fallback
  const cols = Math.ceil(Math.sqrt(totalItems));
  const rows = Math.ceil(totalItems / cols);

  const col = index % cols;
  const row = Math.floor(index / cols);

  const cellWidth = containerWidth / cols;
  const cellHeight = containerHeight / rows;

  // Add some randomness within each grid cell
  const randomSeed = 12345 + index * 7;
  const random = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const cellPadding = 5; // Much smaller cell padding for natural flow
  const xOffset =
    random(randomSeed) * (cellWidth - cellPadding * 2) + cellPadding;
  const yOffset =
    random(randomSeed + 1) * (cellHeight - cellPadding * 2) + cellPadding;

  const x = col * cellWidth + xOffset;
  const y = row * cellHeight + yOffset;

  const rotation = (random(randomSeed + 2) - 0.5) * 25; // Natural rotation range

  return {
    left: `${x}%`,
    top: `${y}%`,
    rotation: rotation,
    x: x,
    y: y,
  };
};

const getSeededRandomPosition = (
  index: number,
  totalItems: number,
  seed: number = 12345,
  minDistance: number = 60 // Reduced minimum distance for more natural spacing
): Position => {
  // Simple seeded random number generator
  const random = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Use full container space - let items breathe naturally
  const containerWidth = 100; // Use percentage-based thinking
  const containerHeight = 100; // Use percentage-based thinking
  const padding = 8; // Small padding from edges (in percentage)

  // Calculate available space with natural padding
  const maxX = containerWidth - padding * 2;
  const maxY = containerHeight - padding * 2;

  // Store all generated positions to check for collisions
  const positions: Array<{ x: number; y: number }> = [];

  // Generate positions for all items up to current index
  for (let i = 0; i <= index; i++) {
    const seedX = seed + i * 50;
    const seedY = seed + i * 20;
    const seedRotation = seed + i * 1000 + 1000;

    let x: number, y: number;
    let attempts = 0;
    const maxAttempts = 30; // Reduced attempts since we have more space

    if (i === index) {
      // For current item, find a position that doesn't overlap
      do {
        // Add attempt-based variation to avoid getting stuck in same position
        const attemptSeed = seedX + attempts * 17;
        const attemptSeedY = seedY + attempts * 23;

        x = random(attemptSeed) * maxX + padding;
        y = random(attemptSeedY) * maxY + padding;

        attempts++;
      } while (
        hasCollision(x, y, positions, minDistance) &&
        attempts < maxAttempts
      );

      // If we couldn't find a non-overlapping position after max attempts,
      // use a more spaced grid-based fallback
      if (attempts >= maxAttempts) {
        const fallback = getFallbackPosition(
          index,
          totalItems,
          containerWidth,
          containerHeight,
          padding
        );
        x = fallback.x;
        y = fallback.y;
      }
    } else {
      // For previous items, just generate their positions to build collision map
      x = random(seedX) * maxX + padding;
      y = random(seedY) * maxY + padding;
    }

    positions.push({ x, y });

    // Return the position for the current index
    if (i === index) {
      const rotation = (random(seedRotation) - 0.5) * 40; // Slightly reduced rotation

      return {
        left: `${x}%`,
        top: `${y}%`,
        rotation: rotation,
        x: x,
        y: y,
      };
    }
  }

  // Fallback (shouldn't reach here)
  return getFallbackPosition(
    index,
    totalItems,
    containerWidth,
    containerHeight,
    padding
  );
};

// ================== RENDER FUNCTIONS ==================
const renderCurrentlyReading = (currentBook: any) => (
  <Card
    className="rounded-2xl p-2 sm:p-3 lg:p-4 relative h-full min-h-[300px] max-h-[400px]"
    popup={{
      textBlock: currentBook.popupContent,
    }}
  >
    <div className="absolute inset-0 w-full h-full">
      <svg
        className="w-full h-full"
        viewBox="0 0 342 346"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g clipPath="url(#clip0_1_854)">
          <rect
            width="342"
            height="346"
            rx={17.7102}
            fill="black"
            fillOpacity={0.14}
          />
          <g className="glow-animation" filter="url(#filter0_f_1_854)">
            <ellipse
              cx={171.295}
              cy={340.142}
              rx={60.8005}
              ry={102.778}
              transform="rotate(-90 171.295 340.142)"
              fill="url(#paint0_linear_1_854)"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_1_854"
            x={-71.2546}
            y={139.57}
            width={485.099}
            height={401.144}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation={69.8857}
              result="effect1_foregroundBlur_1_854"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1_854"
            x1={110.494}
            y1={242.773}
            x2={249.159}
            y2={256.793}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C6FCA6" />
            <stop offset={1} stopColor="#A7FCEE" stopOpacity={0.74} />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1_854"
            x1={-0.00000327091}
            y1={9.10528}
            x2={383.046}
            y2={73.8122}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C6FCA6" />
            <stop offset={1} stopColor="#A7FCEE" stopOpacity={0.74} />
          </linearGradient>
          <clipPath id="clip0_1_854">
            <rect width={342} height={346} rx={17.7102} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>

    <div className="flex flex-col gap-2 sm:gap-3 relative z-10 h-full">
      <div className="flex items-start gap-2 mb-2 sm:mb-4">
        <picture>
          <img
            src={funnyStars}
            alt="Funny star logo"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </picture>
        <h2 className="text-lg sm:text-xl font-semibold">Currently Reading</h2>
      </div>
      <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
        {currentBook?.description}
      </p>
      <div className="flex items-center justify-center flex-1">
        <picture className="relative flex flex-1">
          <img
            className="absolute left-1/2 -translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-cover rounded-lg"
            src={urlFor(currentBook?.bookImage.asset._id)
              .width(300)
              .height(300)
              .format("webp")
              .url()}
            alt={currentBook?.bookImage.alt}
          />
        </picture>
      </div>
    </div>
  </Card>
);

const renderTechStack = (techStack: any) => (
  <Card
    className="p-2 sm:p-3 lg:p-4 h-full min-h-[200px] max-h-[280px]"
    popup={{
      textBlock: techStack?.popupContent,
    }}
  >
    <div className="flex items-start gap-2 mb-2 sm:mb-4">
      <picture>
        <img
          src={funnyStars}
          alt="Funny star logo"
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
      </picture>
      <h2 className="text-lg sm:text-xl font-semibold">My Tech Stacks</h2>
    </div>
    <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
      {techStack?.heading}
    </p>
    <div
      className="grid gap-2 sm:gap-3 justify-center items-center"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(50px, 70px))",
      }}
    >
      {techStack?.tools &&
        techStack.tools.map((tool: any, index: number) => (
          <img
            style={{
              border: "1.11px solid rgba(182, 252, 200, 0.17)",
            }}
            className="relative border-solid rounded-2xl overflow-hidden p-2 sm:p-3 w-full aspect-square object-contain"
            key={index}
            src={urlFor(tool.logo.asset._id)
              .width(48)
              .height(48)
              .format("webp")
              .url()}
            alt={tool.logo.alt || tool.name || "Tech tool"}
          />
        ))}
    </div>
  </Card>
);

const renderRecentWork = (recentWork: any) => (
  <Card
    className="bg-gray-800 rounded-2xl h-full min-h-[200px] max-h-[300px]"
    popup={{
      textBlock: recentWork?.popupContent,
    }}
  >
    <picture className="h-full flex items-center justify-center">
      <img
        className="w-full h-full object-cover rounded-lg"
        src={urlFor(recentWork?.workImage.asset._id)
          .width(300)
          .height(400)
          .format("webp")
          .url()}
        alt={recentWork?.workImage.alt || "Recent work"}
      />
    </picture>
  </Card>
);

const renderCollaborators = (collaborators: any) => (
  <Card
    className="bg-teal-600 rounded-2xl p-2 sm:p-3 lg:p-4 h-full min-h-[120px] max-h-[180px]"
    popup={{
      textBlock: collaborators?.popupContent,
    }}
  >
    <div className="flex flex-col gap-3 sm:gap-4 h-full">
      <div className="flex -space-x-1 sm:-space-x-2">
        {collaborators?.avatars?.map((collab: any, index: number) => (
          <div
            key={index}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-2 border-white overflow-hidden"
          >
            <img
              src={urlFor(collab.avatar.asset._id)
                .width(48)
                .height(48)
                .format("webp")
                .url()}
              alt={collab.alt || collab.name || `Collaborator ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-white">
        {collaborators?.heading}
      </h2>
    </div>
  </Card>
);

const renderPersona = (persona: any) => (
  <Card
    className="bg-gray-800 rounded-2xl p-2 sm:p-3 lg:p-4 h-full min-h-[250px] max-h-[350px]"
    popup={{
      textBlock: persona?.popupContent,
    }}
  >
    <div className="flex flex-col h-full">
      <div className="flex items-start gap-2 mb-2 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">My Persona</h2>
      </div>
      <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
        {persona?.heading}
      </p>

      {/* Scattered persona items with natural spacing */}
      <div className="relative flex-1 min-h-[150px] sm:min-h-[200px] w-full">
        {persona?.personaItems?.map((item: string, index: number) => {
          const position = getSeededRandomPosition(
            index,
            persona.personaItems.length,
            12345, // seed
            25 // smaller minimum distance for mobile
          );

          return (
            <p
              key={index}
              className="absolute bg-cyan-400 text-gray-800 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
              style={{
                left: position.left,
                top: position.top,
                transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
                zIndex: 10 + index,
              }}
            >
              {item}
            </p>
          );
        })}
      </div>
    </div>
  </Card>
);

// ================== MAIN COMPONENT ==================
const BeyondPortfolioSection: React.FC<BeyondPortfolioSectionProps> = ({
  beyondPortfolioData,
}) => {
  return (
    <div className="text-white p-2 sm:p-4 lg:p-8 min-h-screen overflow-x-hidden">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Mobile-First Responsive Grid */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:auto-rows-fr">
          {/* Header + Currently Reading - Full width on mobile, spans 2 rows on desktop */}
          <div className="lg:row-span-2 lg:col-span-1 flex flex-col">
            {/* Header */}
            <motion.div
              className="mb-6 sm:mb-8 lg:mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-cyan-400 font-mono text-xs sm:text-sm mb-2">
                BEYOND PORTFOLIO
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light italic">
                Get-to-know-more
                <br />
                <span className="block">about me</span>
              </h1>
            </motion.div>

            {/* Currently Reading */}
            <div className="flex-1">
              {beyondPortfolioData.currentBook &&
                renderCurrentlyReading(beyondPortfolioData.currentBook)}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="lg:col-span-1">
            {beyondPortfolioData.techStack &&
              renderTechStack(beyondPortfolioData.techStack)}
          </div>

          {/* Recent Work */}
          <div className="lg:col-span-1 lg:row-span-1">
            {beyondPortfolioData.recentWork &&
              renderRecentWork(beyondPortfolioData.recentWork)}
          </div>

          {/* Collaborators */}
          <div className="lg:col-span-1">
            {beyondPortfolioData.collaborators &&
              renderCollaborators(beyondPortfolioData.collaborators)}
          </div>

          {/* Persona */}
          <div className="lg:col-span-1">
            {beyondPortfolioData.persona &&
              renderPersona(beyondPortfolioData.persona)}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BeyondPortfolioSection;
