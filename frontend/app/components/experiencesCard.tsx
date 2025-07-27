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
import type { Experience } from "sanity/interfaces/homepage";
import { urlFor } from "sanity/sanityClient";

interface ExperienceCardProps extends Experience {
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  description,
  organisationLogo,
  jobTitle,
  duration,
  index,
}) => {

    console.log(organisationLogo.asset);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const isInView = useInView(cardRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

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

  const mouseX: MotionValue<number> = useMotionValue(0);
  const mouseY: MotionValue<number> = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 50 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 50 });

  const lightX = useTransform(smoothMouseX, [-200, 200], [30, 70]);
  const lightY = useTransform(smoothMouseY, [-200, 200], [30, 70]);

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
                              <img
                                  className="rounded-full w-6 h-6"
                  src={urlFor(organisationLogo.asset._id)
                    .width(48)
                    .height(48)
                    .format("webp")
                    .url()}
                  alt={organisationLogo.alt || ""}
                />
              </motion.picture>
              <motion.h3
                className="text-white/90 font-medium text-base"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {jobTitle}
              </motion.h3>
            </span>

            <span>
              <motion.p
                className="text-white/50 text-sm"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {duration}
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
