import React, { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  type Variants,
  MotionValue,
} from "framer-motion";


interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  description: string;
  icon: React.ReactNode; 
  index: number;
  isExploreProject?: boolean; 
}

// 2. COMPONENT WITH PROPER TYPING
const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  role,
  period,
  description,
  icon,
  index,
  isExploreProject = false,
}) => {
  // 3. PROPER REF TYPING - HTMLDivElement for div elements
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // 4. PROPER HOOK USAGE WITH TYPES
  const isInView = useInView(cardRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  // 5. EXPLICIT TYPING FOR ANIMATION VARIANTS
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // 6. MOTION VALUES WITH PROPER TYPING
  const mouseX: MotionValue<number> = useMotionValue(0);
  const mouseY: MotionValue<number> = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 50 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 50 });

  // 7. PROPER TRANSFORM USAGE
  const lightX = useTransform(smoothMouseX, [-200, 200], [30, 70]);
  const lightY = useTransform(smoothMouseY, [-200, 200], [30, 70]);

  // 8. PROPERLY TYPED EVENT HANDLERS
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // 9. HANDLE BUTTON CLICK WITH PROPER TYPING
  const handleExploreClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    // Add your navigation logic here
    console.log("Exploring project...");
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group mb-6"
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute -left-6 top-6 w-2 h-2 bg-blue-400/60 rounded-full"
        whileInView={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.2,
        }}
      />

      {/* Main card with advanced glass morphism */}
      <motion.div
        className="relative bg-white/[0.02] backdrop-blur-md border border-white/[0.05] rounded-lg p-6 overflow-hidden"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.01) 100%)`
            : "rgba(255,255,255,0.02)",
        }}
        whileHover={{
          borderColor: "rgba(255,255,255,0.15)",
          transition: { duration: 0.3 },
        }}
      >
        {/* Subtle shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
          style={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 -translate-x-full"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,255,255,0.03) 20%,
                rgba(255,255,255,0.08) 50%,
                rgba(255,255,255,0.03) 80%,
                transparent 100%)`,
              width: "200%",
            }}
            animate={
              isHovered
                ? {
                    x: ["0%", "50%"],
                  }
                : { x: "0%" }
            }
            transition={{
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 1,
            }}
          />
        </motion.div>

        <div className="relative flex flex-col gap-2.5 md:gap-3 ">
          {/* Header */}
          <div className=" flex flex-col gap-4 md:justify-between md:flex-row md:gap-0 items-center">
            <span className="flex items-center gap-2">
              <motion.picture
                className="text-xl  opacity-70"
                whileHover={{ scale: 1.1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.picture>
              <motion.h3
                className="text-white/90 font-medium text-base"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {role} – {company}
              </motion.h3>
            </span>

            <span >
              <motion.p
                className="text-white/50 text-sm"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {period}
              </motion.p>
            </span>
          </div>

          {/* Description */}
          <motion.p
            className="text-white/70 text-sm leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {description}
          </motion.p>

         

          {/* Subtle hover indicator */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-2 h-2 bg-white/20 rounded-full" />
          </motion.div>
        </div>

        {/* Edge highlight on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255,255,255,0.1) 0%, 
              transparent 20%, 
              transparent 80%, 
              rgba(255,255,255,0.05) 100%)`,
            opacity: 0,
          }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;
