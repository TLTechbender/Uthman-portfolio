import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  EffectFlip,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import { FaStar } from "react-icons/fa6";
// import "../assets/styles/swiperStyles.css";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import WireframeSixBackground from "./effects/wireframeSixBackground";
import WireframeSixGreenShapesBackground from "./effects/wireframeSixGreenShapesBackground";
import type { Testimonial } from "~/sanity/interfaces/homepage";

interface TestimoniesProps {
  testimoninesData?: Testimonial[];
}

// Scroll tracking hook - same as your Beyond Portfolio
const useScrollTracking = (delay: number = 0) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the element is visible
      const visibleTop = Math.max(
        0,
        Math.min(rect.height, windowHeight - rect.top)
      );
      const visibleBottom = Math.max(0, Math.min(rect.height, rect.bottom));
      const visibleHeight = Math.min(visibleTop, visibleBottom);

      const progress = Math.min(1, Math.max(0, visibleHeight / rect.height));
      setScrollProgress(progress);
      setIsVisible(progress > 0.1);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return { elementRef, scrollProgress, isVisible };
};

const TestimonialCard: React.FC<{ testimony: Testimonial; index: number }> = ({
  testimony,
  index,
}) => {
  const clampedRating = Math.max(1, Math.min(5, testimony.rating));

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, starIndex) => {
      const starNumber = starIndex + 1;
      const isGold = starNumber <= clampedRating;

      return (
        <FaStar
          key={starIndex}
          className={`text-lg ${isGold ? "text-yellow-400" : "text-gray-400"}`}
        />
      );
    });
  };

  // Get avatar URL, fallback to a default avatar if not provided
  const avatarUrl = testimony.avatar?.asset?.url;
  const avatarAlt = testimony.avatar?.alt || `${testimony.name} avatar`;

  return (
    <motion.div
      className="max-w-lg mx-auto bg-gray-900/90 backdrop-blur-sm text-white p-5 rounded-lg border border-gray-700 shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
    >
      <div className="flex items-center mb-4">
        <img
          src={avatarUrl}
          alt={avatarAlt}
          className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-gray-600"
          loading="lazy"
        />
        <div>
          <h3 className="text-lg font-semibold text-white">{testimony.name}</h3>
          <p className="text-gray-300 text-xs">{testimony.position}</p>
        </div>
      </div>

      <blockquote className="text-sm italic text-gray-100 mb-4 leading-relaxed line-clamp-4">
        "{testimony.testimony}"
      </blockquote>

      <div
        className="flex gap-1"
        aria-label={`Rating: ${clampedRating} out of 5 stars`}
      >
        {renderStars()}
      </div>
    </motion.div>
  );
};

const TestimoniesSwiper: React.FC<{
  testimonies: Testimonial[];
  scrollProgress: number;
}> = ({ testimonies, scrollProgress }) => {
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block relative">
        <motion.div
          animate={{
            opacity: Math.min(1, scrollProgress * 1.3),
            scale: 0.95 + scrollProgress * 0.05,
            y: (1 - scrollProgress) * 30,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Swiper
            effect={"flip"}
            grabCursor={true}
            pagination={true}
            navigation={true}
            keyboard={{
              enabled: true,
            }}
            modules={[EffectFlip, Keyboard, Pagination, Navigation]}
            className="desktop-testimonial-swiper max-w-2xl"
          >
            {testimonies.map((testimony, index) => (
              <SwiperSlide key={`desktop-${index}`}>
                <TestimonialCard testimony={testimony} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden px-4">
        <motion.div
          animate={{
            opacity: Math.min(1, scrollProgress * 1.3),
            scale: 0.95 + scrollProgress * 0.05,
            y: (1 - scrollProgress) * 30,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            spaceBetween={10}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mobile-testimonial-swiper"
          >
            {testimonies.map((testimony, index) => (
              <SwiperSlide key={`mobile-${index}`}>
                <TestimonialCard testimony={testimony} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </>
  );
};

const TestimoniesSection: React.FC<TestimoniesProps> = ({
  testimoninesData,
}) => {
  const testimonies = testimoninesData;

  // Use the scroll tracking hook
  const { elementRef, scrollProgress, isVisible } = useScrollTracking();

  // Don't render if no testimonies available
  if (!testimonies || testimonies.length === 0) {
    return null;
  }

  return (
    <div ref={elementRef} className="relative py-36 overflow-hidden">
      {/* Background with scroll-based fade */}
      <motion.div
        animate={{
          opacity: Math.min(1, scrollProgress * 1.2),
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <WireframeSixBackground/>
        <WireframeSixGreenShapesBackground />
      </motion.div>

      <div className="relative z-10">
        {/* Header with scroll-based animation */}
        <motion.div
          className="mb-8 text-center"
          animate={{
            opacity: Math.min(1, scrollProgress * 1.4),
            y: (1 - scrollProgress) * 40,
            scale: 0.95 + scrollProgress * 0.05,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h3 className="text-[#FFFFFF99] text-lg capitalize mb-2">
            testimonies
          </h3>
          <h2 className="text-white text-3xl md:text-4xl font-bold capitalize">
            the proof is in the pixels
          </h2>
        </motion.div>

        {/* Swiper with scroll-based animation */}
        <div className="px-4 md:px-8">
          <TestimoniesSwiper
            testimonies={testimonies}
            scrollProgress={scrollProgress}
          />
        </div>
      </div>

      {/* Optional: Add a subtle glow effect that appears with scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: scrollProgress > 0.3 ? scrollProgress * 0.2 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: `
            radial-gradient(circle at 50% 50%, 
              rgba(34, 197, 94, ${scrollProgress * 0.1}) 0%,
              rgba(6, 182, 212, ${scrollProgress * 0.05}) 40%,
              transparent 70%
            )
          `,
        }}
      />
    </div>
  );
};

export default TestimoniesSection;
