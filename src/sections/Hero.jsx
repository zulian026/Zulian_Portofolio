import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Optimized rotating text component with memoization
const RotatingText = memo(({ texts, rotationInterval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts, rotationInterval]);

  return (
    <div className="px-3 py-1 md:px-4 bg-pink-400 text-black overflow-hidden rounded-lg font-bold">
      <motion.div
        key={currentIndex}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
      >
        {texts[currentIndex]}
      </motion.div>
      <motion.div
        className="absolute -inset-1 bg-pink-400/30 rounded-lg blur-sm z-[-1]"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.98, 1.01, 0.98],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </div>
  );
});

// Social media link component for better code organization
const SocialLink = memo(({ name, link, index }) => (
  <motion.a
    href={link}
    className="flex items-center gap-1 hover:text-pink-400 transition-colors group relative"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.0 + index * 0.1 }}
    whileHover={{ scale: 1.05 }}
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="text-xs sm:text-sm md:text-base">{name}</span>
    <motion.span
      className="text-gray-500 group-hover:text-pink-400 transition-colors"
      animate={{ y: [0, -2, 0] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        delay: index * 0.2,
      }}
    >
      ↗
    </motion.span>
    <motion.span
      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400"
      whileHover={{ width: "100%" }}
      transition={{ duration: 0.3 }}
    />
  </motion.a>
));

function Hero() {
  const description =
    "Passionate about crafting thoughtful, user-centered web experiences that both inspire and perform.";
  const descriptionArray = description.split(" ");
  const navigate = useNavigate();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Performance optimization for scroll listener using passive events
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    {
      name: "LINKEDIN",
      link: "https://linkedin.com/in/zulian-alhisyam-175414363",
    },
    {
      name: "GITHUB",
      link: "https://github.com/zulian026",
    },
    {
      name: "INSTAGRAM",
      link: "https://www.instagram.com/zyanx_04",
    },
    {
      name: "GMAIL",
      link: "mailto:zulianalhisyam@gmail.com",
    },
  ];

  return (
    <motion.section
      data-scroll-section
      style={{ fontFamily: "Clash Display, sans-serif" }}
      className="relative flex flex-col items-center justify-between pt-12 pb-16 md:py-16 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden min-h-[90vh] md:min-h-[85vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Scroll indicator with conditional rendering for performance */}
      {!hasScrolled && (
        <motion.div
          className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p className="text-gray-400 text-xs md:text-sm">
            Scroll to explore
          </motion.p>
          <motion.div className="w-4 h-8 md:w-5 md:h-10 border border-gray-500 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-1 md:w-1.5 md:h-1.5 bg-pink-400 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}

      <div className="w-full max-w-5xl mx-auto relative z-10 mt-6 md:mt-0">
        {/* Greeting with waving hand */}
        <motion.p
          className="text-pink-400 text-lg md:text-xl font-semibold mb-4 md:mb-6 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6"
            animate={{
              rotate: [0, 15, -15, 15, -15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"
            />
          </motion.svg>
          Hey! It's me{" "}
          <motion.span
            className="text-white font-bold relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Zulian
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-400 origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.span>
        </motion.p>

        {/* Optimized headline with reduced animations for better performance */}
        <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 md:mb-8 text-white leading-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-purple-500">Blending creativity</span> with{" "}
            <span className="text-purple-500">function</span> to craft engaging
            digital stories
          </motion.div>
        </motion.h1>

        {/* Description with line - responsive improvements */}
        <div className="flex items-start sm:items-center mb-10 md:mb-12 gap-3 md:gap-4">
          <motion.div
            className="h-0.5 bg-pink-400 flex-shrink-0 w-8 sm:w-12 md:w-24 mt-3 sm:mt-0"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          />
          <motion.p
            className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {descriptionArray.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1 + index * 0.03 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* CTA and Social Media - mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 md:gap-8"
        >
          {/* Social Media Links - optimized with component */}
          <div className="flex flex-wrap gap-x-4 gap-y-3 md:gap-x-5 text-gray-300">
            {socialLinks.map((social, index) => (
              <SocialLink
                key={social.name}
                name={social.name}
                link={social.link}
                index={index}
              />
            ))}
          </div>

          {/* CTA Button - adjusted for mobile */}
          <div className="relative w-full sm:w-auto mt-2 sm:mt-0">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
            <motion.button
              onClick={() => navigate("/about")}
              className="relative w-full sm:w-auto bg-white text-gray-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-bold flex items-center justify-center sm:justify-start gap-2 hover:bg-pink-400 transition-colors z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Know me better
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </motion.svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative shapes with reduced opacity for better performance */}
      <motion.div
        className="absolute top-5 right-5 sm:top-10 sm:right-10 w-24 sm:w-32 h-24 sm:h-32 pointer-events-none opacity-10"
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 0.1, rotate: 0 }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#F472B6"
            d="M39.9,-65.7C52.8,-59.6,65.2,-51.3,71.8,-39.8C78.4,-28.3,79.3,-14.1,78.1,-0.7C77,12.7,73.7,25.5,67.2,37.1C60.6,48.7,50.8,59.2,38.9,65.9C27,72.7,13.5,75.7,0.4,75.1C-12.8,74.5,-25.6,70.2,-37.3,63.4C-49.1,56.5,-59.9,47.1,-67.6,35.3C-75.3,23.5,-80,11.7,-81.7,-1.1C-83.5,-13.8,-82.4,-27.6,-75.8,-38.5C-69.2,-49.3,-57.1,-57.3,-44.2,-63.4C-31.3,-69.5,-15.6,-73.7,-1,-72.1C13.7,-70.6,27.1,-71.7,39.9,-65.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-5 sm:bottom-16 sm:left-16 w-16 sm:w-24 h-16 sm:h-24 pointer-events-none opacity-10"
        initial={{ opacity: 0, rotate: 20 }}
        animate={{ opacity: 0.1, rotate: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#F472B6"
            d="M44.3,-76.5C58.3,-69.8,71.3,-59.4,79.4,-45.9C87.6,-32.4,90.9,-16.2,89.3,-0.9C87.8,14.4,81.3,28.8,72.4,41.2C63.4,53.7,51.9,64.1,38.8,71.9C25.6,79.7,10.8,84.9,-3.7,90.3C-18.1,95.8,-36.2,101.5,-51.3,97.6C-66.3,93.7,-78.3,80.3,-84.3,65C-90.2,49.6,-90.1,32.4,-89.8,16.1C-89.6,-0.1,-89.2,-15.3,-84.3,-28.7C-79.3,-42.1,-69.8,-53.6,-57.7,-61.6C-45.5,-69.7,-30.7,-74.2,-15.9,-75.3C-1.1,-76.4,14.7,-74,28.6,-74.5C42.5,-75,56.6,-78.3,64.2,-73.9C71.9,-69.4,73.2,-57.1,71.6,-45.4C70,-33.7,65.6,-22.5,67.3,-10.9C69,-0.7,76.8,8,75.9,15.4C75,22.8,65.4,28.9,56.8,34.4C48.3,39.9,40.9,44.9,32.9,50.8C24.9,56.8,16.3,63.8,5.7,67C-4.9,70.2,-17.4,69.6,-28.9,66.6C-40.3,63.6,-50.6,58.1,-58.3,50.1C-66,42.1,-71.1,31.6,-73.7,20.5C-76.3,9.5,-76.5,-2.1,-73.7,-12.6C-70.9,-23.1,-65.1,-32.5,-57.4,-39.9C-49.8,-47.3,-40.2,-52.7,-30.3,-60.8C-20.3,-68.9,-10.1,-79.7,1.9,-82.8C14,-85.9,28,-81.4,44.3,-76.5Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>
    </motion.section>
  );
}

export default memo(Hero);
