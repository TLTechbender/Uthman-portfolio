import { motion, type Variants } from "framer-motion";

import NoiseOverlay from "./effects/noiseOverlay";
import BouncingLogosHeroSection from "./effects/bouncingLogosHeroSection";
import AnimatedGradientsHeroSection from "./effects/animatedGradientHeroSection";
import OponIfa from "../assets/images/opon-ifa.svg";

import { useRef, useEffect } from "react";
import type { Hero } from "~/sanity/interfaces/homepage";
import { urlFor } from "~/sanity/sanityClient";

interface HeroSectionProps {
  hero: Hero;
}

const HeroSection: React.FC<HeroSectionProps> = ({ hero }) => {
  const initialFadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const initialFadeInScale: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 },
    },
  };

  const buttonHover: Variants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: { scale: 0.98 },
  };

  const floatingAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: [0, -40, 0],
      transition: {
        opacity: { duration: 0.5 },
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
  };

  const initialStaggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  console.log(hero.typewriterWords);
  const phrases = hero.typewriterWords;
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const currentPhraseIndex = useRef(0);
  const currentText = useRef("");
  const isDeleting = useRef(false);
  const typewriterStarted = useRef(false);

  useEffect(() => {
    // Start typewriter after initial animations
    const startTimer = setTimeout(() => {
      typewriterStarted.current = true;
      startTypewriter();
    }, 1200);

    // Start cursor blinking immediately
    const cursorInterval = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === "0" ? "1" : "0";
      }
    }, 530);

    function startTypewriter() {
      if (!typewriterStarted.current) return;

      const currentPhrase = phrases[currentPhraseIndex.current];

      if (!isDeleting.current) {
        if (currentText.current.length < currentPhrase.length) {
          currentText.current = currentPhrase.slice(
            0,
            currentText.current.length + 1
          );
          if (typewriterRef.current) {
            typewriterRef.current.textContent = currentText.current;
          }
          // Smoother writing - reduced from 300ms to 120ms
          setTimeout(startTypewriter, 120);
        } else {
          setTimeout(() => {
            isDeleting.current = true;
            startTypewriter();
          }, 2000);
        }
      } else {
        if (currentText.current.length > 0) {
          currentText.current = currentText.current.slice(0, -1);
          if (typewriterRef.current) {
            typewriterRef.current.textContent = currentText.current;
          }
          // Faster deletion - reduced from 180ms to 50ms
          setTimeout(startTypewriter, 50);
        } else {
          isDeleting.current = false;
          currentPhraseIndex.current =
            (currentPhraseIndex.current + 1) % phrases.length;
          setTimeout(startTypewriter, 300);
        }
      }
    }

    return () => {
      clearTimeout(startTimer);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-full py-16 md:pt-24 overflow-hidden">
      {/* Background effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <NoiseOverlay />
        <BouncingLogosHeroSection />
        <AnimatedGradientsHeroSection />
      </motion.div>

      {/* Floating background image - hide on very small screens */}
      <motion.picture
        className="absolute top-0 w-full h-full hidden sm:flex justify-center items-start"
        variants={floatingAnimation}
        initial="hidden"
        animate="visible"
      >
        <img
          src={OponIfa}
          alt="Effect Image"
          className="max-w-[150px] sm:max-w-[180px] md:max-w-[202px] max-h-[145px] sm:max-h-[170px] md:max-h-[195px] w-auto h-auto object-contain opacity-20"
        />
      </motion.picture>

      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mt-18 md:mt-24 lg:mt-28 w-full mx-auto relative"
          variants={initialStaggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center space-y-6 sm:space-y-8 lg:space-y-12">
            {/* Profile Image */}
            <motion.div
              className="flex justify-center"
              variants={initialFadeInScale}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 sm:border-4 border-white/20 shadow-2xl relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-emerald-500/20 rounded-full z-0"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <img
                    src={urlFor(hero.centerPieceImage.asset._id)
                      .width(96)
                      .height(96)
                      .format("jpg")
                      .quality(100)
                      .url()}
                    alt="UX Designer Profile"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 hover:cursor-none hover:scale-110 transition-all duration-700 relative z-10"
                  />
                </div>

                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-teal-400/30"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Main Heading with Typewriter */}
            <motion.div
              className="space-y-3 sm:space-y-4 lg:space-y-6"
              variants={initialFadeInUp}
            >
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-2 sm:px-0">
                {hero.beforeTypewriterText}{" "}
                <span className="relative inline-block">
                  {/* Dynamic width calculation based on longest phrase */}
                  <span
                    className="inline-block text-left relative"
                    style={{
                      minWidth: `${Math.max(...phrases.map((phrase) => phrase.length)) * 0.5}ch`, // Dynamic width based on longest phrase
                      minHeight: "1.2em",
                      verticalAlign: "top",
                    }}
                  >
                    {/* Hidden text for width calculation - all phrases rendered invisibly */}
                    <span
                      className="absolute top-0 left-0 invisible pointer-events-none select-none"
                      aria-hidden="true"
                    >
                      {phrases.reduce(
                        (longest, current) =>
                          current.length > longest.length ? current : longest,
                        ""
                      )}
                    </span>

                    <motion.span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 relative z-10"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      <span ref={typewriterRef}>ui designer</span>
                      <span
                        ref={cursorRef}
                        className="inline-flex w-0.5 bg-teal-400 ml-1"
                        style={{
                          opacity: 1,
                          height: "1em", // Use em units to scale with font size
                        }}
                      >
                        |
                      </span>
                    </motion.span>
                  </span>
                </span>
                <span className="text-white"> {hero.remainingText} </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0"
              variants={initialFadeInUp}
            >
              <p className="text-white text-base sm:text-lg leading-relaxed">
                {hero.subHeading}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-0"
              variants={initialFadeInUp}
            >
              {/* Primary CTA Button */}
              <motion.a
                style={{
                  boxShadow: "2px 2px 0px 0px #032A22",
                }}
                className="relative cursor-pointer bg-[#0FB492] hover:bg-teal-500 px-6 sm:px-8 py-4 rounded-xl text-black hover:text-white text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 focus:outline-none focus:ring-2 focus:ring-teal-500 w-48 sm:w-fit h-12 sm:h-auto flex items-center justify-center"
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                href={hero.hireLink?.url}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{hero.hireLink?.text}</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ borderRadius: "50%" }}
                />
              </motion.a>

              {/* Secondary CTA Button */}
              <motion.a
                className="group px-6 sm:px-8 py-4 border-2 border-[#F2F2F299] text-white font-semibold rounded-xl hover:border-[#0FB492] hover:text-[#0FB492] hover:bg-teal-400/5 relative overflow-hidden w-48 sm:w-fit h-12 sm:h-auto cursor-pointer text-sm sm:text-base flex items-center justify-center"
                variants={buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                href={hero.cvLink?.externalUrl || "#"}
              >
                <motion.div
                  className="absolute inset-0 border-2 border-teal-400 rounded-xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{hero.cvLink?.text}</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
