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
  isMobile: false,
  isLocomotiveEnabled: true,
});

// Hook to use the context
export const useLocomotiveScroll = () => {
  return useContext(LocomotiveScrollContext);
};

const LocomotiveScrollProvider = ({ children, options = {}, disableOnMobile = true }) => {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLocomotiveEnabled, setIsLocomotiveEnabled] = useState(true);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Determine if Locomotive should be enabled based on device and settings
      const shouldEnableLocomotive = !(mobile && disableOnMobile);
      setIsLocomotiveEnabled(shouldEnableLocomotive);
      
      // Add/remove classes to body
      if (mobile) {
        document.documentElement.classList.add('is-mobile');
        if (disableOnMobile) {
          document.documentElement.classList.add('native-scroll');
        } else {
          document.documentElement.classList.remove('native-scroll');
        }
      } else {
        document.documentElement.classList.remove('is-mobile', 'native-scroll');
      }
      
      return mobile;
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      document.documentElement.classList.remove('is-mobile', 'native-scroll');
    };
  }, [disableOnMobile]);

  // Initialize locomotive scroll
  useEffect(() => {
    let scrollInstance = null;
    
    // Only initialize Locomotive if it's enabled
    if (!isLocomotiveEnabled) {
      // Clean up any existing instance
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
      setIsReady(false);
      return;
    }
    
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
          inertia: 0.8,
          getDirection: true,
          ...options,
        });

        // Store reference
        scrollRef.current = scrollInstance;
        
        // Set ready state
        setIsReady(true);
        
        // Initial update with a delay to ensure content is loaded
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

    // Handle lazy-loaded images
    const handleImageLoad = () => {
      if (scrollRef.current) {
        scrollRef.current.update();
      }
    };

    // Add event listeners for image loading
    document.addEventListener('lazyloaded', handleImageLoad);
    window.addEventListener('load', handleImageLoad);

    return () => {
      // Cleanup
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
        setIsReady(false);
      }
      
      resizeObserver.disconnect();
      document.removeEventListener('lazyloaded', handleImageLoad);
      window.removeEventListener('load', handleImageLoad);
    };
  }, [options, isLocomotiveEnabled]);

  // Reset scroll position and update on route change
  useEffect(() => {
    // Reset scroll position on route change
    window.scrollTo(0, 0);
    
    // Reset locomotive scroll position if enabled
    if (isLocomotiveEnabled && scrollRef.current) {
      scrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
      
      // Wait for content to be rendered then update
      setTimeout(() => {
        scrollRef.current.update();
      }, 500);
    }
  }, [pathname, isLocomotiveEnabled]);

  return (
    <LocomotiveScrollContext.Provider
      value={{ 
        scroll: scrollRef.current, 
        isReady,
        isMobile,
        isLocomotiveEnabled
      }}
    >
      <div
        data-scroll-container={isLocomotiveEnabled ? true : undefined}
        ref={scrollContainerRef}
        className={`relative min-h-screen w-full ${isMobile ? 'mobile-scroll' : ''} ${!isLocomotiveEnabled ? 'native-scroll-container' : ''}`}
        aria-live="polite"
      >
        {children}
      </div>
    </LocomotiveScrollContext.Provider>
  );
};

export default LocomotiveScrollProvider;