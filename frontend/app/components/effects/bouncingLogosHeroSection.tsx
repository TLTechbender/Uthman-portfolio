import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";


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

  const isInView = useInView(containerRef);
  const logoImages = [figmaLogo, toolTip, greenBolt, starLight, iceLogo];

  // Initialize logos with direct DOM elements
  useEffect(() => {
    if (!isInView || !containerRef.current) return;

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

      // Responsive natural sizing - let images keep their natural size but scale responsively
      imgElement.style.maxWidth = "80px"; // Max size for larger screens
      imgElement.style.maxHeight = "80px";
      imgElement.style.width = "clamp(40px, 6vw, 80px)"; // Responsive: min 40px, preferred 6vw, max 80px
      imgElement.style.height = "auto"; // Maintain aspect ratio
      imgElement.style.filter = "drop-shadow(0 4px 12px rgba(0,0,0,0.2))";
      imgElement.style.willChange = "transform"; // Optimize for animations

      // Add to container first to get computed dimensions
      container.appendChild(imgElement);

      // Get actual rendered size after adding to DOM
      const computedStyle = window.getComputedStyle(imgElement);
      const logoSize = Math.max(
        parseInt(computedStyle.width) || 60,
        parseInt(computedStyle.height) || 60
      );

      // Add to container
      container.appendChild(imgElement);

      // Store logo data
      const logo: Logo = {
        id: i,
        x: Math.random() * (rect.width - logoSize) + logoSize / 2,
        y: Math.random() * (rect.height - logoSize) + logoSize / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        size: logoSize,
        rotation: Math.random() * 360, // Random initial rotation
        rotationSpeed: (Math.random() - 0.5) * 8, // Faster rotation
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
  }, [isInView, logoImages]);

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

  // Animation loop with direct DOM updates
  const animate = () => {
    const { width, height } = containerDimensionsRef.current;

    if (width === 0 || height === 0) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    logosRef.current.forEach((logo) => {
      // Add some coordinated chaos - logos influence each other slightly
      const time = Date.now() * 0.001; // Current time in seconds
      const chaosX = Math.sin(time + logo.id) * 0.5; // Subtle wave motion
      const chaosY = Math.cos(time + logo.id * 1.5) * 0.5;

      // Update position with chaos
      logo.x += logo.vx + chaosX;
      logo.y += logo.vy + chaosY;
      logo.rotation += logo.rotationSpeed;

      // Bounce off walls with less damping for more energy
      const damping = 0.95; // Less damping = more chaotic bouncing

      if (logo.x - logo.size / 2 <= 0 || logo.x + logo.size / 2 >= width) {
        logo.vx = -logo.vx * damping;
        // Add some randomness to bounce angle
        logo.vx += (Math.random() - 0.5) * 2;
        logo.x =
          logo.x - logo.size / 2 <= 0 ? logo.size / 2 : width - logo.size / 2;
      }

      if (logo.y - logo.size / 2 <= 0 || logo.y + logo.size / 2 >= height) {
        logo.vy = -logo.vy * damping;
        // Add some randomness to bounce angle
        logo.vy += (Math.random() - 0.5) * 2;
        logo.y =
          logo.y - logo.size / 2 <= 0 ? logo.size / 2 : height - logo.size / 2;
      }

      // Reduce friction for more sustained movement
      logo.vx *= 0.9995; // Much less friction
      logo.vy *= 0.9995;

      // Occasional speed boost for chaos
      if (Math.random() < 0.002) {
        // 0.2% chance per frame
        logo.vx += (Math.random() - 0.5) * 3;
        logo.vy += (Math.random() - 0.5) * 3;
      }

      // Update DOM element directly
      updateLogoPosition(logo);
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    stopAnimation(); // Ensure no duplicate animations
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    }
  };

  // Stop animation when component goes out of view
  useEffect(() => {
    if (!isInView) {
      stopAnimation();
    } else if (logosRef.current.length > 0 && animationRef.current === 0) {
      startAnimation();
    }
  }, [isInView]);


  //another ai assist here bro, I was using react state before, that was so chaotic at 60fps but now it's better
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
