// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import { FaArrowRight } from "react-icons/fa6";

// // interface ProjectCardProps {
// //   title: string;
// //   previewImage: string;
// //   buttonText: string;
// //   buttonLink: string;
// //   shortDescription: string;
// // }

// // const ProjectCard: React.FC<ProjectCardProps> = ({
// //   title,
// //   previewImage,
// //   buttonLink,
// //   buttonText,
// //   shortDescription,
// // }) => {
// //   const [isLinkHovered, setIsLinkHovered] = useState(false);

// //   return (
// //     <div className="flex items-center justify-center p-6 overflow-hidden font-arial">
// //       <div className="relative rounded-3xl p-8 max-w-4xl w-full shadow-2xl overflow-hidden">
// //         {/* Static SVG Background */}
// //         <svg
// //           className="absolute inset-0 w-full h-full"
// //           viewBox="0 0 854 361"
// //           preserveAspectRatio="xMidYMid slice"
// //           fill="none"
// //           xmlns="http://www.w3.org/2000/svg"
// //         >
// //           <g clipPath="url(#clip0_1_494)">
// //             <rect width="854" height="361" rx="24" fill="#04070D" />

// //             <rect
// //               x="745.103"
// //               y="276.726"
// //               width="373.369"
// //               height="373.369"
// //               rx="22"
// //               fill="url(#paint0_linear_1_494)"
// //               style={{
// //                 fillOpacity: 0.15,
// //                 transform: "rotate(-144.536deg)",
// //                 transformOrigin: "931.787px 463.411px",
// //               }}
// //             />

// //             <rect
// //               width="489.826"
// //               height="489.826"
// //               rx="22"
// //               fill="url(#paint1_linear_1_494)"
// //               style={{
// //                 fillOpacity: 0.15,
// //                 transform:
// //                   "matrix(0.578373, -0.815773, -0.815773, -0.578373, 219.587, 702.889)",
// //               }}
// //             />
// //           </g>

// //           <rect
// //             x="0.5"
// //             y="0.5"
// //             width="853"
// //             height="360"
// //             rx="23.5"
// //             stroke="#1C1C21"
// //           />

// //           <defs>
// //             <linearGradient
// //               id="paint0_linear_1_494"
// //               x1="1118.47"
// //               y1="276.726"
// //               x2="931.787"
// //               y2="650.094"
// //               gradientUnits="userSpaceOnUse"
// //             >
// //               <stop stopColor="rgba(34, 197, 94, 0.15)" />
// //               <stop
// //                 offset="1"
// //                 stopColor="rgba(59, 130, 246, 0.1)"
// //                 stopOpacity="0"
// //               />
// //             </linearGradient>

// //             <linearGradient
// //               id="paint1_linear_1_494"
// //               x1="489.826"
// //               y1="-1.4598e-05"
// //               x2="244.913"
// //               y2="489.826"
// //               gradientUnits="userSpaceOnUse"
// //             >
// //               <stop stopColor="rgba(147, 51, 234, 0.15)" />
// //               <stop
// //                 offset="1"
// //                 stopColor="rgba(34, 197, 94, 0.1)"
// //                 stopOpacity="0"
// //               />
// //             </linearGradient>

// //             <clipPath id="clip0_1_494">
// //               <rect width="854" height="361" rx="24" fill="white" />
// //             </clipPath>
// //           </defs>
// //         </svg>

// //         <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
// //           <div className="space-y-2 order-2 lg:order-1">
// //             <div className="flex flex-col gap-6">
// //               <h1 className="text-4xl font-bold text-[#E4E4E6] mb-4 tracking-tight capitalize">
// //                 {title}
// //               </h1>

// //               <p className="text-[#E4E4E6] text-lg leading-relaxed mb-8">
// //                 {shortDescription}
// //               </p>
// //             </div>

// //             {/* Animated Link - Only Animation Remaining */}
// //             <motion.a
// //               href={buttonLink}
// //               className="
// //                 inline-flex items-center gap-3 group relative overflow-hidden
// //                 bg-gradient-to-r from-[#0FB492] to-teal-500
// //                 hover:from-teal-500 hover:to-emerald-500
// //                 text-black hover:text-white font-semibold
// //                 px-6 py-3 rounded-xl shadow-lg
// //                 focus:outline-none focus:ring-2 focus:ring-teal-500
// //               "
// //               onMouseEnter={() => setIsLinkHovered(true)}
// //               onMouseLeave={() => setIsLinkHovered(false)}
// //               animate={{
// //                 scale: isLinkHovered ? 1.05 : 1,
// //                 boxShadow: isLinkHovered
// //                   ? "0 20px 25px -5px rgba(20, 184, 166, 0.25)"
// //                   : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
// //               }}
// //               whileTap={{ scale: 0.98 }}
// //               transition={{
// //                 duration: 0.3,
// //                 ease: "easeOut",
// //               }}
// //             >
// //               <span className="relative z-10">{buttonText}</span>

// //               <motion.div
// //                 animate={{
// //                   x: isLinkHovered ? 4 : 0,
// //                   rotate: isLinkHovered ? 0 : -45,
// //                 }}
// //                 transition={{
// //                   duration: 0.3,
// //                   ease: "easeOut",
// //                 }}
// //               >
// //                 <FaArrowRight className="w-4 h-4 relative z-10" />
// //               </motion.div>

// //               <motion.div
// //                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12"
// //                 initial={{ x: "-100%" }}
// //                 animate={{
// //                   x: isLinkHovered ? "100%" : "-100%",
// //                 }}
// //                 transition={{
// //                   duration: isLinkHovered ? 0.7 : 0,
// //                   ease: "easeOut",
// //                 }}
// //               />
// //             </motion.a>
// //           </div>

// //           <div className="flex justify-center lg:justify-end order-1 lg:order-2">
// //             <div className="relative transform">
// //               <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
// //                 <img
// //                   src={previewImage}
// //                   alt={`Project card Image`}
// //                   className="w-full h-full object-cover object-center"
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default ProjectCard;
// import projectCardBackground from "../../assets/images/projectCardBackground.png";
// import React, { useState, useRef, useEffect } from "react";
// import {
//   motion,
//   useInView,
//   useScroll,
//   useTransform,
//   type Variants,
// } from "framer-motion";
// import { FaArrowRight } from "react-icons/fa6";

// interface ProjectCardProps {
//   title: string;
//   previewImage: string;
//   buttonText: string;
//   buttonLink: string;
//   shortDescription: string;
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({
//   title,
//   previewImage,
//   buttonLink,
//   buttonText,
//   shortDescription,
// }) => {
//   const [isCardHovered, setIsCardHovered] = useState(false);
//   const [isLinkHovered, setIsLinkHovered] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

//   const cardRef = useRef<HTMLDivElement>(null);
//   const svgRef = useRef<HTMLDivElement>(null);

//   // Framer Motion's useInView hook
//   const isVisible = useInView(cardRef, {
//     margin: "-50px 0px -50px 0px",
//   });

//   // Framer's useScroll for scroll progress
//   const { scrollYProgress } = useScroll({
//     target: cardRef,
//     offset: ["start end", "end start"],
//   });

//   const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

//   // Dynamic SVG gradient updates (using card hover for background effects)
//   useEffect(() => {
//     if (!svgRef.current) return;

//     const intensity = isCardHovered ? 0.3 : 0.15;
//     const progressIntensity = scrollProgress.get() * 0.2;

//     const gradients = svgRef.current.querySelectorAll("linearGradient stop");
//     gradients.forEach((stop, index) => {
//       const baseIntensity = intensity + progressIntensity;
//       if (index % 2 === 0) {
//         stop.setAttribute("stop-color", `rgba(34, 197, 94, ${baseIntensity})`);
//       } else {
//         stop.setAttribute(
//           "stop-color",
//           `rgba(59, 130, 246, ${baseIntensity * 0.8})`
//         );
//       }
//     });

//     const currentPos = isCardHovered ? mousePosition : { x: 50, y: 50 };
//     const gradient1 = svgRef.current.querySelector("#paint0_linear_1_494");
//     const gradient2 = svgRef.current.querySelector("#paint1_linear_1_494");

//     if (gradient1) {
//       gradient1.setAttribute("x1", `${1118.47 + (currentPos.x - 50) * 0.5}`);
//       gradient1.setAttribute("y1", `${276.726 + (currentPos.y - 50) * 0.3}`);
//     }

//     if (gradient2) {
//       gradient2.setAttribute("x1", `${489.826 + (currentPos.x - 50) * 0.3}`);
//       gradient2.setAttribute("y1", `${(currentPos.y - 50) * 0.2}`);
//     }
//   }, [mousePosition, isCardHovered, scrollProgress]);

//   // Animation variants
//   const cardVariants: Variants = {
//     hidden: {
//       opacity: 0,
//       y: 32,
//       scale: 0.95,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 1,
//         ease: [0.25, 0.46, 0.45, 0.94],
//         delay: 0.1,
//       },
//     },
//   };

//   const contentVariants: Variants = {
//     hidden: {
//       opacity: 0,
//       x: -20,
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 1,
//         ease: "easeOut",
//         delay: 0.2,
//       },
//     },
//   };

//   const imageVariants: Variants = {
//     hidden: {
//       opacity: 0,
//       x: 20,
//       y: -10,
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       y: 0,
//       transition: {
//         duration: 1,
//         ease: "easeOut",
//         delay: 0.3,
//       },
//     },
//   };

//   const titleVariants: Variants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//         delay: 0.3,
//       },
//     },
//   };

//   const descriptionVariants: Variants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//         delay: 0.4,
//       },
//     },
//   };

//   const buttonVariants: Variants = {
//     hidden: { opacity: 0, y: 16 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut",
//         delay: 0.3,
//       },
//     },
//   };

//   return (
//     <div className="flex items-center justify-center p-6 overflow-hidden font-arial">
//       <motion.div
//         ref={cardRef}
//         className={`
//           relative rounded-3xl p-8 max-w-4xl w-full shadow-2xl overflow-hidden
//           cursor-pointer
//           ${isCardHovered ? "shadow-3xl" : ""}
//         `}
//         variants={cardVariants}
//         initial="hidden"
//         animate={isVisible ? "visible" : "hidden"}
//         whileHover={{
//           scale: 1.02,
//           rotateX: 2,
//           transition: { duration: 0.3 },
//         }}
//         style={{
//           transformStyle: "preserve-3d",
//           perspective: "1000px",
//         }}
//         onMouseEnter={() => setIsCardHovered(true)}
//         onMouseLeave={() => setIsCardHovered(false)}
//       >
//         <div
//           ref={svgRef}
//           className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-75 ease-out"
//           style={{
//             backgroundImage: `url(${projectCardBackground})`,
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//             willChange: "transform, filter",
//             transform: "translate3d(0, 0, 0) scale(1.05)", // Slight oversizing for parallax
//           }}
//         />
//         {/* Subtle glow overlay with motion, I too sabi bro */}
//         <motion.div
//           className="absolute inset-0 rounded-3xl pointer-events-none"
//           animate={{
//             opacity: isCardHovered ? 1 : 0,
//           }}
//           transition={{
//             duration: 0.5,
//             ease: "easeOut",
//           }}
//           style={{
//             background: isCardHovered
//               ? `
//               radial-gradient(circle 300px at ${mousePosition.x}% ${mousePosition.y}%,
//                 rgba(34, 197, 94, 0.03) 0%,
//                 rgba(59, 130, 246, 0.02) 30%,
//                 transparent 60%)
//             `
//               : "transparent",
//           }}
//         />

//         <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <motion.div
//             className="space-y-2 order-2 lg:order-1"
//             variants={contentVariants}
//             initial="hidden"
//             animate={isVisible ? "visible" : "hidden"}
//           >
//             <div className="flex flex-col gap-6">
//               <motion.h1
//                 className="text-4xl font-bold text-[#E4E4E6] mb-4 tracking-tight capitalize"
//                 variants={titleVariants}
//               >
//                 {title}
//               </motion.h1>

//               <motion.p
//                 className="text-[#E4E4E6] text-lg leading-relaxed mb-8"
//                 variants={descriptionVariants}
//               >
//                 {shortDescription}
//               </motion.p>
//             </div>

//             {/* ISOLATED LINK HOVER - As I dey bundle states up and down, walahi, rerenders dey fear me*/}
//             <motion.a
//               href={buttonLink}
//               className="
//                 inline-flex items-center gap-3 group relative overflow-hidden
//                 bg-gradient-to-r from-[#0FB492] to-teal-500
//                 hover:from-teal-500 hover:to-emerald-500
//                 text-black hover:text-white font-semibold
//                 px-6 py-3 rounded-xl shadow-lg
//                 focus:outline-none focus:ring-2 focus:ring-teal-500
//               "
//               variants={buttonVariants}
//               onMouseEnter={() => setIsLinkHovered(true)}
//               onMouseLeave={() => setIsLinkHovered(false)}
//               animate={{
//                 scale: isLinkHovered ? 1.05 : 1,
//                 boxShadow: isLinkHovered
//                   ? "0 20px 25px -5px rgba(20, 184, 166, 0.25)"
//                   : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
//               }}
//               whileTap={{ scale: 0.98 }}
//               transition={{
//                 duration: 0.3,
//                 ease: "easeOut",
//               }}
//             >
//               <span className="relative z-10">{buttonText}</span>

//               <motion.div
//                 animate={{
//                   x: isLinkHovered ? 4 : 0,
//                   rotate: isLinkHovered ? 0 : -45,
//                 }}
//                 transition={{
//                   duration: 0.3,
//                   ease: "easeOut",
//                 }}
//               >
//                 <FaArrowRight className="w-4 h-4 relative z-10 " />
//               </motion.div>

//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12"
//                 initial={{ x: "-100%" }}
//                 animate={{
//                   x: isLinkHovered ? "100%" : "-100%",
//                 }}
//                 transition={{
//                   duration: isLinkHovered ? 0.7 : 0,
//                   ease: "easeOut",
//                 }}
//               />
//             </motion.a>
//           </motion.div>

//           <motion.div
//             className="flex justify-center lg:justify-end order-1 lg:order-2"
//             variants={imageVariants}
//             initial="hidden"
//             animate={isVisible ? "visible" : "hidden"}
//           >
//             <motion.div
//               className="relative transform"
//               animate={{
//                 rotateY: isCardHovered ? -5 : 0,
//                 rotateX: isCardHovered ? 5 : 0,
//                 z: isCardHovered ? 20 : 0,
//               }}
//               style={{
//                 scale: useTransform(scrollProgress, [0, 1], [1, 1.05]),
//                 transformStyle: "preserve-3d",
//               }}
//               transition={{
//                 duration: 0.7,
//                 ease: "easeOut",
//               }}
//             >
//               <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
//                 <motion.img
//                   src={previewImage}
//                   alt={`Project card Image`}
//                   className="w-full h-full object-cover object-center"
//                   animate={{
//                     scale: isCardHovered ? 1.05 : 1,
//                   }}
//                   transition={{
//                     duration: 0.7,
//                     ease: "easeOut",
//                   }}
//                 />

//                 {/* Phone screen glow */}
//                 <motion.div
//                   className="absolute inset-4 rounded-2xl pointer-events-none"
//                   animate={{
//                     opacity: isCardHovered ? 1 : 0,
//                   }}
//                   transition={{
//                     duration: 0.7,
//                     ease: "easeOut",
//                   }}
//                   style={{
//                     background: `
//                       radial-gradient(ellipse at center,
//                         rgba(34, 197, 94, 0.1) 0%,
//                         rgba(59, 130, 246, 0.05) 50%,
//                         transparent 80%)
//                     `,
//                   }}
//                 />
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Professional accent elements */}
//         <motion.div
//           className="absolute top-8 right-8 w-2 h-2 rounded-full bg-emerald-400 opacity-60"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.6, 0.8, 0.6],
//           }}
//           transition={{f
//             duration: 3,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-8 left-8 w-1.5 h-1.5 rounded-full bg-blue-400 opacity-40"
//           animate={{
//             scale: [1, 1.3, 1],
//             opacity: [0.4, 0.7, 0.4],
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 1,
//           }}
//         />
//         <motion.div
//           className="absolute top-1/3 left-4 w-1 h-1 rounded-full bg-purple-400 opacity-50"
//           animate={{
//             scale: [1, 1.4, 1],
//             opacity: [0.5, 0.8, 0.5],
//           }}
//           transition={{
//             duration: 5,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 2,
//           }}
//         />
//       </motion.div>
//     </div>
//   );
// };

// export default ProjectCard;
import projectCardBackground from "../../assets/images/projectCardBackground.png";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

interface ProjectCardProps {
  title: string;
  previewImage: string;
  buttonText: string;
  buttonLink: string;
  shortDescription: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  previewImage,
  buttonLink,
  buttonText,
  shortDescription,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Single scroll-based animation system
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.8", "start 0.3"], // Triggers when element is 80% into view, completes at 30%
  });

  // Transform scroll progress to opacity and y-position
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  return (
    <div className="flex items-center  justify-center p-6 overflow-hidden font-arial">
      {/**
       *
       * Weird bro, there is the big ass container and the small container within bro
       */}
      <motion.div
        ref={cardRef}
        className="relative rounded-3xl p-8 max-w-4xl  border border-[#1C1C21] w-full shadow-2xl overflow-hidden"
        style={{
          opacity,
          y,
        }}
      >
        {/* Static background - no animations */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${projectCardBackground})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content section - inherits parent animation */}
          <div className="space-y-2 order-2 lg:order-1">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-bold text-[#E4E4E6] mb-4 tracking-tight capitalize">
                {title}
              </h1>

              <p className="text-[#E4E4E6] text-lg leading-relaxed mb-8">
                {shortDescription}
              </p>
            </div>

            {/* Simple button with minimal hover effect */}
            <motion.a
              href={buttonLink}
              className="
                inline-flex items-center gap-3 group relative overflow-hidden
                bg-gradient-to-r from-[#0FB492] to-teal-500
                hover:from-teal-500 hover:to-emerald-500
                text-black hover:text-white font-semibold
                px-6 py-3 rounded-xl shadow-lg
                focus:outline-none focus:ring-2 focus:ring-teal-500
              "
              onMouseEnter={() => setIsLinkHovered(true)}
              onMouseLeave={() => setIsLinkHovered(false)}
              animate={{
                scale: isLinkHovered ? 1.05 : 1,
                boxShadow: isLinkHovered
                  ? "0 20px 25px -5px rgba(20, 184, 166, 0.25)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <span className="relative z-10">{buttonText}</span>

              <motion.div
                animate={{
                  x: isLinkHovered ? 4 : 0,
                  rotate: isLinkHovered ? 0 : -45,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <FaArrowRight className="w-4 h-4 relative z-10" />
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                animate={{
                  x: isLinkHovered ? "100%" : "-100%",
                }}
                transition={{
                  duration: isLinkHovered ? 0.7 : 0,
                  ease: "easeOut",
                }}
              />
            </motion.a>
          </div>

          {/* Image section - also inherits parent animation */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative transform">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={previewImage}
                  alt={`Project card Image`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
