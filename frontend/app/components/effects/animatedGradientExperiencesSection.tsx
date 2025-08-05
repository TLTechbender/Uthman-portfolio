import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import animatedGradientExperiences from "../../assets/images/animatedGradientExperiences.png";

const AnimatedGradientExperiencesSection: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
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
      x: Math.random() * 100, // Using percentage for responsive design
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.2, // Velocity X (percentage-based)
      vy: (Math.random() - 0.5) * 0.2, // Velocity Y (percentage-based)
      size: Math.random() * 6 + 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      opacity: Math.random() * 0.4 + 0.6,
      life: Math.random() * 100, // For subtle pulsing
      element: null as HTMLDivElement | null,
    }))
  ).current;

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const FRAME_RATE = 33; // ~30fps for smooth performance

  // Create particle DOM elements
  const createParticleElements = useCallback(() => {
    if (!particleContainerRef.current) return;

    // Clear existing particles
    particleContainerRef.current.innerHTML = "";

    particles.forEach((particle) => {
      const element = document.createElement("div");
      element.className =
        "absolute pointer-events-none transition-opacity duration-300";
      element.style.cssText = `
        width: ${particle.size}px;
        height: ${particle.size}px;
        background-color: ${particle.color};
        border-radius: 2px;
        opacity: ${particle.opacity};
        will-change: transform, opacity;
        transform: translate3d(${particle.x}%, ${particle.y}%, 0) rotate(${particle.rotation}deg);
      `;

      particle.element = element;
      particleContainerRef.current?.appendChild(element);
    });
  }, []);

  // Brownian motion particle animation
  const animateParticles = useCallback((timestamp: number) => {
    if (startTimeRef.current === 0) {
      startTimeRef.current = timestamp;
    }

    particles.forEach((particle) => {
      // Brownian motion: add random walk to velocity
      particle.vx += (Math.random() - 0.5) * 0.01; // Scaled for percentage movement
      particle.vy += (Math.random() - 0.5) * 0.01;

      // Apply drag to prevent runaway particles
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges with some randomness
      if (particle.x < 0 || particle.x > 100) {
        particle.vx = -particle.vx * 0.8 + (Math.random() - 0.5) * 0.05;
        particle.x = Math.max(0, Math.min(100, particle.x));
      }
      if (particle.y < 0 || particle.y > 100) {
        particle.vy = -particle.vy * 0.8 + (Math.random() - 0.5) * 0.05;
        particle.y = Math.max(0, Math.min(100, particle.y));
      }

      // Update rotation
      particle.rotation += particle.rotationSpeed;

      // Update life for subtle pulsing
      particle.life += 0.8;

      // Update particle element with CSS transforms
      if (particle.element) {
        // Subtle pulsing opacity
        const pulse = Math.sin(particle.life * 0.02) * 0.2;
        const currentOpacity = Math.max(0.3, particle.opacity + pulse);

        // Use CSS transform for better performance
        particle.element.style.transform = `translate3d(${particle.x}%, ${particle.y}%, 0) rotate(${particle.rotation}deg)`;
        particle.element.style.opacity = currentOpacity.toString();
      }
    });

    particleAnimationRef.current = requestAnimationFrame(animateParticles);
  }, []);

  // Mouse interaction for desktop
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile || !containerRef.current || !backgroundRef.current) return;

      const now = performance.now();
      if (now - lastUpdateRef.current < FRAME_RATE) return;

      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect || !backgroundRef.current) return;

        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Create parallax effect based on mouse position
        const moveX = (x - 0.5) * 20; // Max 20px movement
        const moveY = (y - 0.5) * 20;

        // Apply subtle background movement and opacity changes
        backgroundRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.05)`;

        // Color intensity based on mouse position (for potential overlay effects)
        const leftInfluence = Math.max(0, (0.5 - x) * 2);
        const rightInfluence = Math.max(0, (x - 0.5) * 2);

        // You can use these values for additional overlay effects if needed
        const tealIntensity = 0.1 + leftInfluence * 0.2;
        const indigoIntensity = 0.1 + rightInfluence * 0.2;

        // Apply color overlay (optional)
        backgroundRef.current.style.filter = `hue-rotate(${leftInfluence * 30 - rightInfluence * 30}deg) brightness(${1 + (leftInfluence + rightInfluence) * 0.1})`;

        lastUpdateRef.current = now;
        rafRef.current = 0;
      });
    },
    [isMobile]
  );

  // Scroll interaction for mobile
  const handleScroll = useCallback(() => {
    if (!isMobile || !backgroundRef.current) return;

    const now = performance.now();
    if (now - lastUpdateRef.current < FRAME_RATE) return;

    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      if (!backgroundRef.current) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      // Create wave-like movement based on scroll
      const waveOffset = Math.sin(scrollProgress * Math.PI * 2) * 10;
      const scaleEffect = 1 + Math.cos(scrollProgress * Math.PI) * 0.05;

      backgroundRef.current.style.transform = `translate3d(0, ${waveOffset}px, 0) scale(${scaleEffect})`;

      // Color shifting based on scroll
      const hueShift = scrollProgress * 60; // Max 60 degree hue shift
      backgroundRef.current.style.filter = `hue-rotate(${hueShift}deg) brightness(${1 + scrollProgress * 0.2})`;

      lastUpdateRef.current = now;
      rafRef.current = 0;
    });
  }, [isMobile]);

  // Static particles (the original decorative ones)
  const staticParticles = [
    { x: 11.5, y: 84.1, color: "#FF6633", size: 12 },
    { x: 8.3, y: 32.0, color: "#FFCC33", size: 12 },
    { x: 86.0, y: 45.6, color: "#66CC66", size: 12 },
  ];

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    // Create particle elements
    createParticleElements();

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
  }, [handleMouseMove, handleScroll, animateParticles, createParticleElements]);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      ref={containerRef}
    >
      {/* PNG Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-75 ease-out"
        style={{
          backgroundImage: `url(${animatedGradientExperiences})`,
          willChange: "transform, filter",
          transform: "translate3d(0, 0, 0) scale(1.05)", // Slight oversizing for parallax
        }}
      />

      {/* Static decorative particles */}
      {staticParticles.map((particle, index) => (
        <div
          key={`static-${index}`}
          className="absolute pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: "2px",
            transform: "rotate(45deg)",
          }}
        />
      ))}

      {/* Animated particles container */}
      <div
        ref={particleContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ willChange: "contents" }}
      />
    </div>
  );
});

export default AnimatedGradientExperiencesSection;
