import React, { useEffect, useRef, useState, useCallback, memo } from "react";

const AnimatedGradientExperiencesSection:React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);
  const particleAnimationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);



  // Confetti colors for particles
  const particleColors = [
    "#FF6633", // Orange
    "#FFCC33", // Yellow
    "#66CC66", // Green
    "#00D5BE", // Teal
    "#615FFF", // Indigo
    "#FF3366", // Pink
    "#33CCFF", // Light Blue
  ];

  // Generate particle data with Brownian motion parameters
  const particles = useRef(
    Array.from({ length: 45 }, (_, i) => ({
      id: i,
      x: Math.random() * 1440,
      y: Math.random() * 1832,
      vx: (Math.random() - 0.5) * 2, // Velocity X
      vy: (Math.random() - 0.5) * 2, // Velocity Y
      size: Math.random() * 6 + 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      opacity: Math.random() * 0.4 + 0.6,
      life: Math.random() * 100, // For subtle pulsing
    }))
  ).current;

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const FRAME_RATE = 33; // ~30fps for smooth performance

  // Brownian motion particle animation
  const animateParticles = useCallback((timestamp: number) => {
    if (startTimeRef.current === 0) {
      startTimeRef.current = timestamp;
    }

    const deltaTime = 0.016; // ~60fps normalized

    particles.forEach((particle) => {
      // Brownian motion: add random walk to velocity
      particle.vx += (Math.random() - 0.5) * 0.1;
      particle.vy += (Math.random() - 0.5) * 0.1;

      // Apply drag to prevent runaway particles
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges with some randomness
      if (particle.x < 0 || particle.x > 1440) {
        particle.vx = -particle.vx * 0.8 + (Math.random() - 0.5) * 0.5;
        particle.x = Math.max(0, Math.min(1440, particle.x));
      }
      if (particle.y < 0 || particle.y > 1832) {
        particle.vy = -particle.vy * 0.8 + (Math.random() - 0.5) * 0.5;
        particle.y = Math.max(0, Math.min(1832, particle.y));
      }

      // Update rotation
      particle.rotation += particle.rotationSpeed;

      // Update life for subtle pulsing
      particle.life += deltaTime * 50;

      // Update particle element
      const particleElement = svgRef.current?.querySelector(
        `#particle-${particle.id}`
      ) as SVGElement;
      if (particleElement) {
        // Subtle pulsing opacity
        const pulse = Math.sin(particle.life * 0.02) * 0.2;
        const currentOpacity = Math.max(0.3, particle.opacity + pulse);

        particleElement.setAttribute(
          "transform",
          `translate(${particle.x}, ${particle.y}) rotate(${particle.rotation})`
        );
        particleElement.setAttribute("opacity", currentOpacity.toString());
      }
    });

    particleAnimationRef.current = requestAnimationFrame(animateParticles);
  }, []);

  // Mouse interaction for desktop
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile || !containerRef.current || !svgRef.current) return;

      const now = performance.now();
      if (now - lastUpdateRef.current < FRAME_RATE) return;

      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect || !svgRef.current) return;

        const x = (e.clientX - rect.left) / rect.width;

        // Calculate color intensity based on mouse position
        // Left side (0-0.5): More teal, less indigo
        // Right side (0.5-1): More indigo, less teal
        const leftInfluence = Math.max(0, (0.5 - x) * 2); // 1 at far left, 0 at center
        const rightInfluence = Math.max(0, (x - 0.5) * 2); // 0 at center, 1 at far right

        // Base intensity + position-based modulation
        const tealIntensity = 0.4 + leftInfluence * 0.6;
        const indigoIntensity = 0.4 + rightInfluence * 0.6;

        // Update CSS variables for the gradient paths
        svgRef.current.style.setProperty(
          "--teal-opacity",
          tealIntensity.toString()
        );
        svgRef.current.style.setProperty(
          "--indigo-opacity",
          indigoIntensity.toString()
        );

        lastUpdateRef.current = now;
        rafRef.current = 0;
      });
    },
    [isMobile]
  );

  // Scroll interaction for mobile
  const handleScroll = useCallback(() => {
    if (!isMobile || !svgRef.current) return;

    const now = performance.now();
    if (now - lastUpdateRef.current < FRAME_RATE) return;

    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      if (!svgRef.current) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      // Create wave-like color transitions based on scroll
      const tealWave = Math.sin(scrollProgress * Math.PI * 2) * 0.3 + 0.7;
      const indigoWave = Math.cos(scrollProgress * Math.PI * 2) * 0.3 + 0.7;

      svgRef.current.style.setProperty("--teal-opacity", tealWave.toString());
      svgRef.current.style.setProperty(
        "--indigo-opacity",
        indigoWave.toString()
      );

      lastUpdateRef.current = now;
      rafRef.current = 0;
    });
  }, [isMobile]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    // Set initial values
    if (svgRef.current) {
      svgRef.current.style.setProperty("--teal-opacity", "0.4");
      svgRef.current.style.setProperty("--indigo-opacity", "0.4");
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Start particle animation
    particleAnimationRef.current = requestAnimationFrame(animateParticles);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (particleAnimationRef.current) {
        cancelAnimationFrame(particleAnimationRef.current);
      }
    };
  }, [handleMouseMove, handleScroll, animateParticles]);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      ref={containerRef}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1440 1832"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        ref={svgRef}
        style={
          {
            "--teal-opacity": "0.4",
            "--indigo-opacity": "0.4",
          } as React.CSSProperties
        }
      >
        <g clipPath="url(#clip0_1_483)">
          <rect width={1440} height={1832} fill="#04070D" />

          {/* Your original gradient shapes with CSS variable integration */}
          <g opacity="var(--indigo-opacity)" filter="url(#filter0_f_1_483)">
            <path
              d="M1546.95 782.704L1333.03 731.317L1243.67 666.654L1270.23 496.142L1445.65 476.576L1444.04 354.832L1646.31 300.577L1776.6 331.876L1694.17 597.982L1566.89 631.172L1546.95 782.704Z"
              fill="#615FFF"
            />
          </g>

          <g opacity="var(--teal-opacity)" filter="url(#filter1_f_1_483)">
            <path
              d="M-142.779 395.667L-159.293 615.046L-125.068 719.911L45.3961 746.783L117.688 585.755L233.103 624.528L346.632 448.553L356.691 314.931L78.1241 312.013L7.5916 423.031L-142.779 395.667Z"
              fill="#00D5BE"
            />
          </g>

          {/* Your original static particles */}
          <path
            d="M165.957 1541.24H177.285L174.941 1554.77H163.613L165.957 1541.24Z"
            fill="#FF6633"
          />
          <path
            d="M118.957 586.592H130.285L127.941 600.117H116.613L118.957 586.592Z"
            fill="#FFCC33"
          />
          <path
            d="M1237.96 835.543H1249.29L1246.94 849.068H1235.61L1237.96 835.543Z"
            fill="#66CC66"
          />

          {/* Animated confetti particles */}
          {particles.map((particle) => (
            <g key={particle.id} id={`particle-${particle.id}`}>
              <rect
                width={particle.size}
                height={particle.size}
                rx="1"
                fill={particle.color}
                opacity={particle.opacity}
                style={{
                  willChange: "transform, opacity",
                  transformOrigin: `${particle.size / 2}px ${particle.size / 2}px`,
                }}
              />
            </g>
          ))}
        </g>

        {/* Your original filter definitions */}
        <defs>
          <filter
            id="filter0_f_1_483"
            x={843.665}
            y={-99.4232}
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
              result="effect1_foregroundBlur_1_483"
            />
          </filter>
          <filter
            id="filter1_f_1_483"
            x={-559.293}
            y={-87.9874}
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
              result="effect1_foregroundBlur_1_483"
            />
          </filter>
          <clipPath id="clip0_1_483">
            <rect width={1440} height={1832} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
});

export default AnimatedGradientExperiencesSection;
