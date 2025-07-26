import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Mousewheel, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import WireframeSixBackground from "./effects/wireframeSixBackground";
import WireframeSixGreenShapesBackground from "./effects/wireframeSixGreenShapesBackground";

interface Testimony {
  name: string;
  position: string;
  testimony: string;
  avatar: string;
  rating: number;
}

const Testimonial: React.FC<{ testimony: Testimony }> = ({ testimony }) => {
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

  return (
    // Reduced max-width and padding for more compact cards
    <div className="max-w-lg mx-auto bg-gray-900/90 backdrop-blur-sm text-white p-5 rounded-lg border border-gray-700 shadow-2xl">
      {/* Smaller avatar and tighter layout */}
      <div className="flex items-center mb-4">
        <img
          src={testimony.avatar}
          alt={`${testimony.name} avatar`}
          className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-gray-600"
          loading="lazy"
        />
        <div>
          <h3 className="text-lg font-semibold text-white">{testimony.name}</h3>
          <p className="text-gray-300 text-xs">{testimony.position}</p>
        </div>
      </div>

      {/* More compact testimonial text */}
      <blockquote className="text-sm italic text-gray-100 mb-4 leading-relaxed line-clamp-4">
        "{testimony.testimony}"
      </blockquote>

      {/* Smaller stars, left-aligned for better space usage */}
      <div
        className="flex gap-1"
        aria-label={`Rating: ${clampedRating} out of 5 stars`}
      >
        {renderStars()}
      </div>
    </div>
  );
};

const TestimoniesSwiper: React.FC<{ testimonies: Testimony[] }> = ({
  testimonies,
}) => {
  return (
    <>
      {/* Desktop Version - Much more compact */}
      <div className="hidden md:block">
        <Swiper
          direction="vertical"
          slidesPerView={1}
          spaceBetween={20}
          mousewheel={{
            releaseOnEdges: true, //Releases scroll at first/last slide
            sensitivity: 0.05,
            thresholdDelta: 50,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination]}
          className="h-[350px] w-full"
          //A nigga be having troube with swiper bro, didn't wanna use it but I have no choice man
          style={
            {
              "--swiper-pagination-color": "#fbbf24",
              "--swiper-pagination-bullet-inactive-color": "#6b7280",
            } as React.CSSProperties
          }
        >
          {testimonies.map((testimony, index) => (
            <SwiperSlide key={`desktop-${index}`}>
              <Testimonial testimony={testimony} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Version - More reasonable height */}
      <div className="md:hidden">
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards]}
          className="w-full max-w-xs mx-auto h-[320px]"
          cardsEffect={{
            rotate: true,
            perSlideRotate: 4,
            perSlideOffset: 6,
            slideShadows: false,
          }}
        >
          {testimonies.map((testimony, index) => (
            <SwiperSlide key={`mobile-${index}`} className="bg-transparent">
              <Testimonial testimony={testimony} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

const TestimoniesSection: React.FC = () => {
  const testimonies: Testimony[] = [
    {
      name: "Sarah Chen",
      position: "CEO, TechFlow Solutions",
      testimony:
        "Working with this team transformed our entire digital presence. The attention to detail and technical expertise exceeded all expectations. Our conversion rates increased by 340% within the first month.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      position: "Freelance E-commerce Client",
      testimony:
        "I've worked with dozens of developers, but none delivered like this. The custom shopping platform they built handles thousands of transactions daily without a hitch. Pure excellence.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Emily Watson",
      position: "CTO, FinanceCore",
      testimony:
        "The scalability and security of their solutions are remarkable. We processed over $2M in transactions last quarter with zero downtime. Their code quality is industry-leading.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "David Kim",
      position: "Startup Founder",
      testimony:
        "From MVP to Series A, they've been our technical backbone. The mobile app they developed has 4.9 stars on both app stores. Couldn't have asked for better partners.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Lisa Thompson",
      position: "Marketing Director, BrandCorp",
      testimony:
        "Their web platform increased our lead generation by 280%. The user experience is seamless, and the analytics dashboard gives us insights we never had before. Game-changing work.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Ahmed Hassan",
      position: "Restaurant Chain Owner",
      testimony:
        "The ordering system they built revolutionized our business. We went from struggling during COVID to thriving with online orders. Revenue up 450% and growing every month.",
      avatar:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Jennifer Park",
      position: "Product Manager, HealthTech Inc",
      testimony:
        "The patient portal they developed has transformed how we deliver healthcare. 95% user satisfaction rate and it's reduced our administrative workload by 60%. Outstanding results.",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      rating: 4,
    },
    {
      name: "Robert Sterling",
      position: "Real Estate Mogul",
      testimony:
        "Their property management platform manages my entire portfolio of 200+ properties. The automation features save me 20 hours per week. ROI was immediate and substantial.",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Maria Gonzalez",
      position: "Non-Profit Director",
      testimony:
        "Even with our limited budget, they delivered a world-class donation platform. We've raised 3x more funds this year thanks to their intuitive design and seamless payment integration.",
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Tony Mitchell",
      position: "SaaS Entrepreneur",
      testimony:
        "They took my idea from concept to a $50K MRR SaaS platform in just 4 months. The architecture is solid, scalable, and the user feedback has been incredible. True professionals.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
    },
  ];

  return (
    <div className="relative py-12 overflow-hidden">
      {" "}
      {/* Reduced vertical padding */}
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
          className="mb-8 text-center" // Reduced bottom margin
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-[#FFFFFF99] text-lg capitalize mb-2">
            {" "}
            testimonies
          </h3>
          <h2 className="text-white text-3xl md:text-4xl font-bold capitalize">
            {" "}
            the proof is in the pixels
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TestimoniesSwiper testimonies={testimonies} />
        </motion.div>
      </div>
    </div>
  );
};

export default TestimoniesSection;
