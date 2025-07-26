import React, { useRef, useEffect, useCallback, useState } from "react";

import funnyShape1 from "../../assets/images/funnyShape.svg";
import funnyShape2 from "../../assets/images/funnyShape1.svg";

interface Shape {
  id: number;
  imageSrc: string;
  alt: string;
  initialX: number;
  initialY: number;
}

interface ShapeRef {
  element: HTMLImageElement | null;
  x: number;
  y: number;
  isVisible: boolean;
  scale: number;
}

interface ContainerBounds {
  width: number;
  height: number;
}

const WireframeNineShapesBackground: React.FC = () => {
  const shapeRefs = useRef<Map<number, ShapeRef>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const [isAnimating, setIsAnimating] = useState(true);
  const [containerBounds, setContainerBounds] = useState<ContainerBounds>({
    width: 0,
    height: 0,
  });

  // Shape size constant - accounts for w-16 h-16 (64px)
  const SHAPE_SIZE = 64;

  // Get container dimensions
  const updateContainerBounds = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;

    setContainerBounds({ width, height });
  }, []);

  // Initialize shapes with proper bounds checking
  const [shapes] = useState<Shape[]>(() => {
    const shapeImages = [
      { src: funnyShape1, alt: "Funny Shape 1" },
      { src: funnyShape2, alt: "Funny Shape 2" },
    ];

    return Array.from({ length: 4 }, (_, i) => {
      const imageData = shapeImages[i % shapeImages.length];
      return {
        id: i,
        imageSrc: imageData.src,
        alt: imageData.alt,
        // Start with safe defaults, will be updated when container mounts
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
      };
    });
  });

  // Get random position within current container bounds
  const getRandomPosition = useCallback((): { x: number; y: number } => {
    const maxX = Math.max(0, containerBounds.width - SHAPE_SIZE);
    const maxY = Math.max(0, containerBounds.height - SHAPE_SIZE);

    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    };
  }, [containerBounds]);

  // Update shape visuals with bounds checking
  const updateShapeVisuals = useCallback(
    (id: number, updates: Partial<Omit<ShapeRef, "element">>) => {
      const shapeRef = shapeRefs.current.get(id);
      if (!shapeRef?.element) return;

      const { element } = shapeRef;

      // Update ref data with bounds checking
      if (updates.x !== undefined) {
        shapeRef.x = Math.min(
          Math.max(0, updates.x),
          containerBounds.width - SHAPE_SIZE
        );
      }
      if (updates.y !== undefined) {
        shapeRef.y = Math.min(
          Math.max(0, updates.y),
          containerBounds.height - SHAPE_SIZE
        );
      }
      if (updates.isVisible !== undefined) {
        shapeRef.isVisible = updates.isVisible;
      }
      if (updates.scale !== undefined) {
        shapeRef.scale = updates.scale;
      }

      // Apply visual updates
      if (updates.x !== undefined || updates.y !== undefined) {
        element.style.left = `${shapeRef.x}px`;
        element.style.top = `${shapeRef.y}px`;
      }

      if (updates.isVisible !== undefined || updates.scale !== undefined) {
        const translateY = shapeRef.isVisible ? "0" : "8px";
        const opacity = shapeRef.isVisible ? "1" : "0";

        element.style.opacity = opacity;
        element.style.transform = `scale(${shapeRef.scale}) translateY(${translateY})`;
      }
    },
    [containerBounds]
  );

  // Initialize shape ref with proper positioning
  const initializeShapeRef = useCallback(
    (element: HTMLImageElement | null, shape: Shape) => {
      if (!element) return;

      // Use fallback dimensions if container bounds aren't ready
      const width = containerBounds.width || 1200;
      const height = containerBounds.height || 800;

      const safePosition = {
        x: Math.random() * Math.max(0, width - SHAPE_SIZE),
        y: Math.random() * Math.max(0, height - SHAPE_SIZE),
      };

      const shapeRef: ShapeRef = {
        element,
        x: safePosition.x,
        y: safePosition.y,
        isVisible: true,
        scale: 0.8 + Math.random() * 0.4,
      };

      shapeRefs.current.set(shape.id, shapeRef);

      // Apply initial styles
      element.style.position = "absolute";
      element.style.left = `${shapeRef.x}px`;
      element.style.top = `${shapeRef.y}px`;
      element.style.transform = `scale(${shapeRef.scale})`;
      element.style.transition = "all 0.7s ease-in-out";
      element.style.zIndex = "10"; // Ensure shapes are visible
      element.dataset.shapeId = shape.id.toString();
    },
    [containerBounds]
  );

  // Animation logic
  const animateShapes = useCallback(() => {
    const shapeIds = Array.from(shapeRefs.current.keys());
    if (shapeIds.length === 0) return;

    const randomId = shapeIds[Math.floor(Math.random() * shapeIds.length)];
    const shapeRef = shapeRefs.current.get(randomId);

    if (!shapeRef) return;

    if (shapeRef.isVisible) {
      // Fade out
      updateShapeVisuals(randomId, { isVisible: false });
    } else {
      // Move to new position and fade in
      const newPos = getRandomPosition();
      updateShapeVisuals(randomId, {
        x: newPos.x,
        y: newPos.y,
        isVisible: true,
        scale: 0.8 + Math.random() * 0.4,
      });
    }
  }, [updateShapeVisuals, getRandomPosition]);

  // Handle shape click
  const handleShapeClick = useCallback(
    (id: number) => {
      const shapeRef = shapeRefs.current.get(id);
      if (!shapeRef) return;

      updateShapeVisuals(id, { isVisible: !shapeRef.isVisible });
    },
    [updateShapeVisuals]
  );

  // Reposition all shapes when container bounds change
  const repositionAllShapes = useCallback(() => {
    shapeRefs.current.forEach((shapeRef, id) => {
      const newPos = getRandomPosition();
      updateShapeVisuals(id, {
        x: newPos.x,
        y: newPos.y,
      });
    });
  }, [getRandomPosition, updateShapeVisuals]);

  // Set up ResizeObserver for container size changes
  useEffect(() => {
    if (!containerRef.current) return;

    // Initial measurement
    updateContainerBounds();

    // Set up resize observer
    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerBounds({ width, height });
      }
    });

    resizeObserverRef.current.observe(containerRef.current);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [updateContainerBounds]);

  // Reposition shapes when bounds change
  useEffect(() => {
    if (containerBounds.width > 0 && containerBounds.height > 0) {
      // Small delay to ensure DOM is ready
      setTimeout(repositionAllShapes, 100);
    }
  }, [containerBounds, repositionAllShapes]);

  // Animation loop management
  useEffect(() => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

    if (isAnimating) {
      animationRef.current = setInterval(animateShapes, 1200);
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isAnimating, animateShapes]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      shapeRefs.current.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      // REMOVED: style={{ zIndex: -1 }} - this was hiding the shapes!
    >
      {/* Always render shapes, don't wait for containerBounds */}
      {shapes.map((shape) => (
        <img
          key={shape.id}
          ref={(el) => initializeShapeRef(el, shape)}
          src={shape.imageSrc}
          alt={shape.alt}
          className="w-16 h-16 select-none cursor-pointer hover:scale-110 pointer-events-auto"
          onClick={() => handleShapeClick(shape.id)}
          draggable={false}
        />
      ))}
    </div>
  );
};

export default WireframeNineShapesBackground;
