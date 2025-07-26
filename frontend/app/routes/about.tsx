import React from "react";
import { motion, type Variants } from "framer-motion";
import designerOlorun from "../assets/images/designer-olorun.jpeg";
import designerOlogo from "../assets/images/designer.jpeg";
import desginerOro from "../assets/images/uthman.jpeg";
import NoiseOverlay from "~/components/effects/noiseOverlay";
import AnimatedGradientsHeroSection from "~/components/effects/animatedGradientHeroSection";

export default function About() {
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

  const initialStaggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="relative w-full ">
      {/* Background effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <NoiseOverlay />
        <AnimatedGradientsHeroSection />
      </motion.div>

      <div className="relative  pt-24 pb-16 ">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Hero Section - About Us Takes Center Stage */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]"
            variants={initialStaggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Main About Us Content - Hero */}
            <div className="lg:col-span-7 order-1 lg:order-1">
              <motion.div className="max-w-2xl" variants={initialFadeInUp}>
                <div className="mb-6">
                  <motion.p
                    className="text-teal-400 font-medium text-sm tracking-[0.3em] mb-4 uppercase"
                    variants={initialFadeInUp}
                  >
                    Welcome to Our World
                  </motion.p>
                  <motion.h1
                    className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight"
                    variants={initialFadeInUp}
                  >
                    A BIT
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                      ABOUT US
                    </span>
                  </motion.h1>
                </div>

                <motion.div
                  className="space-y-6 mb-8"
                  variants={initialFadeInUp}
                >
                  <p className="text-white/80 text-lg lg:text-xl leading-relaxed">
                    I'm more than just a UI designer — I bring ideas to life.
                    From rough concepts to fully functional products, I work at
                    the intersection of design and development to craft seamless
                    digital experiences. I don't just make things look good — I
                    make them work, feel, and flow intuitively.
                  </p>
                  <p className="text-white/70 text-base lg:text-lg leading-relaxed">
                    Whether it's designing interfaces that users love or helping
                    shape the product vision, I bring creativity, strategy, and
                    technical understanding to the table. My goal is always the
                    same: turn bold ideas into real, usable products that make
                    an impact. Let's build something meaningful.
                  </p>
                </motion.div>

                {/* Stats Integration */}
                <motion.div
                  className="flex items-center gap-8 mb-8"
                  variants={initialFadeInUp}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-1"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      150+
                    </motion.div>
                    <div className="text-white/60 text-sm uppercase tracking-wider">
                      Projects
                    </div>
                  </div>
                  <div className="w-px h-12 bg-white/20"></div>
                  <div className="text-center">
                    <motion.div
                      className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-1"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      25+
                    </motion.div>
                    <div className="text-white/60 text-sm uppercase tracking-wider">
                      Awards
                    </div>
                  </div>
                </motion.div>

                {/* Single Call-to-Action Button */}
                <motion.div
                  className="flex flex-col gap-2"
                  variants={initialFadeInUp}
                >
                  <motion.p className="text-white/60 text-sm mb-2">
                    Wanna talk about that project?
                  </motion.p>
                  <motion.button
                    style={{
                      boxShadow: "2px 2px 0px 0px #032A22",
                    }}
                    className="relative cursor-pointer bg-[#0FB492] hover:bg-teal-500 px-8 py-4 rounded-xl text-black hover:text-white text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 focus:outline-none focus:ring-2 focus:ring-teal-500 w-fit"
                    variants={buttonHover}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">HIT ME UP</span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ borderRadius: "50%" }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            {/* Supporting Images - Simplified */}
            <div className="lg:col-span-5 order-2 lg:order-2">
              <motion.div
                className="grid grid-cols-2 gap-4 lg:gap-6 h-[600px]"
                variants={initialFadeInScale}
              >
                {/* Large accent image */}
                <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl">
                  <img
                    src={designerOlogo}
                    alt="Designer showcase"
                    className="h-full w-full hover:cursor-none hover:scale-105 hover:grayscale-0 grayscale-100 object-cover transition-all duration-500"
                  />
                </div>

                {/* Supporting image 1 */}
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={desginerOro}
                    alt="Designer portrait"
                    className="h-full w-full hover:cursor-none hover:scale-105 hover:grayscale-0 grayscale-100 transition-all duration-500 object-cover"
                  />
                </div>

                {/* Supporting image 2 */}
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={designerOlorun}
                    alt="Designer workspace"
                    className="h-full w-full object-cover hover:cursor-none hover:scale-105 hover:grayscale-0 transition-all duration-500 grayscale-100"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Quote Section */}
          <motion.div
            className="mt-16 mb-8"
            variants={initialFadeInUp}
            initial="hidden"
            animate="visible"
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.blockquote
                className="text-2xl lg:text-3xl text-white/80 italic font-light leading-relaxed"
                variants={initialFadeInUp}
              >
                "Design is not just what it looks like and feels like. Design is
                how it works."
              </motion.blockquote>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 mx-auto mt-8"
                variants={initialFadeInScale}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

