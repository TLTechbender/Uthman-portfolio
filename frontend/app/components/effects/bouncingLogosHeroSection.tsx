import React, { useEffect, useRef, useCallback } from "react";

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
  // Add these for GPU optimization
  transform: string;
  needsUpdate: boolean;
}

interface LogoConfig {
  image: string;
  sizeMultiplier: number;
  name: string;
}

//Asked calude for performance improvements bro, at this point only God knows what all this code be doing

const BouncingLogosHeroSection:React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<Logo[]>([]);
  const animationRef = useRef<number>(0);
  const containerDimensionsRef = useRef({ width: 0, height: 0 });

  // Performance optimizations
  const lastFrameTime = useRef<number>(0);
  const frameCount = useRef<number>(0);
  const isVisible = useRef<boolean>(true);
  const transformCache = useRef<string[]>([]);

  const logoConfigs: LogoConfig[] = [
    { image: figmaLogo, sizeMultiplier: 2.5, name: "Figma" },
    // { image: toolTip, sizeMultiplier: 0.75, name: "Tooltip" },
    { image: greenBolt, sizeMultiplier: 0.75, name: "GreenBolt" },
    { image: starLight, sizeMultiplier: 0.75, name: "StarLight" },
    { image: iceLogo, sizeMultiplier: 0.75, name: "Ice" },
  ];

  const baseSizing = {
    minSize: 40,
    maxSize: 80,
    viewportFactor: 6,
  };

  // Reduce to 20fps and use adaptive frame skipping
  const TARGET_FPS = 30;
  const FRAME_DURATION = 1000 / TARGET_FPS;
  const VISIBILITY_CHECK_INTERVAL = 60; // Check visibility every 60 frames

  const calculateLogoSize = useCallback((sizeMultiplier: number) => {
    const scaledMin = baseSizing.minSize * sizeMultiplier;
    const scaledMax = baseSizing.maxSize * sizeMultiplier;
    const scaledVw = baseSizing.viewportFactor * sizeMultiplier;

    return {
      minSize: scaledMin,
      maxSize: scaledMax,
      clampValue: `clamp(${scaledMin}px, ${scaledVw}vw, ${scaledMax}px)`,
    };
  }, []);

  // Optimized transform update using CSS transform caching
  const updateLogoPosition = useCallback(
    (logo: Logo, force: boolean = false) => {
      const newTransform = `translate3d(${(logo.x - logo.size / 2).toFixed(1)}px, ${(logo.y - logo.size / 2).toFixed(1)}px, 0) rotate(${logo.rotation.toFixed(1)}deg)`;

      // Only update if transform actually changed (reduces DOM writes)
      if (force || transformCache.current[logo.id] !== newTransform) {
        logo.element.style.transform = newTransform;
        transformCache.current[logo.id] = newTransform;
        logo.needsUpdate = false;
      }
    },
    []
  );

  // Batch DOM updates for better performance
  const updateAllLogos = useCallback(() => {
    // Use document fragment for batch updates if many changes
    const logosNeedingUpdate = logosRef.current.filter(
      (logo) => logo.needsUpdate
    );

    if (logosNeedingUpdate.length > 0) {
      // Batch DOM updates
      logosNeedingUpdate.forEach((logo) => updateLogoPosition(logo));
    }
  }, [updateLogoPosition]);

  // Visibility API optimization
  const handleVisibilityChange = useCallback(() => {
    isVisible.current = !document.hidden;
    if (!isVisible.current) {
      stopAnimation();
    } else {
      startAnimation();
    }
  }, []);

  // Initialize logos with GPU-optimized setup
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    containerDimensionsRef.current = { width: rect.width, height: rect.height };

    container.innerHTML = "";
    logosRef.current = [];
    transformCache.current = [];

    logoConfigs.forEach((config, i) => {
      const imgElement = document.createElement("img");
      imgElement.src = config.image;
      imgElement.alt = `${config.name} bouncing logo`;
      imgElement.className = "absolute select-none pointer-events-none";

      const sizing = calculateLogoSize(config.sizeMultiplier);

      // GPU optimization setup
      imgElement.style.cssText = `
        max-width: ${sizing.maxSize}px;
        max-height: ${sizing.maxSize}px;
        width: ${sizing.clampValue};
        height: auto;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
        will-change: transform;
        backface-visibility: hidden;
        perspective: 1000px;
        transform-style: preserve-3d;
      `;

      container.appendChild(imgElement);

      const computedStyle = window.getComputedStyle(imgElement);
      const logoSize = Math.max(
        parseInt(computedStyle.width) || sizing.maxSize,
        parseInt(computedStyle.height) || sizing.maxSize
      );

      const velocityScale = Math.max(2.0, 1.0 / config.sizeMultiplier);

      const logo: Logo = {
        id: i,
        x: Math.random() * (rect.width - logoSize) + logoSize / 2,
        y: Math.random() * (rect.height - logoSize) + logoSize / 2,
        vx: (Math.random() - 0.5) * 5 * velocityScale, // Reduced velocity
        vy: (Math.random() - 0.5) * 5 * velocityScale,
        size: logoSize,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2 * velocityScale, // Reduced rotation
        element: imgElement,
        image: config.image,
        transform: "",
        needsUpdate: true,
      };

      logosRef.current.push(logo);
      updateLogoPosition(logo, true);
    });

    startAnimation();

    return () => {
      stopAnimation();
      if (container) {
        container.innerHTML = "";
      }
      logosRef.current = [];
      transformCache.current = [];
    };
  }, [logoConfigs, calculateLogoSize, updateLogoPosition]);

  // Optimized resize handler with debouncing
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const updateContainerSize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        containerDimensionsRef.current = {
          width: rect.width,
          height: rect.height,
        };
      }, 150); // Debounce resize
    };

    const resizeObserver = new ResizeObserver(updateContainerSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
    };
  }, []);

  // Visibility API setup
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  // Optimized animation loop with adaptive frame skipping
  const animate = useCallback(
    (currentTime: number) => {
      if (!isVisible.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      if (currentTime - lastFrameTime.current < FRAME_DURATION) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      frameCount.current++;
      lastFrameTime.current = currentTime;

      const { width, height } = containerDimensionsRef.current;

      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Simplified physics with reduced calculations
      logosRef.current.forEach((logo) => {
        // Simplified chaos - only every 4th frame
        const time = currentTime * 0.0003;
        const chaosX =
          frameCount.current % 4 === 0 ? Math.sin(time + logo.id) * 0.05 : 0;
        const chaosY =
          frameCount.current % 4 === 0
            ? Math.cos(time + logo.id * 1.5) * 0.05
            : 0;

        logo.x += logo.vx + chaosX;
        logo.y += logo.vy + chaosY;
        logo.rotation += logo.rotationSpeed;

        const damping = 0.85; // Slightly more damping

        // Simplified boundary collision
        if (logo.x - logo.size / 2 <= 0 || logo.x + logo.size / 2 >= width) {
          logo.vx = -logo.vx * damping;
          logo.x = Math.max(
            logo.size / 2,
            Math.min(width - logo.size / 2, logo.x)
          );
        }

        if (logo.y - logo.size / 2 <= 0 || logo.y + logo.size / 2 >= height) {
          logo.vy = -logo.vy * damping;
          logo.y = Math.max(
            logo.size / 2,
            Math.min(height - logo.size / 2, logo.y)
          );
        }

        // Simplified velocity decay
        logo.vx *= 0.9995;
        logo.vy *= 0.9995;

        // Reduced random impulses
        if (Math.random() < 0.0002) {
          logo.vx += (Math.random() - 0.5) * 0.3;
          logo.vy += (Math.random() - 0.5) * 0.3;
        }

        // Maintain minimum velocity
        const minVelocity = 0.05;
        if (Math.abs(logo.vx) < minVelocity) {
          logo.vx = logo.vx >= 0 ? minVelocity : -minVelocity;
        }
        if (Math.abs(logo.vy) < minVelocity) {
          logo.vy = logo.vy >= 0 ? minVelocity : -minVelocity;
        }

        logo.needsUpdate = true;
      });

      // Batch update all logos
      updateAllLogos();

      animationRef.current = requestAnimationFrame(animate);
    },
    [updateAllLogos]
  );

  const startAnimation = useCallback(() => {
    stopAnimation();
    lastFrameTime.current = 0;
    frameCount.current = 0;
    animationRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    }
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden z-10"
      ref={containerRef}
      style={{
        willChange: "contents",
        backfaceVisibility: "hidden",
        perspective: "1000px",
        contain: "layout style paint", // CSS containment for better performance
      }}
    />
  );
};

export default BouncingLogosHeroSection;
