import React, { useEffect, useRef } from "react";

import figmaLogo from "../../assets/images/figma-logo.svg";
import greenBolt from "../../assets/images/green-bolt-logo.svg";
import iceLogo from "../../assets/images/ice-logo.svg";
import starLight from "../../assets/images/starlight-logo.svg";
import toolTip from "../../assets/images/tooltip-logo.svg";

interface Logo {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  element: HTMLImageElement;
  image: string;
}

const BouncingLogosHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<Logo[]>([]);
  const animationRef = useRef<number>(0);
  const containerDimensionsRef = useRef({ width: 0, height: 0 });
  const lastFrameTime = useRef<number>(0);

  const logoImages = [figmaLogo, toolTip, greenBolt, starLight, iceLogo];

  // Target 30fps instead of 60fps for better performance
  const TARGET_FPS = 30;
  const FRAME_DURATION = 1000 / TARGET_FPS;

  // Initialize logos with direct DOM elements
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    containerDimensionsRef.current = { width: rect.width, height: rect.height };

    // Clear existing logos to avoid duplication
    container.innerHTML = "";
    logosRef.current = [];

    // Create logo elements directly in DOM with natural responsive sizing
    for (let i = 0; i < logoImages.length; i++) {
      // Create img element
      const imgElement = document.createElement("img");
      imgElement.src = logoImages[i];
      imgElement.alt = "bouncing logo";
      imgElement.className = "absolute select-none pointer-events-none";

      // Responsive natural sizing
      imgElement.style.maxWidth = "80px";
      imgElement.style.maxHeight = "80px";
      imgElement.style.width = "clamp(40px, 6vw, 80px)";
      imgElement.style.height = "auto";
      imgElement.style.filter = "drop-shadow(0 4px 12px rgba(0,0,0,0.2))";
      imgElement.style.willChange = "transform";

      // Add to container first to get computed dimensions
      container.appendChild(imgElement);

      // Get actual rendered size after adding to DOM
      const computedStyle = window.getComputedStyle(imgElement);
      const logoSize = Math.max(
        parseInt(computedStyle.width) || 60,
        parseInt(computedStyle.height) || 60
      );

      // Store logo data with much slower initial velocities
      const logo: Logo = {
        id: i,
        x: Math.random() * (rect.width - logoSize) + logoSize / 2,
        y: Math.random() * (rect.height - logoSize) + logoSize / 2,
        vx: (Math.random() - 0.5) * 7, // Much slower: reduced from 20 to 4
        vy: (Math.random() - 0.5) * 7, // Much slower: reduced from 30 to 4
        size: logoSize,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4, // Much slower rotation: reduced from 3 to 0.5
        element: imgElement,
        image: logoImages[i],
      };

      logosRef.current.push(logo);

      // Set initial position
      updateLogoPosition(logo);
    }

    // Start animation
    startAnimation();

    return () => {
      stopAnimation();
      if (container) {
        container.innerHTML = "";
      }
      logosRef.current = [];
    };
  }, [logoImages]);

  // Handle container resize
  useEffect(() => {
    const updateContainerSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      containerDimensionsRef.current = {
        width: rect.width,
        height: rect.height,
      };
    };

    const resizeObserver = new ResizeObserver(updateContainerSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Update logo position in DOM
  const updateLogoPosition = (logo: Logo) => {
    const transform = `translate(${logo.x - logo.size / 2}px, ${logo.y - logo.size / 2}px) rotate(${logo.rotation}deg)`;
    logo.element.style.transform = transform;
  };

  // Throttled animation loop with much gentler movements
  const animate = (currentTime: number) => {
    // Throttle to target FPS
    if (currentTime - lastFrameTime.current < FRAME_DURATION) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    lastFrameTime.current = currentTime;

    const { width, height } = containerDimensionsRef.current;

    if (width === 0 || height === 0) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    logosRef.current.forEach((logo) => {
      // Much gentler coordinated movement
      const time = currentTime * 0.0005; // Slower time progression: reduced from 0.001 to 0.0005
      const chaosX = Math.sin(time + logo.id) * 0.1; // Reduced chaos: from 0.5 to 0.1
      const chaosY = Math.cos(time + logo.id * 1.5) * 0.1; // Reduced chaos: from 0.5 to 0.1

      // Update position with gentle chaos
      logo.x += logo.vx + chaosX;
      logo.y += logo.vy + chaosY;
      logo.rotation += logo.rotationSpeed;

      // Bounce off walls with more damping for smoother movement
      const damping = 0.8; // More damping: reduced from 0.95 to 0.8

      if (logo.x - logo.size / 2 <= 0 || logo.x + logo.size / 2 >= width) {
        logo.vx = -logo.vx * damping;
        // Reduced randomness in bounce
        logo.vx += (Math.random() - 0.5) * 0.5; // Reduced from 2 to 0.5
        logo.x =
          logo.x - logo.size / 2 <= 0 ? logo.size / 2 : width - logo.size / 2;
      }

      if (logo.y - logo.size / 2 <= 0 || logo.y + logo.size / 2 >= height) {
        logo.vy = -logo.vy * damping;
        // Reduced randomness in bounce
        logo.vy += (Math.random() - 0.5) * 0.5; // Reduced from 2 to 0.5
        logo.y =
          logo.y - logo.size / 2 <= 0 ? logo.size / 2 : height - logo.size / 2;
      }

      // More friction for sustained but slower movement
      logo.vx *= 0.999; // More friction: reduced from 0.9995 to 0.999
      logo.vy *= 0.999;

      // Very occasional gentle speed boost
      if (Math.random() < 0.0005) {
        // Much less frequent: reduced from 0.002 to 0.0005
        logo.vx += (Math.random() - 0.5) * 0.5; // Gentler boost: reduced from 3 to 0.5
        logo.vy += (Math.random() - 0.5) * 0.5;
      }

      // Minimum velocity to prevent logos from getting stuck
      const minVelocity = 0.1;
      if (Math.abs(logo.vx) < minVelocity) {
        logo.vx = logo.vx >= 0 ? minVelocity : -minVelocity;
      }
      if (Math.abs(logo.vy) < minVelocity) {
        logo.vy = logo.vy >= 0 ? minVelocity : -minVelocity;
      }

      // Update DOM element directly
      updateLogoPosition(logo);
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    stopAnimation(); // Ensure no duplicate animations
    lastFrameTime.current = 0;
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    }
  };

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden"
      ref={containerRef}
      style={{
        willChange: "contents",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
    />
  );
};

export default BouncingLogosHeroSection;
