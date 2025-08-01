import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import type { BeyondPortfolio } from "~/sanity/interfaces/homepage";
import { PortableText } from "@portabletext/react";
import { createPortal } from "react-dom";
import weridShape from "../assets/images/weirdShape.svg";
import { urlFor } from "~/sanity/sanityClient";

//Sincerely this has balloned out of control but I don't see myself breaking it further into separate files bro

// Animation variants for different entrance animations
const getCardVariants = (animationType: string, delay: number = 0) => {
  // Base variants structure
  let hiddenVariant: any = { opacity: 0 };
  let visibleVariant: any = {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: delay / 1000,
      ease: [0.4, 0, 0.2, 1] as any,
    },
  };

  // Add specific transforms based on animation type
  switch (animationType) {
    case "slideLeft":
      hiddenVariant = { ...hiddenVariant, x: -60, y: 20 };
      visibleVariant = {
        ...visibleVariant,
        x: 0,
        y: 0,
        scale: 1,
      };
      break;
    case "slideRight":
      hiddenVariant = { ...hiddenVariant, x: 60, y: 20 };
      visibleVariant = {
        ...visibleVariant,
        x: 0,
        y: 0,
        scale: 1,
      };
      break;
    case "scaleIn":
      hiddenVariant = { ...hiddenVariant, scale: 0.85, y: 30 };
      visibleVariant = {
        ...visibleVariant,
        scale: 1,
        y: 0,
      };
      break;
    case "fadeIn":
      hiddenVariant = { ...hiddenVariant, y: 15 };
      visibleVariant = {
        ...visibleVariant,
        y: 0,
      };
      break;
    default: // slideUp
      hiddenVariant = { ...hiddenVariant, y: 40 };
      visibleVariant = {
        ...visibleVariant,
        y: 0,
        scale: 1,
      };
      break;
  }

  return {
    hidden: hiddenVariant,
    visible: visibleVariant,
    hover: {
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" as any },
    },
  } as any;
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
  scrollDelay?: number;
  animationType?: "slideUp" | "slideLeft" | "slideRight" | "scaleIn" | "fadeIn";
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

// ================== ENHANCED CARD COMPONENT ==================
const Card: React.FC<CardProps> = ({
  children,
  className = "",
  popup,
  scrollDelay = 0,
  animationType = "slideUp",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isMobile, setIsMobile] = useState(false);

  // Framer Motion refs and scroll tracking
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    once: false,
    margin: "-10% 0px -10% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress into useful values
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 0.95]
  );
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

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

  // Get dynamic variants
  const cardVariants = getCardVariants(animationType, scrollDelay);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className={`relative border border-cyan-400/20 rounded-2xl overflow-hidden font-arial ${
        popup ? "cursor-pointer" : ""
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={
        {
          opacity,
          scale,
          filter: useTransform(brightness, (value) => `brightness(${value})`),
        } as any
      }
    >
      {/* Subtle glow effect based on scroll progress */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          opacity: useTransform(
            scrollYProgress,
            [0, 0.3, 0.7, 1],
            [0, 0.3, 0.3, 0]
          ),
          background: `
            radial-gradient(circle at 50% 50%, 
              rgba(6, 182, 212, 0.1) 0%,
              rgba(34, 197, 94, 0.05) 40%,
              transparent 70%
            )
          `,
        }}
      />

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

// Left Column Components
const HeaderSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: false });

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={headerRef}
      className="mb-6"
      initial={{ y: -20, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{ y, opacity }}
    >
      <p className="bg-gradient-to-r from-[#20CBA8] to-[rgba(167,252,238,0.74)] bg-clip-text text-transparent font-arial font-bold italic uppercase leading-[130%] text-base sm:text-xl mb-2">
        BEYOND PORTFOLIO
      </p>
      <h1 className="text-2xl font-charmonman font-normal sm:text-3xl md:text-4xl lg:text-5xl  italic text-white">
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
      <Card
        className="p-4 h-full bg-gray-900/50"
        scrollDelay={100}
        animationType="slideLeft"
      >
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
      scrollDelay={100}
      animationType="slideLeft"
    >
      <svg
        viewBox="0 0 342 346"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        height={"100%"}
        width={`100%`}
      >
        <g clipPath="url(#clip0_13_823)">
          <g filter="url(#filter0_f_13_823)">
            <ellipse
              cx={171.295}
              cy={340.142}
              rx={60.8005}
              ry={102.778}
              transform="rotate(-90 171.295 340.142)"
              fill="url(#paint0_linear_13_823)"
            />
          </g>
        </g>

        <defs>
          <filter
            id="filter0_f_13_823"
            x={-71.2548}
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
              result="effect1_foregroundBlur_13_823"
            />
          </filter>
          <linearGradient
            id="paint0_linear_13_823"
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
            id="paint1_linear_13_823"
            x1={-0.00000327091}
            y1={9.10528}
            x2={383.046}
            y2={73.8122}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C6FCA6" />
            <stop offset={1} stopColor="#A7FCEE" stopOpacity={0.74} />
          </linearGradient>
          <clipPath id="clip0_13_823">
            <rect width={342} height={346} rx={17.7102} fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <img src={weridShape} className="w-12 h-12 mt-2" />
          <h2 className="text-lg font-semibold text-white">
            Currently Reading
          </h2>
        </div>

        <p className="text-[#FFFFFF80] text-sm mb-6">
          {data.description || "Exploring new knowledge"}
        </p>

        <div className="flex-1 flex items-end justify-center overflow-hidden">
          <div className="w-full max-w-xs h-64 overflow-hidden rounded-t-lg shadow-lg">
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
      <Card
        className="p-4 h-full bg-gray-900/50"
        scrollDelay={200}
        animationType="scaleIn"
      >
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
    <Card
      className="p-4 h-full bg-gray-900/50"
      popup={popup}
      scrollDelay={200}
      animationType="scaleIn"
    >
      <svg
        viewBox="0 0 342 366"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <g clipPath="url(#clip0_13_841)">
          <g filter="url(#filter0_f_13_841)">
            <ellipse
              cx={-15.3298}
              cy={-24.1094}
              rx={60.8005}
              ry={102.778}
              fill="url(#paint0_linear_13_841)"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_13_841"
            x={-215.902}
            y={-266.659}
            width={401.144}
            height={485.099}
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
              result="effect1_foregroundBlur_13_841"
            />
          </filter>
          <linearGradient
            id="paint0_linear_13_841"
            x1={-76.1304}
            y1={-121.478}
            x2={62.534}
            y2={-107.459}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C6FCA6" />
            <stop offset={1} stopColor="#A7FCEE" stopOpacity={0.74} />
          </linearGradient>
          <clipPath id="clip0_13_841">
            <rect width={342} height={366} rx={17.7102} fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div className="flex items-center gap-2 mb-4">
        <img src={weridShape} className="w-12 h-12 mt-2" />
        <h2 className="text-lg font-semibold text-white">My Tech Stacks</h2>
      </div>

      <p className="text-[#FFFFFF80] text-sm mb-8">
        {data.heading || "Technologies I work with"}
      </p>

      <div className="grid grid-cols-3 gap-4 items-center">
        {data.tools.map((tool, index) => (
          <motion.div
            key={index}
            className="bg-transparent border mx-auto border-cyan-400/20 rounded-xl w-fit p-[1.5rem] md:p-[1.875rem] lg:p-[2.375rem] flex items-center justify-center"
            title={tool.name || tool.alt}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                delay: index * 0.1,
                duration: 0.3,
                ease: "easeOut",
              },
            }}
          >
            <img
              src={urlFor(tool.logo.asset._id).format("webp").quality(80).url()}
              alt={tool.alt || tool.name || `Tool ${index + 1}`}
              className="w-12 h-12 object-contain"
            />
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

const Collaborators: React.FC<CollaboratorsProps> = ({ data }) => {
  if (!data || !data.avatars?.length) {
    return (
      <Card
        className="bg-teal-600 p-4 h-full"
        scrollDelay={300}
        animationType="slideUp"
      >
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
    <Card
      className="bg-teal-600 p-4 h-full"
      popup={popup}
      scrollDelay={300}
      animationType="slideUp"
    >
      <div className="flex flex-col h-full">
        <div className="flex -space-x-2 mb-4">
          {data.avatars.map((collab, index) => (
            <motion.div
              key={index}
              className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
              title={collab.name || collab.alt}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            >
              <img
                src={urlFor(collab.avatar.asset._id)
                  .format("webp")
                  .quality(80)
                  .url()}
                alt={collab.alt || collab.name || `Collaborator ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <p className="text-[#00000099] text-sm">
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
      <Card
        className="p-4 h-full bg-gray-900/50"
        scrollDelay={400}
        animationType="slideRight"
      >
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
    <Card
      className="p-0 h-full overflow-hidden"
      popup={popup}
      scrollDelay={400}
      animationType="slideRight"
    >
      <motion.img
        src={urlFor(data.workImage.asset._id).format("webp").quality(80).url()}
        alt={data.workImage?.alt || "Recent work"}
        className="w-full h-full object-cover"
        initial={{ filter: "grayscale(100%)" }}
        whileHover={{
          filter: "grayscale(0%)",
          transition: { duration: 0.3 },
        }}
      />
    </Card>
  );
};

const Persona: React.FC<PersonaProps> = ({ data }) => {
  if (!data || !data.personaItems?.length) {
    return (
      <Card
        className="p-4 h-full bg-gray-900/50"
        scrollDelay={500}
        animationType="fadeIn"
      >
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
    <Card
      className="p-4 h-full bg-gray-900/50"
      popup={popup}
      scrollDelay={500}
      animationType="fadeIn"
    >
      <svg
        viewBox="0 0 342 366"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <g clipPath="url(#clip0_13_841)">
          <g filter="url(#filter0_f_13_841)">
            <ellipse
              cx={-15.3298}
              cy={-24.1094}
              rx={60.8005}
              ry={102.778}
              fill="url(#paint0_linear_13_841)"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_f_13_841"
            x={-215.902}
            y={-266.659}
            width={401.144}
            height={485.099}
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
              result="effect1_foregroundBlur_13_841"
            />
          </filter>
          <linearGradient
            id="paint0_linear_13_841"
            x1={-76.1304}
            y1={-121.478}
            x2={62.534}
            y2={-107.459}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C6FCA6" />
            <stop offset={1} stopColor="#A7FCEE" stopOpacity={0.74} />
          </linearGradient>
          <clipPath id="clip0_13_841">
            <rect width={342} height={366} rx={17.7102} fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <img src={weridShape} className="w-12 h-12 mt-2" />
          <h2 className="text-lg font-semibold text-white">My Persona</h2>
        </div>

        <p className="text-gray-400 text-sm mb-6">
          {data.heading || "What defines me"}
        </p>

        {/* Scattered persona items */}
        <div className="relative flex-1 min-h-[200px]">
          <div className="relative flex-1 w-full h-40">
            {data.personaItems.map((item, index) => {
              // Some random scatter positions
              const positions = [
                { top: "0%", left: "0%", rotate: "-35deg" },
                { top: "30%", left: "0%", rotate: "-30deg" },
                { top: "60%", left: "10%", rotate: "-60deg" },
                { top: "30%", left: "30%", rotate: "-60deg" },
                { top: "60%", left: "50%", rotate: "-75deg" },
                { top: "70%", left: "60%", rotate: "-50deg" },
              ];

              const pos = positions[index % positions.length];

              return (
                <motion.div
                  key={index}
                  style={{
                    position: "absolute",
                    top: pos.top,
                    left: pos.left,
                    rotate: pos.rotate,
                    background:
                      "linear-gradient(99.16deg, #4CEBCA 1.14%, #84F5DE 69.47%)",
                  }}
                  className="text-[#151515] px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: index * 0.15,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  {item}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

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
          className="grid gap-3 md:gap-4 lg:gap-6
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
            <div className="lg:h-28">
              <Collaborators data={beyondPortfolioData.collaborators} />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4 lg:row-span-2">
            <div className="flex-1">
              <RecentWork data={beyondPortfolioData.recentWork} />
            </div>
            <div className="">
              <Persona data={beyondPortfolioData.persona} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BeyondPortfolioLayout;
