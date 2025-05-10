import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utility functions moved outside component for better performance
const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, ms);
  };
};

export default function Layout({ children }) {
  // Refs for performance optimization
  const mousePosRef = useRef({ x: 0, y: 0 });
  
  // State management
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Initialize on component mount
  useEffect(() => {
    setIsLoaded(true);
    
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

    // Set up event listeners with proper debounce
    const debouncedHandleResize = debounce(checkDevice, 250);
    window.addEventListener("resize", debouncedHandleResize);

    // Listen for preference changes
    const motionMediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    
    // Use correct event listener based on browser support
    if (motionMediaQuery.addEventListener) {
      motionMediaQuery.addEventListener("change", checkReducedMotion);
    } else {
      // Fallback for older browsers
      motionMediaQuery.addListener(checkReducedMotion);
    }

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      
      if (motionMediaQuery.removeEventListener) {
        motionMediaQuery.removeEventListener("change", checkReducedMotion);
      } else {
        // Fallback cleanup for older browsers
        motionMediaQuery.removeListener(checkReducedMotion);
      }
    };
  }, []);

  // Optimized mouse tracking using RAF and refs
  const handleMouseMove = useCallback((e) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
    
    // Use requestAnimationFrame for smoother performance
    requestAnimationFrame(() => {
      setMousePosition(mousePosRef.current);
    });
  }, []);

  useEffect(() => {
    if (!isMobile && !isReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile, isReducedMotion, handleMouseMove]);

  // Enhanced animation variants with more visual interest
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
            x: [0, 8, -8, 0],
            y: [0, -8, 8, 0],
            scale: [1, 1.05, 0.95, 1],
          },
          transition: {
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
        },
        sweep: {
          animate: {
            opacity: [0, 0.03, 0],
            x: [-windowDimensions.width, windowDimensions.width],
          },
          transition: {
            duration: 12,
            repeat: Infinity,
            repeatDelay: 20,
            ease: "easeOut",
          },
        },
      };
    }

    // Enhanced animations for desktop
    return {
      orb1: {
        animate: {
          x: [0, 15, -15, 0],
          y: [0, -15, 15, 0],
          scale: [1, 1.1, 0.95, 1],
        },
        transition: {
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      },
      orb2: {
        animate: {
          x: [0, -25, 25, 0],
          y: [0, 25, -25, 0],
          scale: [1, 0.9, 1.05, 1],
        },
        transition: {
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      },
      orb3: {
        animate: {
          x: [0, 40, 10, 0],
          y: [0, -10, 30, 0],
          opacity: [0.05, 0.12, 0.05],
          scale: [1, 1.2, 0.9, 1],
        },
        transition: {
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      },
      orb4: {
        animate: {
          x: [0, -30, 15, 0],
          y: [0, 15, -40, 0],
          opacity: [0.06, 0.1, 0.06],
        },
        transition: {
          duration: 23,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      },
      highlight: {
        animate: {
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.05, 1],
        },
        transition: {
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      },
      sweep: {
        animate: {
          opacity: [0, 0.04, 0],
          x: [-windowDimensions.width, windowDimensions.width],
        },
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatDelay: 15,
          ease: "easeOut",
        },
      },
      mouseCursor: {
        x: mousePosition.x,
        y: mousePosition.y,
        transition: { 
          type: "spring", 
          damping: 15, 
          stiffness: 150,
          mass: 0.8
        }
      }
    };
  }, [isMobile, isReducedMotion, windowDimensions, mousePosition]);

  // Render orbs with improved visual effects
  const renderOrbs = useMemo(() => {
    if (!isLoaded) return null;
    
    // Skip rendering orbs for reduced motion
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
        <div className="fixed top-0 left-0 w-full h-full opacity-25 pointer-events-none z-0">
          <motion.div
            className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-indigo-500 blur-3xl"
            animate={animationSettings.orbs.animate}
            transition={animationSettings.orbs.transition}
          />
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-lime-300 blur-3xl opacity-40" />
        </div>
      );
    }

    // Enhanced orbs for desktop
    return (
      <div className="fixed top-0 left-0 w-full h-full opacity-25 pointer-events-none z-0">
        {/* Primary lime orb */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-radial from-lime-300 to-lime-500/70 blur-3xl"
          animate={animationSettings.orb1.animate}
          transition={animationSettings.orb1.transition}
        />

        {/* Primary indigo orb */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-radial from-indigo-400 to-indigo-600 blur-3xl"
          animate={animationSettings.orb2.animate}
          transition={animationSettings.orb2.transition}
        />

        {/* Cyan accent orb */}
        <motion.div
          className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full bg-gradient-radial from-cyan-300 to-cyan-500 blur-3xl opacity-10"
          animate={animationSettings.orb3.animate}
          transition={animationSettings.orb3.transition}
        />

        {/* Additional purple orb */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-gradient-radial from-purple-400 to-purple-600 blur-3xl opacity-10"
          animate={animationSettings.orb4.animate}
          transition={animationSettings.orb4.transition}
        />

        {/* Bottom highlight effect */}
        <motion.div
          className="absolute bottom-0 right-0 w-full md:w-1/2 h-64 bg-gradient-radial from-lime-900/20 to-transparent opacity-30"
          animate={animationSettings.highlight.animate}
          transition={animationSettings.highlight.transition}
        />
        
        {/* Top accent gradient */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-indigo-900/30 to-transparent opacity-20" />
      </div>
    );
  }, [isMobile, isReducedMotion, animationSettings, isLoaded]);

  // Enhanced light effects
  const renderLightEffects = useMemo(() => {
    if (!isLoaded || isReducedMotion) return null;

    return (
      <>
        {/* Light sweep effect - only on desktop */}
        {!isMobile && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 pointer-events-none z-0"
            animate={animationSettings.sweep.animate}
            transition={animationSettings.sweep.transition}
          />
        )}
        
        {/* Subtle mouse follower - only on desktop and without reduced motion */}
        {!isMobile && !isReducedMotion && (
          <motion.div 
            className="fixed w-96 h-96 rounded-full bg-gradient-radial from-cyan-300/5 to-transparent pointer-events-none z-0"
            animate={animationSettings.mouseCursor}
          />
        )}
      </>
    );
  }, [isMobile, isReducedMotion, animationSettings, isLoaded]);

  // Responsive grid overlay with dynamic pattern
  const gridOverlay = useMemo(() => {
    if (!isLoaded) return null;
    
    return (
      <div
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(163, 230, 53, 0.08) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(163, 230, 53, 0.08) 1px, transparent 1px),
            linear-gradient(rgba(99, 102, 241, 0.05) 2px, transparent 2px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.05) 2px, transparent 2px)
          `,
          backgroundSize: isMobile 
            ? '60px 60px, 60px 60px, 180px 180px, 180px 180px' 
            : '40px 40px, 40px 40px, 200px 200px, 200px 200px',
          opacity: 0.08
        }}
      />
    );
  }, [isMobile, isLoaded]);

  // Entry animation for main content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Base dark overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-0 pointer-events-none" />

      {/* Background visual elements */}
      {renderOrbs}
      {renderLightEffects}
      {gridOverlay}

      {/* Noise texture overlay for depth */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />

      {/* Main content with entry animation */}
      <AnimatePresence mode="wait">
        <motion.div 
          className="relative z-10"
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}