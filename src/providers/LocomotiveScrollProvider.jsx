import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import "locomotive-scroll/dist/locomotive-scroll.css";

// Create context
const LocomotiveScrollContext = createContext({
  scroll: null,
  isReady: false,
});

// Hook to use the context
export const useLocomotiveScroll = () => {
  return useContext(LocomotiveScrollContext);
};

const LocomotiveScrollProvider = ({ children, options = {} }) => {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize locomotive scroll
  useEffect(() => {
    let scrollInstance = null;
    
    // Import locomotive scroll with dynamic import
    const initScroll = async () => {
      try {
        const LocomotiveScrollModule = await import("locomotive-scroll");
        const LocomotiveScroll = LocomotiveScrollModule.default;

        // Destroy existing instance if it exists
        if (scrollRef.current) {
          scrollRef.current.destroy();
        }

        // Create new locomotive scroll instance
        scrollInstance = new LocomotiveScroll({
          el: scrollContainerRef.current,
          smooth: true,
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
          inertia: 0.8,
          getDirection: true, // Enables direction detection
          ...options,
        });

        // Store reference
        scrollRef.current = scrollInstance;
        
        // Set ready state
        setIsReady(true);
        
        // Initial update
        setTimeout(() => {
          scrollInstance.update();
        }, 500);
      } catch (error) {
        console.error("Failed to initialize Locomotive Scroll:", error);
      }
    };

    initScroll();

    // Observer to update scroll when images and other resources load
    const resizeObserver = new ResizeObserver(() => {
      if (scrollRef.current) {
        scrollRef.current.update();
      }
    });

    // Observe the container
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }

    return () => {
      // Cleanup
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
        setIsReady(false);
      }
      
      resizeObserver.disconnect();
    };
  }, [options]);

  // Reset scroll position and update on route change
  useEffect(() => {
    // Reset scroll position on route change
    window.scrollTo(0, 0);
    
    // Reset locomotive scroll position
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
      
      // Wait for content to be rendered then update
      setTimeout(() => {
        scrollRef.current.update();
      }, 500);
    }
  }, [pathname]);

  return (
    <LocomotiveScrollContext.Provider
      value={{ scroll: scrollRef.current, isReady }}
    >
      <div
        data-scroll-container
        ref={scrollContainerRef}
        className="relative min-h-screen w-full"
        aria-live="polite" // For accessibility
      >
        {children}
      </div>
    </LocomotiveScrollContext.Provider>
  );
};

export default LocomotiveScrollProvider;