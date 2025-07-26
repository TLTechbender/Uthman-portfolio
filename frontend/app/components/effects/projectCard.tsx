import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";

import iphoneMockup from "../../assets/images/iphone.jpg";

const ProjectCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollGlow, setScrollGlow] = useState({ x: 50, y: 50 });
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  const [rippleEffect, setRippleEffect] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const cardRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const currentGlow = isMobile ? scrollGlow : mousePos;

    // Calculate dynamic colors based on position
    const intensity = isHovered || isMobile ? 0.4 : 0.15;
    const primaryColor = `rgba(34, 197, 94, ${intensity})`; // emerald
    const secondaryColor = `rgba(59, 130, 246, ${intensity * 0.8})`; // blue
    const accentColor = `rgba(147, 51, 234, ${intensity * 0.6})`; // purple

    // Update gradient stops dynamically
    const gradients = svgRef.current.querySelectorAll("linearGradient stop");
    gradients.forEach((stop, index) => {
      if (index % 2 === 0) {
        stop.setAttribute("stop-color", primaryColor);
      } else {
        stop.setAttribute("stop-color", secondaryColor);
      }
    });

    // Update gradient positions based on mouse/scroll
    const gradient1 = svgRef.current.querySelector("#paint0_linear_1_494");
    const gradient2 = svgRef.current.querySelector("#paint1_linear_1_494");

    if (gradient1) {
      gradient1.setAttribute("x1", `${1118.47 + (currentGlow.x - 50) * 2}`);
      gradient1.setAttribute("y1", `${276.726 + (currentGlow.y - 50) * 1.5}`);
    }

    if (gradient2) {
      gradient2.setAttribute("x1", `${489.826 + (currentGlow.x - 50) * 1.5}`);
      gradient2.setAttribute("y1", `${(currentGlow.y - 50) * 1}`);
    }
  }, [mousePos, scrollGlow, isHovered]);

  // Handle mouse movement - scoped to card area only
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const isInsideCard =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInsideCard) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = ((e.clientY - centerY) / rect.height) * -15;
        const rotateY = ((e.clientX - centerX) / rect.width) * 15;

        requestAnimationFrame(() => {
          setMousePos({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
          });
          setCardRotation({
            x: Math.max(-15, Math.min(15, rotateX)),
            y: Math.max(-15, Math.min(15, rotateY)),
          });
        });

        setShowCustomCursor(true);

        if (cursorRef.current) {
          requestAnimationFrame(() => {
            if (cursorRef.current) {
              cursorRef.current.style.left = e.clientX + "px";
              cursorRef.current.style.top = e.clientY + "px";
            }
          });
        }
      } else {
        setShowCustomCursor(false);
        requestAnimationFrame(() => {
          setCardRotation({ x: 0, y: 0 });
        });
      }
    };

    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const cardCenter = rect.top + rect.height / 2;
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - cardCenter + windowHeight / 2) / windowHeight
        )
      );

      const x = 30 + scrollProgress * 40;
      const y = 20 + (Math.sin(scrollProgress * Math.PI * 2) * 30 + 30);

      requestAnimationFrame(() => {
        setScrollGlow({ x, y });
      });
    };

    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newRipple = {
      id: Date.now(),
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };

    setRippleEffect((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRippleEffect((prev) =>
        prev.filter((ripple) => ripple.id !== newRipple.id)
      );
    }, 600);
  };

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;
  const currentGlow = isMobile ? scrollGlow : mousePos;

  return (
    <>
      {/* Custom Cursor */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className={`
            fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference
            transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2
            ${showCustomCursor && isHovered ? "scale-150 opacity-100" : "scale-100 opacity-0"}
          `}
          style={{
            background: showCustomCursor
              ? "radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, rgba(59, 130, 246, 0.6) 50%, transparent 70%)"
              : "transparent",
            borderRadius: "50%",
            filter: "blur(1px)",
            boxShadow:
              showCustomCursor && isHovered
                ? "0 0 20px rgba(34, 197, 94, 0.6)"
                : "0 0 10px rgba(59, 130, 246, 0.4)",
          }}
        />
      )}

      <div className="flex items-center justify-center p-6 overflow-hidden">
        <div
          ref={cardRef}
          className={`
            relative rounded-3xl p-8 max-w-4xl w-full shadow-2xl overflow-hidden
            transition-all duration-700 ease-out transform
            ${isHovered ? "scale-105" : "scale-100"}
          `}
          style={{
            cursor: !isMobile && showCustomCursor ? "none" : "default",
            transform: `
              scale(${isHovered ? 1.05 : 1})
              perspective(1000px)
              rotateX(${cardRotation.x}deg)
              rotateY(${cardRotation.y}deg)
            `,
            transformStyle: "preserve-3d",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setShowCustomCursor(false);
          }}
          onClick={handleCardClick}
        >
          {/* Dynamic SVG Background */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 854 361"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: `
                scale(${isHovered ? 1.02 : 1}) 
                translate(${(currentGlow.x - 50) * 0.1}px, ${(currentGlow.y - 50) * 0.1}px)
              `,
              transition: "transform 500ms ease-out",
            }}
          >
            <g clipPath="url(#clip0_1_494)">
              <rect width="854" height="361" rx="24" fill="#04070D" />

              {/* First rotating rectangle - enhanced with dynamic rotation */}
              <rect
                x="745.103"
                y="276.726"
                width="373.369"
                height="373.369"
                rx="22"
                fill="url(#paint0_linear_1_494)"
                fillOpacity={isHovered || isMobile ? "0.25" : "0.15"}
                style={{
                  transform: `rotate(${-144.536 + (isHovered ? (currentGlow.x - 50) * 0.2 : 0)}deg)`,
                  transformOrigin: "931.787px 463.411px",
                  transition:
                    "transform 1000ms ease-out, fill-opacity 500ms ease-out",
                }}
              />

              {/* Second rotating rectangle - enhanced with counter-rotation */}
              <rect
                width="489.826"
                height="489.826"
                rx="22"
                fill="url(#paint1_linear_1_494)"
                fillOpacity={isHovered || isMobile ? "0.25" : "0.15"}
                style={{
                  transform: `
                    matrix(0.578373, -0.815773, -0.815773, -0.578373, 219.587, 702.889)
                    rotate(${isHovered ? -(currentGlow.y - 50) * 0.15 : 0}deg)
                  `,
                  transition:
                    "transform 1200ms ease-out, fill-opacity 500ms ease-out",
                }}
              />
            </g>

            <rect
              x="0.5"
              y="0.5"
              width="853"
              height="360"
              rx="23.5"
              stroke="#1C1C21"
              strokeOpacity={isHovered || isMobile ? "0.8" : "0.5"}
              style={{
                transition: "stroke-opacity 500ms ease-out",
              }}
            />

            <defs>
              <linearGradient
                id="paint0_linear_1_494"
                x1="1118.47"
                y1="276.726"
                x2="931.787"
                y2="650.094"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="rgba(34, 197, 94, 0.15)" />
                <stop
                  offset="1"
                  stopColor="rgba(59, 130, 246, 0.1)"
                  stopOpacity="0"
                />
              </linearGradient>

              <linearGradient
                id="paint1_linear_1_494"
                x1="489.826"
                y1="-1.4598e-05"
                x2="244.913"
                y2="489.826"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="rgba(147, 51, 234, 0.15)" />
                <stop
                  offset="1"
                  stopColor="rgba(34, 197, 94, 0.1)"
                  stopOpacity="0"
                />
              </linearGradient>

              <clipPath id="clip0_1_494">
                <rect width="854" height="361" rx="24" fill="white" />
              </clipPath>
            </defs>
          </svg>

          {/* Enhanced Dynamic Glow Overlay */}
          <div
            className={`
              absolute inset-0 opacity-0 transition-all duration-500 ease-out pointer-events-none
              ${isHovered || isMobile ? "opacity-100" : "opacity-0"}
            `}
            style={{
              background: `
                radial-gradient(circle 400px at ${currentGlow.x}% ${currentGlow.y}%, 
                  rgba(34, 197, 94, 0.08) 0%, 
                  rgba(59, 130, 246, 0.06) 25%, 
                  rgba(147, 51, 234, 0.04) 50%, 
                  transparent 70%),
                radial-gradient(circle 200px at ${currentGlow.x * 0.8}% ${currentGlow.y * 1.2}%, 
                  rgba(255, 255, 255, 0.02) 0%, 
                  transparent 50%)
              `,
              borderRadius: "24px",
              mixBlendMode: "overlay",
            }}
          />

          {/* Click Ripple Effects */}
          {rippleEffect.map((ripple) => (
            <div
              key={ripple.id}
              className="absolute rounded-full animate-ping pointer-events-none z-20"
              style={{
                left: `${ripple.x}%`,
                top: `${ripple.y}%`,
                width: "20px",
                height: "20px",
                background:
                  "radial-gradient(circle, rgba(34, 197, 94, 0.6) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 70%)",
                transform: "translate(-50%, -50%)",
                animationDuration: "600ms",
                animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
              }}
            />
          ))}

          {/* Content Layer */}
          <div className="relative  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div
                className={`
                transition-all duration-700 ease-out transform
                ${isHovered ? "translate-x-2 translate-z-4" : "translate-x-0"}
              `}
                style={{
                  transform: isHovered
                    ? "translateX(8px) translateZ(20px)"
                    : "translateX(0px) translateZ(0px)",
                }}
              >
                <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                  Sporta AI
                </h1>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  A platform that helps athletes and coaches track performance,
                  get smart insights, and improve faster through AI-powered
                  analytics.
                </p>
              </div>

              <button
                className={`
                  inline-flex items-center gap-3 group
                  relative overflow-hidden
                  bg-[#0FB492] hover:bg-teal-500
                  text-black hover:text-white cursor-pointer text-sm font-semibold
                  px-6 py-3 rounded-xl
                  shadow-lg hover:shadow-teal-500/25
                  transition-all duration-300 ease-out
                  transform hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-teal-500
                  ${isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-90"}
                `}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{
                    background: `radial-gradient(circle 100px at ${currentGlow.x}% ${currentGlow.y}%, 
                      rgba(34, 197, 94, 0.3) 0%, 
                      transparent 70%)`,
                  }}
                />
                <span className="relative ">View case study</span>
                {/* FIXED ARROW - Now uses group-hover instead of hover */}
                <FaArrowRight
                  className="
                    w-4 h-4 relative 
                    transition-transform duration-300 ease-out
                    -rotate-45 group-hover:rotate-0 group-hover:translate-x-1
                  "
                />
              </button>
            </div>

            {/* Right Phone Mockup - IMPROVED OVERFLOW HANDLING */}
            <div className="flex justify-center lg:justify-end">
              <div
                className={`
                  relative transform transition-all duration-700 ease-out
                  ${isHovered ? "rotate-3 scale-105" : "rotate-0 scale-100"}
                `}
                style={{
                  transform: `
                    ${isHovered ? "rotate(3deg) scale(1.05)" : "rotate(0deg) scale(1)"}
                    translateZ(${isHovered ? "30px" : "0px"})
                  `,
                }}
              >
                {/* IMPROVED IMAGE CONTAINER - Better overflow control */}
                <div className="relative w-64 h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={iphoneMockup}
                    alt="iPhone mockup showing Sporta AI app"
                    className="w-full h-full object-cover object-center"
                    style={{
                      objectPosition: "center",
                      minHeight: "100%",
                      minWidth: "100%",
                    }}
                  />
                </div>

                {/* Dynamic Glow */}
                <div
                  className={`
                    absolute inset-0 rounded-3xl transition-all duration-700 ease-out 
                    ${isHovered || isMobile ? "opacity-40" : "opacity-0"}
                  `}
                  style={{
                    background: `radial-gradient(circle 200px at ${currentGlow.x}% ${currentGlow.y}%, 
                      rgba(34, 197, 94, 0.4) 0%, 
                      rgba(59, 130, 246, 0.3) 50%, 
                      transparent 70%)`,
                    filter: "blur(20px)",
                    transform: `
                      ${isHovered || isMobile ? "scale(1.2)" : "scale(1)"}
                      translateZ(${isHovered ? "-10px" : "0px"})
                    `,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Floating Particles */}
          {(isHovered || isMobile) && (
            <>
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full transition-all duration-1000 pointer-events-none z-20"
                  style={{
                    width: `${2 + (i % 3)}px`,
                    height: `${2 + (i % 3)}px`,
                    left: `${15 + i * 7 + (currentGlow.x - 50) * 0.1}%`,
                    top: `${25 + (i % 4) * 15 + (currentGlow.y - 50) * 0.05}%`,
                    background: `rgba(${
                      i % 3 === 0
                        ? "34, 197, 94"
                        : i % 3 === 1
                          ? "59, 130, 246"
                          : "147, 51, 234"
                    }, 0.8)`,
                    boxShadow: `0 0 ${4 + i}px rgba(${
                      i % 3 === 0
                        ? "34, 197, 94"
                        : i % 3 === 1
                          ? "59, 130, 246"
                          : "147, 51, 234"
                    }, 0.6)`,
                    animationDelay: `${i * 150}ms`,
                    transform:
                      isHovered || isMobile
                        ? `translateY(-${10 + i * 2}px) translateX(${(currentGlow.x - 50) * 0.2}px) scale(${1 + (i % 2) * 0.2})`
                        : "translateY(0px) translateX(0px) scale(1)",
                    opacity: isHovered || isMobile ? 0.8 : 0,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
