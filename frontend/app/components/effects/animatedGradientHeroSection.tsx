import React, { useEffect, useRef, useState, useCallback, memo } from "react";

const AnimatedGradientsHeroSection = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);

  const baseTeal = "#00D5BE";
  const baseIndigo = "#615FFF";

  // Memoize the resize handler
  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
  }, []);

  // Throttle to 30fps instead of 60fps for better performance cos it was hanging like mahd
  const FRAME_RATE = 33; // ~30fps

  const updateStyles = useCallback(
    (
      leftIndigo: number,
      leftTeal: number,
      rightIndigo: number,
      rightTeal: number,
      cursorX: number = 0,
      cursorY: number = 0,
      scale: number = 1,
      mobileIndigo: number = 0,
      mobileTeal: number = 0,
      mobileScale: number = 1,
      mobileRotate: number = 0
    ) => {
      if (!svgRef.current) return;

      const svg = svgRef.current;
      svg.style.setProperty("--left-indigo", leftIndigo.toString());
      svg.style.setProperty("--left-teal", leftTeal.toString());
      svg.style.setProperty("--right-indigo", rightIndigo.toString());
      svg.style.setProperty("--right-teal", rightTeal.toString());

      if (!isMobile) {
        svg.style.setProperty("--cursor-x", `${cursorX}px`);
        svg.style.setProperty("--cursor-y", `${cursorY}px`);
        svg.style.setProperty("--scale", scale.toString());
      } else {
        svg.style.setProperty("--mobile-indigo", mobileIndigo.toString());
        svg.style.setProperty("--mobile-teal", mobileTeal.toString());
        svg.style.setProperty("--mobile-scale", mobileScale.toString());
        svg.style.setProperty("--mobile-rotate", `${mobileRotate}deg`);
      }
    },
    [isMobile]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile || !containerRef.current) return;

      const now = performance.now();
      if (now - lastUpdateRef.current < FRAME_RATE) return;

      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) {
          rafRef.current = 0;
          return;
        }

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Simplified calculations
        const leftProximity = Math.max(0, 1 - x * 1.5);
        const rightProximity = Math.max(0, (x - 0.3) * 1.4);

        const leftIntensity = 0.4 + leftProximity * 0.4;
        const rightIntensity = 0.4 + rightProximity * 0.4;

        const cursorX = (x - 0.5) * 20 * 0.1;
        const cursorY = (y - 0.5) * 15 * 0.1;

        const leftIndigoStrength = leftProximity * 0.8 + 0.2;
        const leftTealStrength = 1 - leftIndigoStrength;
        const rightTealStrength = rightProximity * 0.8 + 0.2;
        const rightIndigoStrength = 1 - rightTealStrength;

        updateStyles(
          leftIntensity * leftIndigoStrength * 0.8,
          leftIntensity * leftTealStrength * 0.8,
          rightIntensity * rightIndigoStrength * 0.8,
          rightIntensity * rightTealStrength * 0.8,
          cursorX,
          cursorY,
          1 + (leftIntensity + rightIntensity) * 0.02
        );

        lastUpdateRef.current = now;
        rafRef.current = 0;
      });
    },
    [isMobile, updateStyles]
  );

  const handleScroll = useCallback(() => {
    if (!isMobile) return;

    const now = performance.now();
    if (now - lastUpdateRef.current < FRAME_RATE) return;

    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      const tealWave = Math.sin(scrollProgress * Math.PI * 4) * 0.5 + 0.5;
      const indigoWave = 1 - tealWave;
      const intensity = Math.sin(scrollProgress * Math.PI * 2) * 0.3 + 0.7;

      updateStyles(
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        intensity * indigoWave * 0.7,
        intensity * tealWave * 0.7,
        0.8 + intensity * 0.3,
        scrollProgress * 2
      );

      lastUpdateRef.current = now;
      rafRef.current = 0;
    });
  }, [isMobile, updateStyles]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, handleScroll]);

  // Memoized SVG paths to prevent re-creation
  const leftShape1Path =
    "M-85.3438 537.704L128.571 486.317L217.939 421.654L191.376 251.141L15.9534 231.575L17.5614 109.832L-184.707 55.5762L-315 86.8756L-232.563 352.981L-105.29 386.171L-85.3438 537.704Z";
  const leftShape2Path =
    "M-34.8667 -59.3328L-51.3809 160.046L-17.1559 264.911L153.308 291.783L225.599 130.755L341.014 169.528L454.544 -6.44638L464.603 -140.068L186.036 -142.987L115.503 -31.9682L-34.8667 -59.3328Z";
  const rightShape1Path =
    "M1546.95 664.704L1333.03 613.317L1243.66 548.654L1270.23 378.141L1445.65 358.575L1444.04 236.832L1646.31 182.576L1776.6 213.876L1694.17 479.981L1566.89 513.171L1546.95 664.704Z";
  const rightShape2Path =
    "M1496.47 67.6672L1512.98 287.046L1478.76 391.911L1308.29 418.783L1236 257.755L1120.59 296.528L1007.06 120.554L997 -13.0683L1275.57 -15.987L1346.1 95.0318L1496.47 67.6672Z";

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      ref={containerRef}
    >
      <svg
        ref={svgRef}
        width="1440"
        height="935"
        viewBox="0 0 1440 935"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={
          {
            transformOrigin: "center",
            transform: isMobile
              ? "scale(var(--mobile-scale, 1)) rotate(var(--mobile-rotate, 0deg))"
              : "translate(var(--cursor-x, 0px), var(--cursor-y, 0px)) scale(var(--scale, 1))",
            willChange: "transform",
            "--left-indigo": "0.6",
            "--left-teal": "0.6",
            "--right-indigo": "0.6",
            "--right-teal": "0.6",
            "--mobile-indigo": "0",
            "--mobile-teal": "0",
            "--cursor-x": "0px",
            "--cursor-y": "0px",
            "--scale": "1",
            "--mobile-scale": "1",
            "--mobile-rotate": "0deg",
          } as React.CSSProperties
        }
      >
        <defs>
          <filter
            id="f1"
            x="-715"
            y="-344.424"
            width="1332.94"
            height="1282.13"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="150"
              result="effect1_foregroundBlur"
            />
          </filter>
          <filter
            id="f2"
            x="-451.381"
            y="-542.987"
            width="1315.98"
            height="1234.77"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="150"
              result="effect1_foregroundBlur"
            />
          </filter>
          <filter
            id="f3"
            x="843.664"
            y="-217.424"
            width="1332.94"
            height="1282.13"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="150"
              result="effect1_foregroundBlur"
            />
          </filter>
          <filter
            id="f4"
            x="597"
            y="-415.987"
            width="1315.98"
            height="1234.77"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="150"
              result="effect1_foregroundBlur"
            />
          </filter>
        </defs>

        <g filter="url(#f1)">
          <path
            d={leftShape1Path}
            fill={baseIndigo}
            style={{
              opacity: isMobile ? 0 : "var(--left-indigo, 0.6)",
              willChange: "opacity",
            }}
          />
        </g>
        <g filter="url(#f2)">
          <path
            d={leftShape2Path}
            fill={baseTeal}
            style={{
              opacity: isMobile ? 0 : "var(--left-teal, 0.6)",
              willChange: "opacity",
            }}
          />
        </g>
        <g filter="url(#f3)">
          <path
            d={rightShape1Path}
            fill={baseIndigo}
            style={{
              opacity: isMobile
                ? "var(--mobile-indigo, 0.6)"
                : "var(--right-indigo, 0.6)",
              willChange: "opacity",
            }}
          />
        </g>
        <g filter="url(#f4)">
          <path
            d={rightShape2Path}
            fill={baseTeal}
            style={{
              opacity: isMobile
                ? "var(--mobile-teal, 0.6)"
                : "var(--right-teal, 0.6)",
              willChange: "opacity",
            }}
          />
        </g>
      </svg>
    </div>
  );
});



export default AnimatedGradientsHeroSection;