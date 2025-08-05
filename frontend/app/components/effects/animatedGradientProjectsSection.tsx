import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import AnimatedGradientProjects from "../../assets/images/animatedGradientProjects.png";

// Define particle interface for better type safety
interface Particle {
  id: number;
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  baseOpacity: number;
  life: number;
}

const AnimatedGradientProjectsSection: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false); // 🔑 Key addition for SSG safety

  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);
  const particleAnimationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]); // Store particles in ref

  const particleColors = [
    "#FF6633",
    "#FFCC33",
    "#66CC66",
    "#00D5BE",
    "#615FFF",
    "#FF3366",
    "#33CCFF",
  ];

  // 🔑 Client-side detection effect
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 🔑 Particle creation function - only runs client-side
  const createParticles = useCallback((): Particle[] => {
    if (typeof document === "undefined") return [];

    return Array.from({ length: 16 }, (_, i) => {
      const element = document.createElement("div");
      element.className = "particle";
      element.style.cssText = `
        position: absolute;
        border-radius: 2px;
        pointer-events: none;
        will-change: transform, opacity;
        transform-origin: center;
      `;

      return {
        id: i,
        element,
        x: Math.random() * 1440,
        y: Math.random() * 900,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 6 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        color:
          particleColors[Math.floor(Math.random() * particleColors.length)],
        baseOpacity: Math.random() * 0.4 + 0.6,
        life: Math.random() * 100,
      };
    });
  }, [particleColors]);

  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // Update container dimensions for particles
    if (containerRef.current && particlesRef.current.length > 0) {
      const rect = containerRef.current.getBoundingClientRect();
      particlesRef.current.forEach((particle) => {
        particle.x = Math.min(particle.x, rect.width);
        particle.y = Math.min(particle.y, rect.height);
      });
    }
  }, []);

  const FRAME_RATE = 1000 / 30;

  const updateGradientStyles = useCallback(
    (
      leftIntensity: number,
      rightIntensity: number,
      cursorX: number = 0,
      cursorY: number = 0,
      scale: number = 1,
      mobileIntensity: number = 0,
      mobileScale: number = 1,
      mobileRotate: number = 0
    ) => {
      if (!imageRef.current) return;

      const element = imageRef.current;

      if (!isMobile) {
        element.style.transform = `
          translate3d(${cursorX}px, ${cursorY}px, 0) 
          scale(${scale})
        `;

        const brightness = 0.8 + (leftIntensity + rightIntensity) * 0.4;
        const contrast = 1 + (leftIntensity - rightIntensity) * 0.15;
        const hueRotate = (leftIntensity - rightIntensity) * 20;
        const saturation = 1 + Math.abs(leftIntensity - rightIntensity) * 0.4;

        element.style.filter = `
          brightness(${brightness}) 
          contrast(${contrast}) 
          hue-rotate(${hueRotate}deg)
          saturate(${saturation})
        `;

        element.style.opacity = `${0.7 + (leftIntensity + rightIntensity) * 0.15}`;
      } else {
        element.style.transform = `
          scale(${mobileScale}) 
          rotate(${mobileRotate}deg)
        `;

        element.style.filter = `
          brightness(${0.8 + mobileIntensity * 0.4})
          saturate(${1 + mobileIntensity * 0.3})
          hue-rotate(${mobileIntensity * 10}deg)
        `;

        element.style.opacity = `${0.6 + mobileIntensity * 0.2}`;
      }
    },
    [isMobile]
  );

  const animateParticles = useCallback((timestamp: number) => {
    if (startTimeRef.current === 0) {
      startTimeRef.current = timestamp;
    }

    const deltaTime = 0.016;
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect || particlesRef.current.length === 0) {
      particleAnimationRef.current = requestAnimationFrame(animateParticles);
      return;
    }

    const updates: Array<() => void> = [];

    particlesRef.current.forEach((particle) => {
      particle.vx += (Math.random() - 0.5) * 0.1;
      particle.vy += (Math.random() - 0.5) * 0.1;
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      particle.x += particle.vx;
      particle.y += particle.vy;

      const maxX = containerRect.width;
      const maxY = containerRect.height;

      if (particle.x < 0 || particle.x > maxX) {
        particle.vx = -particle.vx * 0.8 + (Math.random() - 0.5) * 0.5;
        particle.x = Math.max(0, Math.min(maxX, particle.x));
      }
      if (particle.y < 0 || particle.y > maxY) {
        particle.vy = -particle.vy * 0.8 + (Math.random() - 0.5) * 0.5;
        particle.y = Math.max(0, Math.min(maxY, particle.y));
      }

      particle.rotation += particle.rotationSpeed;
      particle.life += deltaTime * 50;

      updates.push(() => {
        const pulse = Math.sin(particle.life * 0.02) * 0.15;
        const currentOpacity = Math.max(0.3, particle.baseOpacity + pulse);

        particle.element.style.transform = `
          translate3d(${particle.x}px, ${particle.y}px, 0) 
          rotate(${particle.rotation}deg)
        `;
        particle.element.style.opacity = currentOpacity.toString();
        particle.element.style.width = `${particle.size}px`;
        particle.element.style.height = `${particle.size}px`;
        particle.element.style.backgroundColor = particle.color;
      });
    });

    updates.forEach((update) => update());
    particleAnimationRef.current = requestAnimationFrame(animateParticles);
  }, []);

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

        const leftInfluence = Math.max(0, (0.5 - x) * 2);
        const rightInfluence = Math.max(0, (x - 0.5) * 2);

        const leftIntensity = 0.4 + leftInfluence * 0.6;
        const rightIntensity = 0.4 + rightInfluence * 0.6;

        const cursorX = (x - 0.5) * 25 * 0.1;
        const cursorY = (y - 0.5) * 20 * 0.1;
        const scale = 1 + (leftIntensity + rightIntensity) * 0.03;

        updateGradientStyles(
          leftIntensity,
          rightIntensity,
          cursorX,
          cursorY,
          scale
        );

        lastUpdateRef.current = now;
        rafRef.current = 0;
      });
    },
    [isMobile, updateGradientStyles]
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

      const tealWave = Math.sin(scrollProgress * Math.PI * 2) * 0.3 + 0.7;
      const indigoWave = Math.cos(scrollProgress * Math.PI * 2) * 0.3 + 0.7;
      const intensity = (tealWave + indigoWave) / 2;

      updateGradientStyles(
        0,
        0,
        0,
        0,
        1,
        intensity * 0.8,
        0.9 + intensity * 0.2,
        scrollProgress * 3
      );

      lastUpdateRef.current = now;
      rafRef.current = 0;
    });
  }, [isMobile, updateGradientStyles]);

  // Initial setup effect
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // 🔑 Main client-side initialization effect
  useEffect(() => {
    if (!isClient) return; // Prevent running during SSG

    // Create particles only on client-side
    particlesRef.current = createParticles();

    // Initialize particle DOM elements
    if (particleContainerRef.current && particlesRef.current.length > 0) {
      particlesRef.current.forEach((particle) => {
        particleContainerRef.current?.appendChild(particle.element);
      });
    }

    // Setup event listeners
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    particleAnimationRef.current = requestAnimationFrame(animateParticles);

    return () => {
      // Cleanup
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (particleAnimationRef.current) {
        cancelAnimationFrame(particleAnimationRef.current);
      }

      // Cleanup particle elements
      particlesRef.current.forEach((particle) => {
        particle.element.remove();
      });
      particlesRef.current = [];
    };
  }, [
    isClient,
    createParticles,
    handleMouseMove,
    handleScroll,
    animateParticles,
  ]);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      ref={containerRef}
    >
      {/* PNG Background */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${AnimatedGradientProjects})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          willChange: "transform, filter, opacity",
          transformOrigin: "center",
          transform: "translate3d(0px, 0px, 0) scale(1)",
          filter: "brightness(0.8) contrast(1) hue-rotate(0deg) saturate(1)",
          opacity: "0.7",
        }}
      />

      {/* 🔑 Conditionally render particle container only on client */}
      {isClient && (
        <div
          ref={particleContainerRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        />
      )}

      {/* Static decorative particles */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <div
          className="absolute"
          style={{
            left: "165px",
            top: "300px",
            width: "12px",
            height: "14px",
            backgroundColor: "#FF6633",
            transform: "rotate(15deg)",
            borderRadius: "1px",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "118px",
            top: "150px",
            width: "12px",
            height: "14px",
            backgroundColor: "#FFCC33",
            transform: "rotate(-10deg)",
            borderRadius: "1px",
          }}
        />
        <div
          className="absolute"
          style={{
            right: "200px",
            top: "400px",
            width: "12px",
            height: "14px",
            backgroundColor: "#66CC66",
            transform: "rotate(25deg)",
            borderRadius: "1px",
          }}
        />
      </div>
    </div>
  );
});

export default AnimatedGradientProjectsSection;
