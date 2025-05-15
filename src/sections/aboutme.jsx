import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLocomotiveScroll } from "../providers/LocomotiveScrollProvider";

export default function AboutMeSection() {
  const [isMobile, setIsMobile] = useState(false);
  const { scroll, isReady } = useLocomotiveScroll();
  const navigate = useNavigate();

  const ActionButton = ({ children, primary, onClick }) => (
  <button
    onClick={onClick} // ⬅️ TAMBAHKAN INI
    className={`relative px-6 py-3 ${
      primary
        ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white group overflow-hidden"
        : "border border-pink-400 text-pink-400 hover:bg-pink-400/10"
    } 
      rounded-full transition-colors font-bold flex items-center justify-center gap-2`}
    data-scroll
    data-scroll-speed="0.05"
  >
    {primary && (
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
    )}
    <span
      className={primary ? "relative z-20 flex items-center justify-center gap-2" : ""}
    >
      {children}
    </span>
  </button>
);


  // Mobile detection with debounce
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();

    // Debounce resize event
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        checkDevice();
        // Update locomotive scroll after resize
        if (isReady && scroll) {
          scroll.update();
        }
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [isReady, scroll]);

  // Update locomotive scroll when component mounts
  useEffect(() => {
    if (isReady && scroll) {
      setTimeout(() => {
        scroll.update();
      }, 300);
    }
  }, [isReady, scroll]);

  // Memoize animation props to prevent recalculation on every render
  const animationProps = useMemo(() => {
    // Simplified animation configs
    return {
      section: isMobile
        ? {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5 },
          }
        : {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.8 },
          },

      heading: isMobile
        ? {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.3 },
          }
        : {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.4 },
          },

      line: isMobile
        ? {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.3 },
          }
        : {
            initial: { scaleX: 0 },
            animate: { scaleX: 1 },
            transition: { duration: 0.6, delay: 0.3 },
          },

      leftContent: isMobile
        ? {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5 },
          }
        : {
            initial: { opacity: 0, x: -30 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.7, delay: 0.6 },
          },

      rightContent: isMobile
        ? {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5 },
          }
        : {
            initial: { opacity: 0, x: 30 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.7, delay: 0.7 },
          },
    };
  }, [isMobile]);

  // Image path - use constant instead of state
  const imageUrl = "/images/zulian.jpg";

  return (
    <motion.section
      id="about"
      {...animationProps.section}
      className="relative flex flex-col items-center py-16 md:py-12 px-4 sm:px-6 md:px-16 lg:px-8 overflow-hidden min-h-screen font-sans"
    >
      {/* Background shapes - only render on desktop */}
      {!isMobile && (
        <>
          <BackgroundShape
            position="top-5 right-5 sm:top-10 sm:right-10 w-24 sm:w-32 h-24 sm:h-32"
            initialRotate={-20}
            color="#F472B6"
            delay={0.2}
            scrollSpeed={-0.5}
          />

          <BackgroundShape
            position="bottom-10 left-5 sm:bottom-16 sm:left-16 w-16 sm:w-24 h-16 sm:h-24"
            initialRotate={20}
            color="#F472B6"
            delay={0.5}
            scrollSpeed={0.8}
          />
        </>
      )}

      {/* Heading with simple animation */}
      <motion.div
        className="w-full max-w-5xl mx-auto relative z-10 mb-12 md:mb-16"
        data-scroll
        data-scroll-speed="0.3"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-4"
        >
          <motion.div
            className="h-0.5 bg-pink-400 flex-shrink-0 w-8 sm:w-12 md:w-16"
            {...animationProps.line}
            data-scroll
            data-scroll-speed="0.5"
          />
          <span
            className="text-pink-400 text-lg md:text-xl font-semibold"
            data-scroll
            data-scroll-speed="0.4"
          >
            About Me
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white leading-tight"
          {...animationProps.heading}
          data-scroll
          data-scroll-speed="0.2"
        >
          <span
            className="text-purple-500"
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="-0.1"
          >
            Passionate
          </span>{" "}
          about design & development
        </motion.h2>
      </motion.div>

      {/* Main Content - Photo Left, Text Right */}
      <motion.div
        className="w-full max-w-6xl mx-auto mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        data-scroll
        data-scroll-speed="0.1"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16">
          {/* Left side - Photo */}
          <motion.div
            className="w-full md:w-2/5 lg:w-1/2"
            {...animationProps.leftContent}
            data-scroll
            data-scroll-speed="0.3"
          >
            <div
              className="relative rounded-xl overflow-hidden shadow-xl"
              data-scroll
              data-scroll-class="animated-border"
            >
              <div
                className="absolute inset-0 bg-gradient-to-b from-pink-400/30 to-purple-500/30 mix-blend-overlay z-10"
                data-scroll
                data-scroll-speed="0.15"
              />
              <img
                src={imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
                loading="lazy"
                data-scroll
                data-scroll-speed="-0.1"
              />
            </div>
          </motion.div>

          {/* Right side - Text */}
          <motion.div
            className="w-full md:w-3/5 lg:w-1/2"
            {...animationProps.rightContent}
            data-scroll
            data-scroll-speed="0.4"
          >
            <h3
              className="text-2xl md:text-3xl font-bold text-pink-400 mb-4"
              data-scroll
              data-scroll-speed="0.45"
            >
              My Journey
            </h3>
            <p
              className="text-lg text-gray-300 mb-6 leading-relaxed"
              data-scroll
              data-scroll-speed="0.5"
              data-scroll-delay="0.1"
            >
              I'm passionate about creating beautiful, interactive web
              experiences that engage and delight users. With expertise in
              frontend development and animation, I bring creativity and
              technical skill to every project.
            </p>
            <p
              className="text-lg text-gray-300 mb-6 leading-relaxed"
              data-scroll
              data-scroll-speed="0.55"
              data-scroll-delay="0.2"
            >
              My approach combines aesthetic design principles with cutting-edge
              technologies to build responsive, accessible, and performant
              applications that leave a lasting impression.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 mt-8"
              data-scroll
              data-scroll-speed="0.6"
              data-scroll-delay="0.3"
            >
              <ActionButton onClick={() => navigate("/contact")}>
                Contact Me
              </ActionButton>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator - only on desktop */}
      {!isMobile && <ScrollIndicator />}
    </motion.section>
  );
}

// Extracted reusable components with Locomotive Scroll support
const BackgroundShape = ({
  position,
  initialRotate,
  color,
  delay,
  scrollSpeed,
}) => (
  <motion.div
    className={`absolute ${position} pointer-events-none opacity-20`}
    initial={{ opacity: 0, rotate: initialRotate }}
    animate={{ opacity: 0.2, rotate: 0 }}
    transition={{ duration: 1, delay }}
    data-scroll
    data-scroll-speed={scrollSpeed}
  >
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M39.9,-65.7C52.8,-59.6,65.2,-51.3,71.8,-39.8C78.4,-28.3,79.3,-14.1,78.1,-0.7C77,12.7,73.7,25.5,67.2,37.1C60.6,48.7,50.8,59.2,38.9,65.9C27,72.7,13.5,75.7,0.4,75.1C-12.8,74.5,-25.6,70.2,-37.3,63.4C-49.1,56.5,-59.9,47.1,-67.6,35.3C-75.3,23.5,-80,11.7,-81.7,-1.1C-83.5,-13.8,-82.4,-27.6,-75.8,-38.5C-69.2,-49.3,-57.1,-57.3,-44.2,-63.4C-31.3,-69.5,-15.6,-73.7,-1,-72.1C13.7,-70.6,27.1,-71.7,39.9,-65.7Z"
        transform="translate(100 100)"
      />
    </svg>
  </motion.div>
);

const ActionButton = ({ children, primary }) => (
  <button
    className={`relative px-6 py-3 ${
      primary
        ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white group overflow-hidden"
        : "border border-pink-400 text-pink-400 hover:bg-pink-400/10"
    } 
      rounded-full transition-colors font-bold flex items-center justify-center gap-2`}
    data-scroll
    data-scroll-speed="0.05"
  >
    {primary && (
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
    )}
    <span
      className={
        primary ? "relative z-20 flex items-center justify-center gap-2" : ""
      }
    >
      {children}
    </span>
  </button>
);

const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay: 1 }}
    data-scroll
    data-scroll-speed="1.5"
    data-scroll-position="bottom"
  >
    <p className="text-gray-400 text-xs md:text-sm">Continue exploring</p>
    <div className="w-4 h-8 md:w-5 md:h-10 border border-gray-500 rounded-full flex justify-center pt-2">
      <motion.div
        className="w-1 h-1 md:w-1.5 md:h-1.5 bg-pink-400 rounded-full"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </div>
  </motion.div>
);
