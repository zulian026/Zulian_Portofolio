import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simplified debounce function
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
  // State management
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize on component mount
  useEffect(() => {
    setIsLoaded(true);
    
    // Check if device is mobile
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
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

  // Very simple animation settings
  const animationSettings = useMemo(() => {
    if (isReducedMotion) {
      return { animate: {} };
    }

    return {
      accent: {
        animate: {
          opacity: [0.15, 0.25, 0.15]
        },
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }
      }
    };
  }, [isReducedMotion]);

  // Entry animation for main content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-gray-950 to-black text-white overflow-hidden">
      {/* Simple corner accent */}
      {isLoaded && !isReducedMotion ? (
        <motion.div 
          className="fixed top-0 right-0 w-1/3 h-64 bg-indigo-500/10 rounded-bl-full"
          animate={animationSettings.accent.animate}
          transition={animationSettings.accent.transition}
        />
      ) : (
        <div className="fixed top-0 right-0 w-1/3 h-64 bg-pink-500/10 rounded-bl-full" />
      )}
      
     
      
   

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