import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";

const FooterCredit = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);

  // Tech stack data with icons and colors
  const techStack = [
    {
      name: "React Router",
      color: "#CA4245",
    },
    {
      name: "Tailwind CSS",
      color: "#06B6D4",
    },
    {
      name: "Sanity CMS",
      color: "#F03E2F",
    },
  ];

  // Animation variants for tech stack container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger each child by 150ms
        delayChildren: 0.5,
      },
    },
  };

  // Animation variants for individual tech badges
  const badgeVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
      y: 30,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.1,
      y: -8,
      rotateY: 0, // Will be animated separately
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  // Icon bounce animation
  const iconVariants: Variants = {
    initial: { rotate: 0, scale: 1 },
    hover: {
      rotate: 0, // Will be animated separately
      scale: 1, // Will be animated separately
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  // Text animation for tech names
  const textVariants: Variants = {
    initial: { x: 0 },
    hover: {
      x: 0, // Will be animated separately
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.footer
      className="relative "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
    

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        {/* Main content */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Single line with built with text, tech badges, and creator */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 text-gray-300"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Built with text */}
            <motion.span
              className="text-gray-400 text-xs font-medium tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              BUILT WITH
            </motion.span>

            {/* Enhanced Tech stack badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  variants={badgeVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredTech(index)}
                  onMouseLeave={() => setHoveredTech(null)}
                  style={{ perspective: "1000px" }} // Enable 3D transforms
                >
                  {/* Glowing background effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-md"
                    style={{
                      backgroundColor: tech.color,
                      filter: "blur(8px)",
                    }}
                    animate={{
                      scale: hoveredTech === index ? [1, 1.2, 1] : 1,
                      opacity: hoveredTech === index ? [0.3, 0.6, 0.3] : 0,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: hoveredTech === index ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Main badge */}
                  <motion.div
                    className="relative flex items-center gap-2 px-3 py-1.5 bg-gray-800/70 backdrop-blur-sm rounded-full border border-gray-700/50 overflow-hidden"
                    style={{
                      boxShadow: `0 2px 12px ${tech.color}20`,
                    }}
                    animate={{
                      borderColor:
                        hoveredTech === index
                          ? `${tech.color}80`
                          : "rgb(55 65 81 / 0.5)",
                      boxShadow:
                        hoveredTech === index
                          ? `0 4px 20px ${tech.color}40, inset 0 1px 0 ${tech.color}20`
                          : `0 2px 12px ${tech.color}20`,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated background shimmer */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(45deg, transparent 30%, ${tech.color}20 50%, transparent 70%)`,
                      }}
                      animate={{
                        x: hoveredTech === index ? [-100, 300] : -100,
                        opacity: hoveredTech === index ? 1 : 0,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: hoveredTech === index ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Animated tech name */}
                    <motion.span
                      className="text-xs font-semibold relative z-10"
                      style={{ color: tech.color }}
                      variants={textVariants}
                      initial="initial"
                      animate={hoveredTech === index ? "hover" : "initial"}
                    >
                      <motion.span
                        animate={{
                          x: hoveredTech === index ? [0, 2, -2, 0] : 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                      >
                        {tech.name}
                      </motion.span>
                    </motion.span>

                    {/* Floating particles on hover */}
                    {hoveredTech === index && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-0.5 h-0.5 rounded-full"
                            style={{
                              backgroundColor: tech.color,
                              left: `${30 + i * 20}%`,
                              top: "20%",
                            }}
                            initial={{
                              opacity: 0,
                              scale: 0,
                              y: 0,
                            }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              y: [-20, -40, -60],
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.2,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                          />
                        ))}
                      </>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <span className="text-xs">by</span>

            {/* Animated developer name/link */}
            <motion.a
              href="https://www.github.com/TLTechbender"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Background glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-md blur-sm"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1.1 : 0.9,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Main link container */}
              <div className="relative px-3 py-1.5 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-md border border-gray-600/30 group-hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center space-x-1.5">
                  {/* Code brackets animation */}
                  <motion.span
                    className="text-blue-400 font-mono text-sm"
                    animate={{
                      rotateY: isHovered ? [0, 180, 0] : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    &lt;
                  </motion.span>

                  {/* Name with gradient text */}
                  <motion.span
                    className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                    style={{
                      backgroundSize: "200% 100%",
                      backgroundPosition: isHovered ? "100%" : "0%",
                    }}
                    animate={{
                      backgroundPosition: isHovered
                        ? ["0%", "100%", "0%"]
                        : "0%",
                    }}
                    transition={{
                      duration: 2,
                      repeat: isHovered ? Infinity : 0,
                    }}
                  >
                    OluwaBrimz
                  </motion.span>

                  {/* Closing bracket */}
                  <motion.span
                    className="text-blue-400 font-mono text-sm"
                    animate={{
                      rotateY: isHovered ? [0, -180, 0] : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    /&gt;
                  </motion.span>

                  {/* GitHub icon */}
                  <motion.div
                    className="ml-1 text-gray-400 group-hover:text-white transition-colors duration-300"
                    animate={{
                      rotate: isHovered ? 360 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Thank you message */}
          <motion.p
            className="text-xs text-gray-500 mt-2 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Thank you for visiting Uthman's side of the internet 🙏
          </motion.p>
        </motion.div>
           
       
      </div>
    </motion.footer>
  );
};

export default FooterCredit;