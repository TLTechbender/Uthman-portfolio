import React from "react";
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
import '../assets/styles/swiperStyles.css';
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

const TestimonialCard: React.FC<{ testimony: Testimonial }> = ({
  testimony,
}) => {
  const clampedRating = Math.max(1, Math.min(5, testimony.rating));

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isGold = starNumber <= clampedRating;

      return (
        <FaStar
          key={index}
          className={`text-lg ${isGold ? "text-yellow-400" : "text-gray-400"}`}
        />
      );
    });
  };

  // Get avatar URL, fallback to a default avatar if not provided
  const avatarUrl = testimony.avatar?.asset?.url;
  const avatarAlt = testimony.avatar?.alt || `${testimony.name} avatar`;

  return (
    <div className="max-w-lg mx-auto bg-gray-900/90 backdrop-blur-sm text-white p-5 rounded-lg border border-gray-700 shadow-2xl">
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
    </div>
  );
};

const TestimoniesSwiper: React.FC<{ testimonies: Testimonial[] }> = ({
  testimonies,
}) => {
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block relative">
        <Swiper
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          navigation={true}
          keyboard={{
            enabled: true,
          }}
          modules={[EffectFlip,Keyboard, Pagination, Navigation]}
          className="desktop-testimonial-swiper max-w-2xl"
        >
          {testimonies.map((testimony, index) => (
            <SwiperSlide key={`desktop-${index}`}>
              <TestimonialCard testimony={testimony} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden px-4">
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
              <TestimonialCard testimony={testimony} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

const TestimoniesSection: React.FC<TestimoniesProps> = ({
  testimoninesData,
}) => {
  const testimonies = testimoninesData;

  // Don't render if no testimonies available
  if (!testimonies || testimonies.length === 0) {
    return null;
  }

  return (
    <div className="relative py-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <WireframeSixBackground />
        <WireframeSixGreenShapesBackground />
      </motion.div>

      <div className="relative z-10">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-[#FFFFFF99] text-lg capitalize mb-2">
            testimonies
          </h3>
          <h2 className="text-white text-3xl md:text-4xl font-bold capitalize">
            the proof is in the pixels
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="px-4 md:px-8" // Minimal padding - arrows close to cards
        >
          <TestimoniesSwiper testimonies={testimonies} />
        </motion.div>
      </div>
    </div>
  );
};

export default TestimoniesSection;
