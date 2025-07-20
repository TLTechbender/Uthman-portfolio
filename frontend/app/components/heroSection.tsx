// import React, { useEffect, useRef, useState } from "react";

import { div } from "framer-motion/client";
import NoiseOverlay from "./effects/noiseOverlay";
import BouncingLogosHeroSection from "./effects/bouncingLogosHeroSection";
import OponIfa from "../assets/images/opon-ifa.svg";
import AnimatedGradientsHeroSection from "./effects/animatedGradientHeroSection";

// import "../assets/styles/heroSection.css";

// const MagneticButtons = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

//   const hireButtonRef = useRef<HTMLButtonElement>(null);
//   const downloadButtonRef = useRef<HTMLButtonElement>(null);
//   const cursorRef = useRef<HTMLDivElement>(null);

//   const [hireButton, setHireButton] = useState({
//     isHovered: false,
//     isSnapped: false,
//     glowIntensity: 0,
//   });

//   const [downloadButton, setDownloadButton] = useState({
//     isHovered: false,
//     isSnapped: false,
//     spotlightX: 50, // Spotlight X position (0-100%)
//     spotlightY: 50, // Spotlight Y position (0-100%)
//     spotlightIntensity: 0, // How bright the spotlight is
//   });

//   // Mobile detection
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Scroll tracking for mobile
//   useEffect(() => {
//     if (!isMobile) return;

//     const handleScroll = () => {
//       const scrollTop = window.pageYOffset;
//       const scrollHeight =
//         document.documentElement.scrollHeight - window.innerHeight;
//       const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
//       setScrollProgress(progress);

//       // Hire button glows more as you scroll down (0-50% range)
//       const hireGlow = Math.max(0, Math.min(1, progress * 2));
//       setHireButton((prev) => ({ ...prev, glowIntensity: hireGlow }));

//       // Download button spotlight based on scroll position (mobile)
//       const downloadIntensity = Math.max(0, Math.min(1, (progress - 0.2) * 2));
//       // Spotlight moves from left to right as user scrolls
//       const spotlightX = Math.min(100, progress * 150); // Moves beyond button for sweep effect
//       const spotlightY = 50 + Math.sin(progress * Math.PI * 2) * 20; // Subtle vertical movement

//       setDownloadButton((prev) => ({
//         ...prev,
//         spotlightIntensity: downloadIntensity,
//         spotlightX,
//         spotlightY,
//       }));
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isMobile]);

//   // Desktop cursor tracking and magnetic effects
//   useEffect(() => {
//     if (isMobile) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       setCursorPos({ x: e.clientX, y: e.clientY });

//       // Check magnetic snap for hire button
//       if (hireButtonRef.current) {
//         const rect = hireButtonRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const distance = Math.sqrt(
//           Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
//         );

//         const snapDistance = 80; // Magnetic field radius
//         const isInField = distance < snapDistance;

//         if (isInField) {
//           const snapStrength = Math.max(0, 1 - distance / snapDistance);
//           setHireButton((prev) => ({
//             ...prev,
//             isSnapped: true,
//             glowIntensity: snapStrength,
//           }));

//           // Update cursor position to snap towards button
//           if (cursorRef.current) {
//             const snapX =
//               e.clientX + (centerX - e.clientX) * snapStrength * 0.3;
//             const snapY =
//               e.clientY + (centerY - e.clientY) * snapStrength * 0.3;
//             cursorRef.current.style.left = `${snapX}px`;
//             cursorRef.current.style.top = `${snapY}px`;
//           }
//         } else {
//           setHireButton((prev) => ({
//             ...prev,
//             isSnapped: false,
//             glowIntensity: 0,
//           }));
//         }
//       }

//       // Check magnetic snap for download button
//       if (downloadButtonRef.current) {
//         const rect = downloadButtonRef.current.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//         const distance = Math.sqrt(
//           Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
//         );

//         const snapDistance = 120; // Larger field for spotlight
//         const isInField = distance < snapDistance;

//         if (isInField) {
//           const snapStrength = Math.max(0, 1 - distance / snapDistance);

//           // Calculate spotlight position relative to button (0-100%)
//           const spotlightX = ((e.clientX - rect.left) / rect.width) * 100;
//           const spotlightY = ((e.clientY - rect.top) / rect.height) * 100;

//           setDownloadButton((prev) => ({
//             ...prev,
//             isSnapped: true,
//             spotlightX: Math.max(0, Math.min(100, spotlightX)),
//             spotlightY: Math.max(0, Math.min(100, spotlightY)),
//             spotlightIntensity: snapStrength,
//           }));

//           // Update cursor position to snap towards button
//           if (cursorRef.current && !hireButton.isSnapped) {
//             const snapX =
//               e.clientX + (centerX - e.clientX) * snapStrength * 0.3;
//             const snapY =
//               e.clientY + (centerY - e.clientY) * snapStrength * 0.3;
//             cursorRef.current.style.left = `${snapX}px`;
//             cursorRef.current.style.top = `${snapY}px`;
//           }
//         } else {
//           setDownloadButton((prev) => ({
//             ...prev,
//             isSnapped: false,
//             spotlightIntensity: 0,
//             spotlightX: 50,
//             spotlightY: 50,
//           }));
//         }
//       }

//       // Default cursor position when not snapping
//       if (
//         !hireButton.isSnapped &&
//         !downloadButton.isSnapped &&
//         cursorRef.current
//       ) {
//         cursorRef.current.style.left = `${e.clientX}px`;
//         cursorRef.current.style.top = `${e.clientY}px`;
//       }
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     return () => document.removeEventListener("mousemove", handleMouseMove);
//   }, [isMobile, hireButton.isSnapped, downloadButton.isSnapped]);

//   // Hide default cursor on desktop
//   useEffect(() => {
//     if (!isMobile) {
//       document.body.style.cursor = "none";
//       return () => {
//         document.body.style.cursor = "auto";
//       };
//     }
//   }, [isMobile]);

//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
//       {/* Custom Cursor (Desktop only) */}
//       {!isMobile && (
//         <div
//           ref={cursorRef}
//           className="fixed w-6 h-6 pointer-events-none z-50 transition-all duration-100 ease-out"
//           style={{
//             transform: "translate(-50%, -50%)",
//             background: `radial-gradient(circle, rgba(0, 213, 190, ${
//               hireButton.isSnapped ? 0.8 : downloadButton.isSnapped ? 0.6 : 0.4
//             }) 0%, transparent 70%)`,
//             width: hireButton.isSnapped
//               ? "24px"
//               : downloadButton.isSnapped
//                 ? "20px"
//                 : "16px",
//             height: hireButton.isSnapped
//               ? "24px"
//               : downloadButton.isSnapped
//                 ? "20px"
//                 : "16px",
//           }}
//         />
//       )}

//       <div className="flex flex-col sm:flex-row gap-6 items-center">
//         {/* Hire Me Button */}
//         <button
//           ref={hireButtonRef}
//           className="relative px-8 py-4 bg-[#00D5BE] text-gray-900 font-semibold rounded-2xl transition-all duration-300 overflow-hidden group"
//           style={{
//             transform: `scale(${1 + hireButton.glowIntensity * 0.05})`,
//             boxShadow: `
//               0 0 ${20 + hireButton.glowIntensity * 30}px rgba(0, 213, 190, ${0.3 + hireButton.glowIntensity * 0.4}),
//               0 0 ${40 + hireButton.glowIntensity * 60}px rgba(0, 213, 190, ${0.1 + hireButton.glowIntensity * 0.3}),
//               inset 0 0 ${10 + hireButton.glowIntensity * 20}px rgba(255, 255, 255, ${0.1 + hireButton.glowIntensity * 0.2})
//             `,
//           }}
//           onMouseEnter={() =>
//             setHireButton((prev) => ({ ...prev, isHovered: true }))
//           }
//           onMouseLeave={() =>
//             setHireButton((prev) => ({ ...prev, isHovered: false }))
//           }
//         >
//           {/* Animated glow overlay */}
//           <div
//             className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-all duration-500"
//             style={{
//               transform: `translateX(-100%) rotate(45deg)`,
//               animation:
//                 hireButton.glowIntensity > 0.5 ? "shimmer 2s infinite" : "none",
//             }}
//           />

//           {/* Pulsing background */}
//           <div
//             className="absolute inset-0 bg-[#00D5BE] rounded-2xl"
//             style={{
//               opacity: 0.3 + hireButton.glowIntensity * 0.4,
//               transform: `scale(${1 + hireButton.glowIntensity * 0.1})`,
//               animation:
//                 hireButton.glowIntensity > 0.3 ? "pulse 1.5s infinite" : "none",
//             }}
//           />

//           <span className="relative z-10">Hire me</span>
//         </button>

//         {/* Download CV Button */}
//         <button
//           ref={downloadButtonRef}
//           className="relative px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-2xl transition-all duration-300 overflow-hidden group"
//           style={{
//             transform: `scale(${1 + downloadButton.spotlightIntensity * 0.03})`,
//             borderColor: `rgba(255, 255, 255, ${0.8 + downloadButton.spotlightIntensity * 0.2})`,
//           }}
//           onMouseEnter={() =>
//             setDownloadButton((prev) => ({ ...prev, isHovered: true }))
//           }
//           onMouseLeave={() =>
//             setDownloadButton((prev) => ({ ...prev, isHovered: false }))
//           }
//         >
//           {/* Spotlight Effect */}
//           <div
//             className="absolute inset-0 pointer-events-none transition-all duration-200"
//             style={{
//               background: `radial-gradient(
//                 circle 60px at ${downloadButton.spotlightX}% ${downloadButton.spotlightY}%,
//                 rgba(0, 213, 190, ${0.4 + downloadButton.spotlightIntensity * 0.4}) 0%,
//                 rgba(0, 213, 190, ${0.2 + downloadButton.spotlightIntensity * 0.3}) 30%,
//                 rgba(97, 95, 255, ${0.1 + downloadButton.spotlightIntensity * 0.2}) 60%,
//                 transparent 100%
//               )`,
//               opacity: downloadButton.spotlightIntensity > 0 ? 1 : 0,
//             }}
//           />

//           {/* Subtle background glow */}
//           <div
//             className="absolute inset-0 rounded-2xl transition-all duration-300"
//             style={{
//               background: `rgba(0, 213, 190, ${downloadButton.spotlightIntensity * 0.1})`,
//               boxShadow:
//                 downloadButton.spotlightIntensity > 0.3
//                   ? `inset 0 0 20px rgba(0, 213, 190, ${downloadButton.spotlightIntensity * 0.3})`
//                   : "none",
//             }}
//           />

//           {/* Border highlight that follows spotlight */}
//           <div
//             className="absolute inset-0 rounded-2xl border-2 transition-all duration-200 pointer-events-none"
//             style={{
//               borderImage:
//                 downloadButton.spotlightIntensity > 0.2
//                   ? `linear-gradient(
//                     ${
//                       (Math.atan2(
//                         downloadButton.spotlightY - 50,
//                         downloadButton.spotlightX - 50
//                       ) *
//                         180) /
//                         Math.PI +
//                       90
//                     }deg,
//                     transparent 0%,
//                     rgba(0, 213, 190, ${downloadButton.spotlightIntensity * 0.8}) 40%,
//                     rgba(0, 213, 190, ${downloadButton.spotlightIntensity * 0.6}) 60%,
//                     transparent 100%
//                   ) 1`
//                   : "none",
//             }}
//           />

//           <span className="relative z-10 flex items-center gap-2">
//             Download CV
//             <svg
//               className="w-5 h-5 transition-all duration-300"
//               style={{
//                 filter:
//                   downloadButton.spotlightIntensity > 0.3
//                     ? `drop-shadow(0 0 8px rgba(0, 213, 190, ${downloadButton.spotlightIntensity * 0.6}))`
//                     : "none",
//                 transform: `scale(${1 + downloadButton.spotlightIntensity * 0.1})`,
//               }}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//           </span>
//         </button>
//       </div>

//       {/* Mobile scroll indicator */}
//       {isMobile && (
//         <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-60">
//           Scroll to activate: {Math.round(scrollProgress * 100)}%
//         </div>
//       )}
//     </div>
//   );
// };

// export default MagneticButtons;
import { motion, type Variants } from "framer-motion";
import dummyPassport from "../assets/images/dummy-passport.jpeg";

const HeroSection: React.FC = () => {
  const fadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeInScale: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeInLeft: Variants = {
    hidden: {
      opacity: 0,
      x: -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeInRight: Variants = {
    hidden: {
      opacity: 0,
      x: 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const buttonStagger: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Viewport settings for performance
  const viewportSettings = {
    once: false,
    margin: "-100px",
    amount: 0.3,
  };

  return (
    <div>
      <div className="relative w-screen pt-16 md:pt-24">
        <>
          <NoiseOverlay />
          <BouncingLogosHeroSection />
          <AnimatedGradientsHeroSection />
        </>

     
        <picture className="fixed top-0 w-full h-full flex justify-center items-start">
          <img
            src={OponIfa}
            alt="Effect Image"
            className="max-w-[202px] max-h-[195px] w-auto h-auto object-contain"
          />
        </picture>

        <div>
          <motion.div
            className="max-w-4xl mt-32 w-full mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <div className="text-center space-y-8 sm:space-y-12">
            
              <motion.div
                className="flex justify-center"
                variants={fadeInScale}
              >
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                    <img
                      src={dummyPassport}
                      alt="UX Designer Profile"
                      className="w-full h-full object-cover grayscale hover:cursor-none hover:grayscale-0 hover:scale-110 transition-all duration-500"
                    />
                  </div>
                </div>
              </motion.div>

           
              <motion.div
                className="space-y-4 sm:space-y-6"
                variants={fadeInUp}
              >
                <h1 className="text-4xl sm:text-3xl lg:text-5xl font-bold leading-tight">
                  <span className="text-teal-400">UX Designer </span>
                  <span className="text-white">Who Codes in </span>
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    JAVA
                  </span>
                </h1>
              </motion.div>

            
              <motion.div className="max-w-3xl mx-auto" variants={fadeInUp}>
                <p className="text-white text-base leading-relaxed px-4">
                  I'm Uthman, a UX designer with 3+ years of experience creating
                  user-centered digital products. With a background in Java
                  development and OOP/architecture, I blend empathy with
                  technical insight to craft interfaces that are both intuitive
                  and efficient. I'm passionate about solving real problems
                  through clean, purposeful design.
                </p>
              </motion.div>

            
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4 sm:pt-8"
                variants={buttonStagger}
              >
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-full hover:from-teal-400 hover:to-emerald-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-teal-500/25 w-full sm:w-auto"
                  variants={fadeInLeft}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Hire me</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                <motion.button
                  className="group px-8 py-4 border-2 border-gray-500 text-gray-300 font-semibold rounded-full hover:border-white hover:text-white hover:bg-white/5 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                  variants={fadeInRight}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download CV
                </motion.button>
              </motion.div>

              <motion.div
                className="hidden lg:block absolute top-20 left-20 w-2 h-2 bg-teal-400 rounded-full animate-pulse"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ ...viewportSettings, amount: 0.8 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              <motion.div
                className="hidden lg:block absolute bottom-32 right-32 w-3 h-3 bg-emerald-400 rounded-full animate-pulse delay-1000"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ ...viewportSettings, amount: 0.8 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              />
              <motion.div
                className="hidden lg:block absolute top-1/3 right-20 w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-500"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ ...viewportSettings, amount: 0.8 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
