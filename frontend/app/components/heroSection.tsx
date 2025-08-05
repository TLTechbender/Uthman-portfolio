import { motion, type Variants, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useMemo, useCallback } from "react";
import NoiseOverlay from "./effects/noiseOverlay";
import BouncingLogosHeroSection from "./effects/bouncingLogosHeroSection";
import AnimatedGradientsHeroSection from "./effects/animatedGradientHeroSection";
import OponIfa from "../assets/images/opon-ifa.svg";
import type { Hero } from "~/sanity/interfaces/homepage";
import { urlFor } from "~/sanity/sanityClient";

interface HeroSectionProps {
  hero: Hero;
}

const HeroSection: React.FC<HeroSectionProps> = ({ hero }) => {
  // Respect user's motion preferences
  const prefersReducedMotion = useReducedMotion();

  // All refs - NO STATE to prevent rerenders
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const currentPhraseIndex = useRef(0);
  const currentText = useRef("");
  const isDeleting = useRef(false);
  const typewriterStarted = useRef(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize animation variants to prevent recreation
  const slideFromLeft: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        x: prefersReducedMotion ? 0 : -50,
        scale: prefersReducedMotion ? 1 : 0.98,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: prefersReducedMotion ? 0.3 : 0.6,
          ease: "easeOut",
        },
      },
    }),
    [prefersReducedMotion]
  );

  const fadeInUp: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
    }),
    [prefersReducedMotion]
  );

  const fadeInScale: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: prefersReducedMotion ? 1 : 0.95,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    }),
    [prefersReducedMotion]
  );

  const floatingAnimation: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        y: prefersReducedMotion ? 0 : [0, -20, 0],
        transition: {
          opacity: { duration: 0.3 },
          y: prefersReducedMotion
            ? {}
            : {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
        },
      },
    }),
    [prefersReducedMotion]
  );

  const staggerContainer: Variants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0.05 : 0.1,
          delayChildren: 0.05,
        },
      },
    }),
    [prefersReducedMotion]
  );

  // Optimized typewriter effect using refs only - NO RERENDERS
  const phrases = hero.typewriterWords;

  const typeWriter = useCallback(() => {
    if (!typewriterStarted.current || !typewriterRef.current) return;

    const currentPhrase = phrases[currentPhraseIndex.current];

    if (!isDeleting.current) {
      // Typing forward
      if (currentText.current.length < currentPhrase.length) {
        currentText.current = currentPhrase.slice(
          0,
          currentText.current.length + 1
        );
        typewriterRef.current.textContent = currentText.current;

        animationTimeoutRef.current = setTimeout(
          typeWriter,
          100 + Math.random() * 100
        ); // Variable speed
      } else {
        // Finished typing, wait then start deleting
        animationTimeoutRef.current = setTimeout(() => {
          isDeleting.current = true;
          typeWriter();
        }, 2000);
      }
    } else {
      // Deleting backward
      if (currentText.current.length > 0) {
        currentText.current = currentText.current.slice(0, -1);
        typewriterRef.current.textContent = currentText.current;

        animationTimeoutRef.current = setTimeout(
          typeWriter,
          50 + Math.random() * 50
        ); // Faster deletion
      } else {
        // Finished deleting, move to next phrase
        isDeleting.current = false;
        currentPhraseIndex.current =
          (currentPhraseIndex.current + 1) % phrases.length;

        animationTimeoutRef.current = setTimeout(typeWriter, 500);
      }
    }
  }, [phrases]);

  // Cursor blinking effect using refs only
  const startCursorBlink = useCallback(() => {
    if (!cursorRef.current) return;

    let visible = true;
    const blink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = visible ? "1" : "0";
        visible = !visible;
      }
    };

    cursorIntervalRef.current = setInterval(blink, 530);
  }, []);

  // Initialize typewriter effect
  useEffect(() => {
    if (prefersReducedMotion) {
      // Show static text for reduced motion
      if (typewriterRef.current) {
        typewriterRef.current.textContent = phrases[0] || "";
      }
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
      return;
    }

    // Start typewriter after initial animations
    const startTimer = setTimeout(() => {
      typewriterStarted.current = true;
      typeWriter();
      startCursorBlink();
    }, 1500);

    return () => {
      clearTimeout(startTimer);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, [phrases, typeWriter, startCursorBlink, prefersReducedMotion]);

  // Memoize complex inline styles to prevent recalculation
  const typewriterContainerStyle = useMemo(
    () => ({
      minWidth: `${Math.max(...phrases.map((p) => p.length)) * 0.6}ch`,
      minHeight: "1.2em",
      verticalAlign: "top",
    }),
    [phrases]
  );

  // Memoize longest phrase for invisible sizing element
  const longestPhrase = useMemo(
    () =>
      phrases.reduce(
        (longest, current) =>
          current.length > longest.length ? current : longest,
        ""
      ),
    [phrases]
  );

  return (
    <div className="relative w-full h-full py-16 md:pt-24 overflow-hidden font-arial">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <NoiseOverlay />
        <BouncingLogosHeroSection />
        <AnimatedGradientsHeroSection />
      </motion.div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          className="absolute inset-0 top-0 hidden sm:flex justify-center items-start pt-4 md:pt-8 pointer-events-none"
          variants={floatingAnimation}
          initial="hidden"
          animate="visible"
        >
          <img
            src={OponIfa}
            alt="Effect Image"
            className="max-w-[150px] sm:max-w-[180px] md:max-w-[202px] opacity-20"
            loading="lazy"
          />
        </motion.div>

        <div className="px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mt-18 md:mt-24 lg:mt-28 w-full mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center space-y-6 sm:space-y-8 lg:space-y-12">
              {/* Profile image */}
              <motion.div
                className="flex justify-center"
                variants={fadeInScale}
              >
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 sm:border-4 border-white/20 shadow-2xl">
                    <img
                      src={urlFor(hero.centerPieceImage.asset._id)
                        .width(192)
                        .height(192)
                        .format("webp")
                        .quality(80)
                        .url()}
                      alt="Profile"
                      className="w-full h-full object-cover grayscale hover:scale-105 hover:cursor-none hover:grayscale-0 transition-all duration-300"
                      loading="eager"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-3 sm:space-y-4 lg:space-y-6"
                variants={slideFromLeft}
              >
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-2 sm:px-0 text-white">
                  {hero.beforeTypewriterText}{" "}
                  <span className="relative inline-block">
                    <span
                      className="inline-block text-left relative"
                      style={typewriterContainerStyle}
                    >
                      {/* Invisible sizing element */}
                      <span
                        className="absolute top-0 left-0 invisible pointer-events-none select-none"
                        aria-hidden="true"
                      >
                        {longestPhrase}
                      </span>

                      {/* Visible typewriter text with gradient */}
                      <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 relative z-10"
                        animate={
                          prefersReducedMotion
                            ? {}
                            : {
                                backgroundPosition: [
                                  "0% 50%",
                                  "100% 50%",
                                  "0% 50%",
                                ],
                              }
                        }
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ backgroundSize: "200% 200%" }}
                      >
                        <span ref={typewriterRef}></span>
                        <span
                          ref={cursorRef}
                          className="inline-flex w-0.5 bg-teal-400 ml-1"
                          style={{
                            opacity: 1,
                            height: "1em",
                          }}
                        >
                          |
                        </span>
                      </motion.span>
                    </span>
                  </span>
                  <span> {hero.remainingText}</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div
                className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0"
                variants={fadeInUp}
              >
                <p className="text-white text-base sm:text-lg leading-relaxed">
                  {hero.subHeading}
                </p>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
                variants={fadeInUp}
              >
                <motion.a
                  className="bg-[#0FB492] hover:bg-teal-500 px-8 py-4 rounded-xl text-black hover:text-white font-semibold transition-colors duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                  href={hero.hireLink?.url}
                >
                  {hero.hireLink?.text}
                </motion.a>

                <motion.a
                  className="px-8 py-4 border-2 border-white/60 hover:border-teal-400 text-white hover:text-teal-400 font-semibold rounded-xl transition-colors duration-200"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                  href={hero.cvLink?.externalUrl || "#"}
                >
                  {hero.cvLink?.text}
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
