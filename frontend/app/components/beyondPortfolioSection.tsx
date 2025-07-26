import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface PopupData {
  title: string;
  description: string;
  details: string;
}

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  image?: string;
  techIcons?: string[];
  images?: string[];
  tags?: string[];
  popup: PopupData;
  gridClass?: string;
}

// Sample data with grid positioning
const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Currently Reading",
    description:
      "I believe great design starts with a great mindset. Here's what I'm currently reading to stay inspired.",
    icon: "📚",
    image: "/api/placeholder/80/80",
    gridClass: "md:col-span-1 md:row-span-2",
    popup: {
      title: "Learning & Growth",
      description:
        "Currently diving deep into 'The 5 AM Club' by Robin Sharma. This book focuses on morning routines and productivity - key for staying sharp as both a developer and EE student.",
      details:
        "Reading helps me stay curious and think differently about problem-solving in both code and circuit design.",
    },
  },
  {
    id: 2,
    title: "My Tech Stacks",
    description:
      "Tools I use daily to turn ideas into delightful user experiences from pixels to prototypes to production",
    icon: "⚡",
    techIcons: ["⚛️", "🔷", "🟨", "🟢", "🎨", "🔧"],
    gridClass: "md:col-span-1 md:row-span-1",
    popup: {
      title: "Technical Arsenal",
      description:
        "My go-to stack: React/TypeScript for robust frontends, Java for enterprise backends, and diving into Assembly/C for hardware-level understanding.",
      details:
        "Currently exploring Go for its concurrency patterns - perfect for my EE projects involving real-time systems.",
    },
  },
  {
    id: 3,
    title: "Project Showcase",
    description:
      "Recent work spanning web applications to embedded systems projects",
    icon: "🚀",
    images: [
      "/api/placeholder/120/80",
      "/api/placeholder/120/80",
      "/api/placeholder/120/80",
    ],
    gridClass: "md:col-span-2 md:row-span-1",
    popup: {
      title: "Latest Projects",
      description:
        "Building a real-time IoT dashboard using React frontend with Go backend, interfacing with C-based microcontroller firmware.",
      details:
        "This project combines my web dev skills with my EE studies - exactly where I want to be.",
    },
  },
  {
    id: 4,
    title: "Collaborators I Build With",
    description:
      "Designers, developers & dreamers who help bring big ideas to life",
    icon: "👥",
    images: [
      "/api/placeholder/40/40",
      "/api/placeholder/40/40",
      "/api/placeholder/40/40",
      "/api/placeholder/40/40",
      "/api/placeholder/40/40",
    ],
    gridClass: "md:col-span-2 md:row-span-1",
    popup: {
      title: "Team Dynamics",
      description:
        "Working with diverse teams has taught me the importance of clear communication, especially when bridging the gap between software and hardware domains.",
      details:
        "From frontend devs to embedded systems engineers - collaboration shapes better solutions.",
    },
  },
  {
    id: 5,
    title: "My Persona",
    description:
      "A few quirky bits about me that shape how I work, collaborate, and create",
    icon: "🎯",
    tags: [
      "Curious cat 🐱",
      "Social and shy 😊",
      "Explorer ✨",
      "Night-Owl 🦉",
    ],
    gridClass: "md:col-span-1 md:row-span-1",
    popup: {
      title: "Who I Am",
      description:
        "Night owl who loves exploring new technologies. Currently fascinated by the intersection of web development and embedded systems.",
      details:
        "My curiosity drives me to understand systems from high-level TypeScript down to assembly instructions.",
    },
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const popupVariants = {
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

interface MousePosition {
  x: number;
  y: number;
}

interface PopupPortalProps {
  item: PortfolioItem;
  mousePosition: MousePosition;
  onClose: () => void;
}

const PopupPortal: React.FC<PopupPortalProps> = ({
  item,
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
      <div className="bg-gray-900/95 backdrop-blur-xl border border-green-400/30 rounded-xl p-4 shadow-2xl w-72 max-w-[90vw] pointer-events-auto">
        <h4 className="font-semibold text-green-400 mb-2">
          {item.popup.title}
        </h4>
        <p className="text-sm text-gray-300 mb-2">{item.popup.description}</p>
        <p className="text-xs text-gray-400">{item.popup.details}</p>
      </div>
    </motion.div>
  );

  return createPortal(popupContent, document.body);
};

interface MobilePopupProps {
  item: PortfolioItem;
  onClose: () => void;
}

const MobilePopup: React.FC<MobilePopupProps> = ({ item, onClose }) => {
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
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 max-w-[90vw] z-50"
      >
        <div className="bg-gray-900 border border-green-400/30 rounded-xl p-6 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-semibold text-green-400 text-lg">
              {item.popup.title}
            </h4>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-300 mb-3">{item.popup.description}</p>
          <p className="text-xs text-gray-400">{item.popup.details}</p>
        </div>
      </motion.div>
    </>
  );

  return createPortal(popupContent, document.body);
};

interface PortfolioCardProps {
  item: PortfolioItem;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
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
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsPopupOpen(!isPopupOpen);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      className={`relative ${item.gridClass || ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <motion.div
        className="bg-gray-800/50 border border-gray-600/50 rounded-2xl p-6 cursor-pointer relative overflow-hidden h-full"
        whileHover={{
          y: -8,
          borderColor: "rgba(74, 222, 128, 0.3)",
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Subtle background animation on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-start gap-4 mb-4">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {item.icon}
            </motion.div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>

          {/* Content based on card type */}
          <div className="mt-auto">
            {item.image && (
              <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg"></div>
            )}

            {item.techIcons && (
              <div className="flex flex-wrap gap-2">
                {item.techIcons.map((icon, index) => (
                  <motion.div
                    key={index}
                    className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center text-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            )}

            {item.images && (
              <div className="flex flex-wrap gap-2">
                {item.images.map((_, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-gray-600 rounded-full"
                  ></div>
                ))}
              </div>
            )}

            {item.tags && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Desktop Hover Popup using Portal */}
      <AnimatePresence>
        {isHovered && !isMobile && (
          <PopupPortal
            item={item}
            mousePosition={mousePosition}
            onClose={() => setIsHovered(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Popup Modal using Portal */}
      <AnimatePresence>
        {isPopupOpen && isMobile && (
          <MobilePopup item={item} onClose={() => setIsPopupOpen(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function PortfolioSection() {
  return (
    <div className=" p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Animation */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300 italic text-sm font-medium uppercase tracking-wider mb-2">
            Beyond Portfolio
          </div>
          <h2 className="text-2xl md:text-3xl font-light italic text-white">
            Get to know more about me
          </h2>
        </motion.div>

        {/* Cards Grid - Responsive Masonry Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-min"
          style={{ gridAutoRows: "minmax(200px, auto)" }}
        >
          {portfolioData.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
