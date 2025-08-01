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

interface LogoConfig {
  image: string;
  sizeMultiplier: number;
  name: string; // For easier identification
}

const BouncingLogosHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<Logo[]>([]);
  const animationRef = useRef<number>(0);
  const containerDimensionsRef = useRef({ width: 0, height: 0 });
  const lastFrameTime = useRef<number>(0);

  const logoConfigs: LogoConfig[] = [
    { image: figmaLogo, sizeMultiplier: 2.5, name: "Figma" },
    { image: toolTip, sizeMultiplier: 0.75, name: "Tooltip" },
    { image: greenBolt, sizeMultiplier: 0.75, name: "GreenBolt" },
    { image: starLight, sizeMultiplier: 0.75, name: "StarLight" },
    { image: iceLogo, sizeMultiplier: 0.75, name: "Ice" },
  ];

  // Base sizing configuration for clamping bro
  const baseSizing = {
    minSize: 40, // Minimum size in pixels
    maxSize: 80, // Maximum size in pixels
    viewportFactor: 6, // vw unit for responsive sizing
  };

  // Target 30fps instead of 60fps for better performance

  const TARGET_FPS = 30;
  const FRAME_DURATION = 1000 / TARGET_FPS;

  const calculateLogoSize = (sizeMultiplier: number) => {
    const scaledMin = baseSizing.minSize * sizeMultiplier;
    const scaledMax = baseSizing.maxSize * sizeMultiplier;
    const scaledVw = baseSizing.viewportFactor * sizeMultiplier;

    return {
      minSize: scaledMin,
      maxSize: scaledMax,
      clampValue: `clamp(${scaledMin}px, ${scaledVw}vw, ${scaledMax}px)`,
    };
  };

  // Initialize logos with individual sizing
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    containerDimensionsRef.current = { width: rect.width, height: rect.height };

    container.innerHTML = "";
    logosRef.current = [];

    // Create logo elements with individual sizing
    logoConfigs.forEach((config, i) => {
      // Create img element
      const imgElement = document.createElement("img");
      imgElement.src = config.image;
      imgElement.alt = `${config.name} bouncing logo`;
      imgElement.className = "absolute select-none pointer-events-none";

      // Calculate individual sizing
      const sizing = calculateLogoSize(config.sizeMultiplier);

      // Apply individual responsive sizing
      imgElement.style.maxWidth = `${sizing.maxSize}px`;
      imgElement.style.maxHeight = `${sizing.maxSize}px`;
      imgElement.style.width = sizing.clampValue;
      imgElement.style.height = "auto";
      imgElement.style.filter = "drop-shadow(0 4px 12px rgba(0,0,0,0.2))";
      imgElement.style.willChange = "transform";

      // Add to container first to get computed dimensions
      container.appendChild(imgElement);

      // Get actual rendered size after adding to DOM
      const computedStyle = window.getComputedStyle(imgElement);
      const logoSize = Math.max(
        parseInt(computedStyle.width) || sizing.maxSize,
        parseInt(computedStyle.height) || sizing.maxSize
      );

      // Store logo data with size-adjusted velocities
      const velocityScale = Math.min(1.0, 1.0 / config.sizeMultiplier); // Larger logos move slightly slower

      const logo: Logo = {
        id: i,
        x: Math.random() * (rect.width - logoSize) + logoSize / 2,
        y: Math.random() * (rect.height - logoSize) + logoSize / 2,
        vx: (Math.random() - 0.5) * 7 * velocityScale,
        vy: (Math.random() - 0.5) * 7 * velocityScale,
        size: logoSize,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4 * velocityScale,
        element: imgElement,
        image: config.image,
      };

      logosRef.current.push(logo);

      // Set initial position
      updateLogoPosition(logo);
    });

    // Start animation
    startAnimation();

    return () => {
      stopAnimation();
      if (container) {
        container.innerHTML = "";
      }
      logosRef.current = [];
    };
  }, [logoConfigs]); // Now depends on logoConfigs for reactivity

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

  // Animation loop (unchanged from original)
  const animate = (currentTime: number) => {
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
      const time = currentTime * 0.0005;
      const chaosX = Math.sin(time + logo.id) * 0.1;
      const chaosY = Math.cos(time + logo.id * 1.5) * 0.1;

      logo.x += logo.vx + chaosX;
      logo.y += logo.vy + chaosY;
      logo.rotation += logo.rotationSpeed;

      const damping = 0.8;

      if (logo.x - logo.size / 2 <= 0 || logo.x + logo.size / 2 >= width) {
        logo.vx = -logo.vx * damping;
        logo.vx += (Math.random() - 0.5) * 0.5;
        logo.x =
          logo.x - logo.size / 2 <= 0 ? logo.size / 2 : width - logo.size / 2;
      }

      if (logo.y - logo.size / 2 <= 0 || logo.y + logo.size / 2 >= height) {
        logo.vy = -logo.vy * damping;
        logo.vy += (Math.random() - 0.5) * 0.5;
        logo.y =
          logo.y - logo.size / 2 <= 0 ? logo.size / 2 : height - logo.size / 2;
      }

      logo.vx *= 0.999;
      logo.vy *= 0.999;

      if (Math.random() < 0.0005) {
        logo.vx += (Math.random() - 0.5) * 0.5;
        logo.vy += (Math.random() - 0.5) * 0.5;
      }

      const minVelocity = 0.1;
      if (Math.abs(logo.vx) < minVelocity) {
        logo.vx = logo.vx >= 0 ? minVelocity : -minVelocity;
      }
      if (Math.abs(logo.vy) < minVelocity) {
        logo.vy = logo.vy >= 0 ? minVelocity : -minVelocity;
      }

      updateLogoPosition(logo);
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    stopAnimation();
    lastFrameTime.current = 0;
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    }
  };

  {
    /**
     My first implementation used react state for logos, that was very bad as it was sporadic and causing about a billion
    rerenders, using a ref takes care of this, all I gotta just make sure to do is that this page does not in any way rerender
    */
  }
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
