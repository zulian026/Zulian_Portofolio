import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

function Layout({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Check for mobile devices and reduced motion preferences
  useEffect(() => {
    // Check if device is mobile
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Check if user prefers reduced motion
    const checkReducedMotion = () => {
      setIsReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    // Initial checks
    checkDevice();
    checkReducedMotion();

    // Set up event listeners
    const debouncedHandleResize = debounce(checkDevice, 250);
    window.addEventListener("resize", debouncedHandleResize);

    // Listen for preference changes
    const motionMediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    motionMediaQuery.addEventListener("change", checkReducedMotion);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      motionMediaQuery.removeEventListener("change", checkReducedMotion);
    };
  }, []);

  // Debounce function for resize events
  function debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, ms);
    };
  }

  // Mouse tracking only on desktop
  const handleMouseMove = useCallback(
    (e) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    },
    [isMobile]
  );

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile, handleMouseMove]);

  // Animation variants based on device type and preferences
  const animationSettings = useMemo(() => {
    // No animations for reduced motion preference
    if (isReducedMotion) {
      return {
        orbs: { animate: {}, transition: {} },
        sweep: { animate: {}, transition: {} },
      };
    }

    // Simplified animations for mobile
    if (isMobile) {
      return {
        orbs: {
          animate: {
            x: [0, 5, -5, 0],
            y: [0, -5, 5, 0],
          },
          transition: {
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          },
        },
        sweep: {
          animate: {
            opacity: [0, 0.02, 0],
            x: [-windowDimensions.width, windowDimensions.width],
          },
          transition: {
            duration: 10,
            repeat: Infinity,
            repeatDelay: 20,
          },
        },
      };
    }

    // Full animations for desktop
    return {
      orb1: {
        animate: {
          x: [0, 10, -10, 0],
          y: [0, -10, 10, 0],
        },
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
      orb2: {
        animate: {
          x: [0, -20, 20, 0],
          y: [0, 20, -20, 0],
        },
        transition: {
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
      orb3: {
        animate: {
          x: [0, 40, 10, 0],
          y: [0, -10, 30, 0],
          opacity: [0.05, 0.08, 0.05],
        },
        transition: {
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
      highlight: {
        animate: {
          opacity: [0.2, 0.3, 0.2],
        },
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
      sweep: {
        animate: {
          opacity: [0, 0.03, 0],
          x: [-windowDimensions.width, windowDimensions.width],
        },
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatDelay: 15,
        },
      },
    };
  }, [isMobile, isReducedMotion, windowDimensions]);

  // Only render orbs if not on mobile or if on a powerful mobile device
  const renderOrbs = useMemo(() => {
    // Skip rendering orbs for reduced motion or simplify for mobile
    if (isReducedMotion) {
      return (
        <div className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-lime-300 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500 blur-3xl" />
        </div>
      );
    }

    if (isMobile) {
      // Render simplified orbs for mobile
      return (
        <div className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0">
          {/* Just one main orb for mobile */}
          <motion.div
            className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-indigo-500 blur-3xl"
            animate={animationSettings.orbs.animate}
            transition={animationSettings.orbs.transition}
          />
        </div>
      );
    }

    // Full orbs for desktop
    return (
      <div className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0">
        {/* Lime orb */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-lime-300 blur-3xl"
          animate={animationSettings.orb1.animate}
          transition={animationSettings.orb1.transition}
        />

        {/* Blue/purple orb */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"
          animate={animationSettings.orb2.animate}
          transition={animationSettings.orb2.transition}
        />

        {/* Smaller accent orb */}
        <motion.div
          className="absolute top-2/3 left-1/3 w-32 h-32 rounded-full bg-cyan-400 blur-3xl opacity-5"
          animate={animationSettings.orb3.animate}
          transition={animationSettings.orb3.transition}
        />

        {/* Bottom right highlight */}
        <motion.div
          className="absolute bottom-0 right-0 w-full md:w-1/2 h-64 bg-gradient-radial from-lime-900/10 to-transparent opacity-20"
          animate={animationSettings.highlight.animate}
          transition={animationSettings.highlight.transition}
        />
      </div>
    );
  }, [isMobile, isReducedMotion, animationSettings]);

  // Only render light sweep effect on desktop
  const renderLightSweep = useMemo(() => {
    if (isReducedMotion) return null;

    if (isMobile) return null; // Skip on mobile for performance

    return (
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 pointer-events-none z-0"
        animate={animationSettings.sweep.animate}
        transition={animationSettings.sweep.transition}
      />
    );
  }, [isMobile, isReducedMotion, animationSettings]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Gradient overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-0 pointer-events-none" />

      {/* Background gradient orbs - conditionally rendered */}
      {renderOrbs}

      {/* Subtle light sweep effect - only on desktop */}
      {renderLightSweep}

      {/* Subtle grid overlay - simplified for mobile */}
      <div
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(163, 230, 53, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(163, 230, 53, 0.1) 1px, transparent 1px)",
          backgroundSize: isMobile ? "60px 60px" : "40px 40px", // Larger grid on mobile = fewer lines to render
        }}
      />

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default Layout;