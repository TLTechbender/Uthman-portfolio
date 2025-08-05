import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  useInView,
  useReducedMotion,
} from "framer-motion";
import type { BeyondPortfolio } from "~/sanity/interfaces/homepage";
import { PortableText } from "@portabletext/react";
import { createPortal } from "react-dom";
import weridShape from "../assets/images/weirdShape.svg";
import { urlFor } from "~/sanity/sanityClient";
import animatedBackgroundBeyond from "../assets/images/animatedBackgroundBeyond.png";
import animatedBackgroundBeyond2 from "../assets/images/animatedBackgroundBeyond2.png";
import collaboratorsBackground from "../assets/images/collaboratorsBackground.png";
import layla from "../assets/images/layla.png";

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
  animationDelay?: number;
  animationDirection?: "left" | "right" | "top" | "bottom" | "center";
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

// Enhanced animation variants for cards
const createCardVariantsDesktop = (
  direction: "left" | "right" | "top" | "bottom" | "center",
  isMobile: boolean,
  shouldReduceMotion: boolean
): Variants => {
  // If user prefers reduced motion, use minimal animations
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" },
      },
    };
  }

  // Mobile: Simple fade-in animations
  if (isMobile) {
    return {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.25, 0.25, 1],
        },
      },
    };
  }

  // Desktop: "Coming together" animations based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -100, y: 0 };
      case "right":
        return { x: 100, y: 0 };
      case "top":
        return { x: 0, y: -100 };
      case "bottom":
        return { x: 0, y: 100 };
      case "center":
        return { x: 0, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: initialPos.x,
      y: initialPos.y,
      rotateX: direction === "top" ? -15 : direction === "bottom" ? 15 : 0,
      rotateY: direction === "left" ? -15 : direction === "right" ? 15 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 1],
      },
    },
  };
};

const createMobileCardVariants = (shouldReduceMotion: boolean): Variants => {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" },
      },
    };
  }

  return {
    hidden: {
      opacity: 0,
      y: 30, // Simple upward movement
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 1],
      },
    },
  };
};

// Container variants for staggered animations
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
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
      <code className="bg-gray-800/50 px-1.5 py-0.5 rounded text-xs font-arial text-cyan-300 border border-cyan-400/20">
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
        <span className="text-cyan-400 mr-2 mt-0.5 text-xs font-arial">
          {(index || 0) + 1}.
        </span>
        <span>{children}</span>
      </li>
    ),
  },
  types: {
    code: ({ value }: any) => (
      <pre className="bg-gray-800/50 border border-cyan-400/20 rounded-lg p-3 mb-3 overflow-x-auto">
        <code className="text-xs font-arial text-cyan-300">{value?.code}</code>
      </pre>
    ),
  },
};

// ================== POPUP COMPONENTS ==================
const PopupPortal: React.FC<PopupPortalProps> = ({ popup, mousePosition }) => {
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
      <div className="bg-gray-900/95 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl w-80 max-w-[90vw] max-h-118 pointer-events-auto">
        <div className="p-4  max-h-118 custom-scrollbar">
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
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 max-w-[90vw] max-h-[55vh] z-50"
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

// ================== ENHANCED CARD COMPONENT WITH ANIMATIONS ==================
const Card: React.FC<CardProps> = ({
  children,
  className = "",
  popup,

  animationDirection = "center",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (document !== undefined && isPopupOpen) {
      document.body.classList.add("overflow-hidden");
    } else if (document !== undefined && !isPopupOpen) {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isPopupOpen, setIsPopupOpen]);

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

  const cardVariantsDesktop = createCardVariantsDesktop(
    animationDirection,
    isMobile,
    shouldReduceMotion || false
  );

  const cardVariantsMobile = createMobileCardVariants(
    shouldReduceMotion || false
  );

  return (
    <>
      <motion.div
        variants={cardVariantsDesktop}
        className={`
      hidden  md:block relative border border-cyan-400/20 rounded-2xl overflow-hidden font-arial
        ${popup ? "cursor-pointer" : ""}
        ${className}
      `}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          // Add perspective for 3D effects on desktop
          perspective: isMobile ? "none" : "1000px",
          transformStyle: isMobile ? "flat" : "preserve-3d",
        }}
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
      </motion.div>

      <motion.div
        variants={cardVariantsMobile}
        className={`
       md:hidden relative border border-cyan-400/20 rounded-2xl overflow-hidden font-arial
        ${popup ? "cursor-pointer" : ""}
        ${className}
      `}
        onClick={handleClick}
      >
        {children}

        <AnimatePresence>
          {isPopupOpen && isMobile && popup && (
            <MobilePopup popup={popup} onClose={() => setIsPopupOpen(false)} />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

// Left Column Components
const HeaderSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const headerVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: {
          opacity: 0,
          y: -30,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.25, 0.25, 1],
          },
        },
      };

  return (
    <motion.div className="mb-6" variants={headerVariants}>
      <p className="bg-gradient-to-r from-[#20CBA8] to-[rgba(167,252,238,0.74)] bg-clip-text text-transparent font-arial font-bold italic uppercase leading-[130%] text-base sm:text-xl mb-2">
        BEYOND PORTFOLIO
      </p>
      <h1 className="text-2xl font-charmonman  font-normal sm:text-3xl md:text-4xl lg:text-5xl  italic text-white">
        Get to know more
        <br />
        <span className="block">about me</span>
      </h1>
    </motion.div>
  );
};

const CurrentlyReading: React.FC<CurrentlyReadingProps> = ({ data }) => {
  if (!data) {
    return (
      <Card className="p-4 h-full bg-gray-900/50" animationDirection="left">
        <div className="text-gray-400 text-center">
          No reading data available
        </div>
      </Card>
    );
  }

  const popup = data.popupContent
    ? { textBlock: data.popupContent }
    : undefined;

  return (
    <Card
      className="px-4 pt-4 h-full relative overflow-hidden bg-gray-900/50"
      popup={popup}
      animationDirection="left"
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${animatedBackgroundBeyond})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.6",
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <img src={weridShape} className="w-12 h-12 mt-2" />
          <h2 className="text-lg font-semibold text-white">
            Currently Reading
          </h2>
        </div>

        <p className="text-[#FFFFFF80] text-sm mb-2">
          {data.description || "Exploring new knowledge"}
        </p>

        <div className="flex-1 flex items-end justify-center overflow-hidden">
          <div className="w-full max-w-[12rem] h-54 overflow-hidden rounded-t-lg shadow-lg">
            <img
              src={urlFor(data.bookImage.asset._id)
                .format("webp")
                .quality(80)
                .url()}
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
      <Card className="p-4 h-full bg-gray-900/50" animationDirection="top">
        <div className="text-gray-400 text-center">
          No tech stack data available
        </div>
      </Card>
    );
  }

  const popup = data.popupContent
    ? { textBlock: data.popupContent }
    : undefined;

  return (
    <Card
      className="p-4 h-full bg-gray-900/50 relative"
      popup={popup}
      animationDirection="top"
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${animatedBackgroundBeyond2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.6",
        }}
      />
      <div className="flex items-center gap-2 mb-4">
        <img src={weridShape} className="w-12 h-12 mt-2" />
        <h2 className="text-lg font-semibold text-white">My Tech Stacks</h2>
      </div>

      <p className="text-[#FFFFFF80] text-sm mb-8">
        {data.heading || "Technologies I work with"}
      </p>

      <div className="grid grid-cols-3 gap-4 items-center">
        {data.tools.map((tool, index) => (
          <div
            key={index}
            className="bg-transparent border mx-auto border-cyan-400/20 rounded-xl w-fit p-[1.5rem] md:p-[1.875rem] lg:p-[2.375rem] flex items-center justify-center"
            title={tool.name || tool.alt}
          >
            <img
              src={urlFor(tool.logo.asset._id).format("webp").quality(80).url()}
              alt={tool.alt || tool.name || `Tool ${index + 1}`}
              className="w-12 h-12 object-contain"
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
      <Card className="bg-teal-600 p-4 h-full" animationDirection="bottom">
        <div className="text-teal-100 text-center">
          No collaborator data available
        </div>
      </Card>
    );
  }

  const popup = data.popupContent
    ? { textBlock: data.popupContent }
    : undefined;

  return (
    <Card
      className="relative p-4 h-full"
      popup={popup}
      animationDirection="bottom"
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${collaboratorsBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.6",
        }}
      />
      <div className="flex flex-col h-full">
        <div className="flex -space-x-2 mb-4 realtive z-10">
          {data.avatars.map((collab, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
              title={collab.name || collab.alt}
            >
              <img
                src={urlFor(collab.avatar.asset._id)
                  .format("webp")
                  .quality(80)
                  .url()}
                alt={collab.alt || collab.name || `Collaborator ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <p className="text-[#00000099] text-sm relative z-10">
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
      <Card className="p-4 h-full bg-gray-900/50" animationDirection="right">
        <div className="text-gray-400 text-center">
          No recent work data available
        </div>
      </Card>
    );
  }

  const popup = data.popupContent
    ? { textBlock: data.popupContent }
    : undefined;

  return (
    <Card
      className="p-0 h-full overflow-hidden"
      popup={popup}
      animationDirection="right"
    >
      <img
        src={urlFor(data.workImage.asset._id).format("webp").quality(80).url()}
        alt={data.workImage?.alt || "Recent work"}
        className="w-full h-full object-cover"
      />
    </Card>
  );
};

const Persona: React.FC<PersonaProps> = ({ data }) => {
  if (!data || !data.personaItems?.length) {
    return (
      <Card className="p-4 h-full bg-gray-900/50" animationDirection="bottom">
        <div className="text-gray-400 text-center">
          No persona data available
        </div>
      </Card>
    );
  }

  const popup = data.popupContent
    ? { textBlock: data.popupContent }
    : undefined;

  return (
    <Card
      className=" h-full bg-gray-900/50 relative"
      popup={popup}
      animationDirection="bottom"
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${animatedBackgroundBeyond2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.6",
        }}
      />
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4 p-4">
          <img src={weridShape} className="w-12 h-12 mt-2" />
          <h2 className="text-lg font-semibold text-white">My Persona</h2>
        </div>

        <p className="text-gray-400 text-sm mb-6 px-4">
          {data.heading || "What defines me"}
        </p>

        {/* Scattered persona items
        
        Like I tell uthman, I don go hardcode am ooo!!!
        
        */}
        <div
          className="relative flex-1 min-h-[200px]"
          style={{
            backgroundImage: `url(${layla})`,

            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {/* <div className="relative flex-1 w-full h-40">
            {data.personaItems.map((item, index) => {
              // Some random scatter positions
              const positions = [
                { top: "15%", left: "5%", rotate: "-25deg" },

                { top: "8%", left: "45%", rotate: "15deg" },

                { top: "55%", left: "8%", rotate: "-20deg" },

                { top: "48%", left: "52%", rotate: "12deg" },
                { top: "60%", left: "50%", rotate: "-75deg" },
                { top: "70%", left: "60%", rotate: "-50deg" },
              ];

              const pos = positions[index % positions.length];

              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    top: pos.top,
                    left: pos.left,
                    transform: `rotate(${pos.rotate})`,
                    background:
                      "linear-gradient(99.16deg, #4CEBCA 1.14%, #84F5DE 69.47%)",
                  }}
                  className="text-[#151515] px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
                >
                  {item}
                </div>
              );
            })}
          </div> */}
        </div>
      </div>
    </Card>
  );
};

const BeyondPortfolioLayout: React.FC<BeyondPortfolioSectionProps> = ({
  beyondPortfolioData,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: false,
  });

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
    <motion.div
      ref={containerRef}
      className="text-white p-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Mobile-first responsive grid */}
        <div
          className="grid gap-3 md:gap-4 lg:gap-6
      grid-cols-1 
      md:grid-cols-[minmax(350px,1fr)_minmax(350px,1fr)] 
      lg:grid-cols-[minmax(350px,1fr)_minmax(350px,1fr)_minmax(350px,1fr)]
      sm:grid-cols-[minmax(180px,1fr)]"
        >
          {/* LEFT COLUMN */}
          <div className="lg:row-span-2 flex flex-col gap-4 order-1">
            <HeaderSection />
            <div className="flex-1">
              <CurrentlyReading data={beyondPortfolioData.currentBook} />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4 lg:row-span-2 order-2 lg:order-3">
            <div className="flex-1">
              <RecentWork data={beyondPortfolioData.recentWork} />
            </div>
            <div>
              <Persona data={beyondPortfolioData.persona} />
            </div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="flex flex-col gap-4 lg:row-span-2 order-3 lg:order-2">
            <div className="flex-1">
              <TechStack data={beyondPortfolioData.techStack} />
            </div>
            <div className="lg:h-28">
              <Collaborators data={beyondPortfolioData.collaborators} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BeyondPortfolioLayout;
