import { div } from "framer-motion/client";
import React, { useEffect, useRef } from "react";

const AnimatedGradientsHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftSvgRef = useRef<SVGSVGElement>(null);
  const rightSvgRef = useRef<SVGSVGElement>(null);
  const leftShape1Ref = useRef<SVGPathElement>(null);
  const leftShape2Ref = useRef<SVGPathElement>(null);
  const rightShape1Ref = useRef<SVGPathElement>(null);
  const rightShape2Ref = useRef<SVGPathElement>(null);
  const isMobileRef = useRef(false);

  const baseTeal = "#00D5BE";
  const baseIndigo = "#615FFF";

  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
      if (leftSvgRef.current && rightSvgRef.current) {
        if (isMobileRef.current) {
          leftSvgRef.current.style.display = "none";
          rightSvgRef.current.style.left = "50%";
          rightSvgRef.current.style.top = "-200px"; // Keep it at the top
          rightSvgRef.current.style.transform = "translateX(-50%)";
        } else {
          leftSvgRef.current.style.display = "block";
          rightSvgRef.current.style.left = "auto";
          rightSvgRef.current.style.top = "-200px"; // Keep it at the top
          rightSvgRef.current.style.right = "-300px";
          rightSvgRef.current.style.transform = "none";
        }
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Initialize shapes with visible opacity
    if (leftShape1Ref.current && leftShape2Ref.current) {
      leftShape1Ref.current.style.opacity = "0.3";
      leftShape2Ref.current.style.opacity = "0.3";
    }
    if (rightShape1Ref.current && rightShape2Ref.current) {
      rightShape1Ref.current.style.opacity = "0.3";
      rightShape2Ref.current.style.opacity = "0.3";
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileRef.current || !containerRef.current) return;
      if (
        !leftShape1Ref.current ||
        !leftShape2Ref.current ||
        !rightShape1Ref.current ||
        !rightShape2Ref.current
      )
        return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Left side gets stronger when cursor is on left, right side when cursor is on right
      const leftProximity = Math.max(0, 1 - x * 1.5); // More sensitive
      const rightProximity = Math.max(0, (x - 0.3) * 1.4); // More sensitive

      const leftIntensity = 0.15 + leftProximity * 0.4;
      const rightIntensity = 0.15 + rightProximity * 0.4;

      // Cursor following effect
      const cursorX = (x - 0.5) * 80;
      const cursorY = (y - 0.5) * 50;

      // Left SVG - when active (cursor on left), both shapes lean towards indigo
      const leftIndigoStrength = leftProximity * 0.8 + 0.2;
      const leftTealStrength = 1 - leftIndigoStrength;

      leftShape1Ref.current.style.fill = baseIndigo;
      leftShape1Ref.current.style.opacity = (
        leftIntensity * leftIndigoStrength
      ).toString();

      leftShape2Ref.current.style.fill = baseTeal;
      leftShape2Ref.current.style.opacity = (
        leftIntensity * leftTealStrength
      ).toString();

      leftSvgRef.current!.style.transform = `scale(${0.9 + leftIntensity * 0.3}) translate(${cursorX * 0.3}px, ${cursorY * 0.2}px)`;

      // Right SVG - when active (cursor on right), both shapes lean towards teal
      const rightTealStrength = rightProximity * 0.8 + 0.2;
      const rightIndigoStrength = 1 - rightTealStrength;

      rightShape1Ref.current.style.fill = baseIndigo;
      rightShape1Ref.current.style.opacity = (
        rightIntensity * rightIndigoStrength
      ).toString();

      rightShape2Ref.current.style.fill = baseTeal;
      rightShape2Ref.current.style.opacity = (
        rightIntensity * rightTealStrength
      ).toString();

      rightSvgRef.current!.style.transform = `scale(${0.9 + rightIntensity * 0.3}) translate(${-cursorX * 0.2}px, ${-cursorY * 0.2}px)`;
    };

    const handleScroll = () => {
      if (!isMobileRef.current) return;
      if (!rightShape1Ref.current || !rightShape2Ref.current) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      // Alternating between teal and indigo dominance based on scroll
      const tealWave = Math.sin(scrollProgress * Math.PI * 4) * 0.5 + 0.5;
      const indigoWave = 1 - tealWave;

      const intensity = Math.sin(scrollProgress * Math.PI * 2) * 0.3 + 0.6;

      rightShape1Ref.current.style.opacity = (
        intensity *
        indigoWave *
        0.6
      ).toString();
      rightShape2Ref.current.style.opacity = (
        intensity *
        tealWave *
        0.6
      ).toString();

      rightSvgRef.current!.style.transform = `scale(${0.8 + intensity * 0.4}) rotate(${scrollProgress * 2}deg) translateX(-50%)`;
    };

    let ticking = false;

    const throttledMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener("mousemove", throttledMouseMove);
    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => {
      document.removeEventListener("mousemove", throttledMouseMove);
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  return (
    <div className="absolute w-full h-full">
      <div
        className=" w-full relative overflow-hidden "
        ref={containerRef}
      >
        {/* Left SVG - Desktop only */}
        <svg
          ref={leftSvgRef}
          width="800"
          height="800"
          viewBox="0 0 865 935"
          className="absolute pointer-events-none"
          style={{
            left: "-200px",
            top: "-150px",
            transformOrigin: "center",
            transition: "all 0.4s ease-out",
          }}
        >
          <g opacity={0.6} filter="url(#filter0_f_66_323)">
            <path
              ref={leftShape1Ref}
              d="M-85.3438 537.704L128.571 486.317L217.939 421.654L191.376 251.141L15.9534 231.575L17.5614 109.832L-184.707 55.5762L-315 86.8756L-232.563 352.981L-105.29 386.171L-85.3438 537.704Z"
              fill="#615FFF"
            />
          </g>
          <g opacity={0.6} filter="url(#filter1_f_66_323)">
            <path
              ref={leftShape2Ref}
              d="M-34.8667 -59.3328L-51.3809 160.046L-17.1559 264.911L153.308 291.783L225.599 130.755L341.014 169.528L454.544 -6.44638L464.603 -140.068L186.036 -142.987L115.503 -31.9682L-34.8667 -59.3328Z"
              fill="#00D5BE"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_66_323"
              x={-715}
              y={-344.424}
              width={1332.94}
              height={1282.13}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation={200}
                result="effect1_foregroundBlur_66_323"
              />
            </filter>
            <filter
              id="filter1_f_66_323"
              x={-451.381}
              y={-542.987}
              width={1315.98}
              height={1234.77}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation={200}
                result="effect1_foregroundBlur_66_323"
              />
            </filter>
          </defs>
        </svg>

        {/* Right SVG - Both desktop and mobile */}
        <svg
          ref={rightSvgRef}
          width="800"
          height="800"
          viewBox="0 0 865 935"
          className="absolute pointer-events-none"
          style={{
            right: "-300px",
            top: "-200px",
            transformOrigin: "center",
            transition: "all 0.4s ease-out",
          }}
        >
          <g opacity={0.4} filter="url(#filter0_f_66_324)">
            <path
              ref={rightShape1Ref}
              d="M-85.3438 537.704L128.571 486.317L217.939 421.654L191.376 251.141L15.9534 231.575L17.5614 109.832L-184.707 55.5762L-315 86.8756L-232.563 352.981L-105.29 386.171L-85.3438 537.704Z"
              fill="#615FFF"
            />
          </g>
          <g opacity={0.4} filter="url(#filter1_f_66_324)">
            <path
              ref={rightShape2Ref}
              d="M-34.8667 -59.3328L-51.3809 160.046L-17.1559 264.911L153.308 291.783L225.599 130.755L341.014 169.528L454.544 -6.44638L464.603 -140.068L186.036 -142.987L115.503 -31.9682L-34.8667 -59.3328Z"
              fill="#00D5BE"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_66_324"
              x={-715}
              y={-344.424}
              width={1332.94}
              height={1282.13}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation={200}
                result="effect1_foregroundBlur_66_324"
              />
            </filter>
            <filter
              id="filter1_f_66_324"
              x={-451.381}
              y={-542.987}
              width={1315.98}
              height={1234.77}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation={200}
                result="effect1_foregroundBlur_66_324"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedGradientsHeroSection;
