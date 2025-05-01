import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Education from "../sections/education";

export default function About() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Track scrolling like in Hero component
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Split text for word-by-word animation like in Hero
  const aboutDescription =
    "I'm passionate about creating beautiful, interactive web experiences that engage and delight users. With expertise in frontend development and animation, I bring creativity and technical skill to every project.";
  const aboutDescriptionArray = aboutDescription.split(" ");

  // Photo animation variants - matching Hero animation styles
  const photoVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.1,
        type: "spring",
        stiffness: 50,
      },
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      data-scroll-section
      style={{ fontFamily: "Clash Display, sans-serif" }}
      className="relative flex flex-col items-center pt-12 pb-16 md:py-16 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Scroll indicator - same as Hero */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
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

      {/* Background shapes - animated like in Hero */}
      <motion.div
        className="absolute top-5 right-5 sm:top-10 sm:right-10 w-24 sm:w-32 h-24 sm:h-32 pointer-events-none opacity-20"
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 0.2, rotate: 0 }}
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
        className="absolute bottom-10 left-5 sm:bottom-16 sm:left-16 w-16 sm:w-24 h-16 sm:h-24 pointer-events-none opacity-20"
        initial={{ opacity: 0, rotate: 20 }}
        animate={{ opacity: 0.2, rotate: 0 }}
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

      {/* Heading with animation - similar to Hero's title animation */}
      <div className="w-full max-w-5xl mx-auto relative z-10 mt-6 md:mt-0">
        {/* Section indicator with hand wave like Hero's greeting */}
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
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </motion.svg>
          About Me{" "}
          <motion.span
            className="text-white font-bold relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Journey
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

        {/* Headline with staggered animation like in Hero */}
        <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-8 text-white leading-tight">
          <motion.div className="overflow-hidden">
            <motion.span
              className="text-purple-500 inline-block"
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                type: "spring",
                stiffness: 50,
              }}
            >
              Passionate
            </motion.span>
          </motion.div>
          <motion.div className="overflow-hidden">
            <motion.span
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 50,
              }}
              className="inline-block"
            >
              about <span className="text-purple-500">design</span> &
            </motion.span>
          </motion.div>
          <motion.div className="overflow-hidden">
            <motion.span
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 50,
              }}
              className="inline-block"
            >
              development
            </motion.span>
          </motion.div>
        </motion.h1>

        {/* Description with line - similar to Hero */}
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
            {aboutDescriptionArray.map((word, index) => (
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
      </div>

      {/* Main Content - Photo Left, Text Right */}
      <motion.div
        className="w-full max-w-6xl mx-auto mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16">
          {/* Left side - Photo Grid with Framer Motion - matched with Hero animation style */}
          <motion.div className="w-full md:w-2/5 lg:w-1/2 grid grid-cols-12 gap-3 md:gap-4">
            {/* Main Large Photo - Spans 8 columns */}
            <motion.div
              className="col-span-8 row-span-2 rounded-xl overflow-hidden shadow-xl relative"
              custom={0}
              variants={photoVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ height: "320px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-pink-400/30 to-purple-500/30 mix-blend-overlay z-10" />
              <img
                src="/images/zulian3.jpg"
                alt="Profile 1"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Top Right Photo */}
            <motion.div
              className="col-span-4 rounded-xl overflow-hidden shadow-xl relative"
              custom={1}
              variants={photoVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ height: "150px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-pink-400/30 to-purple-500/30 mix-blend-overlay z-10" />
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
              <img
                src="/images/zulian1.jpg"
                alt="Profile 2"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Bottom Right Photo */}
            <motion.div
              className="col-span-4 rounded-xl overflow-hidden shadow-xl relative"
              custom={2}
              variants={photoVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ height: "150px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-pink-400/30 to-purple-500/30 mix-blend-overlay z-10" />
              <img
                src="/images/zulian2.jpg"
                alt="Profile 3"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Bottom Full Width Photo */}
            <motion.div
              className="col-span-12 rounded-xl overflow-hidden shadow-xl relative mt-3"
              custom={3}
              variants={photoVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ height: "180px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-pink-400/30 to-purple-500/30 mix-blend-overlay z-10" />
              <img
                src="/images/zulian.jpg"
                alt="Profile 4"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </motion.div>

          {/* Right side - Text with word-by-word animation like in Hero */}
          <motion.div className="w-full md:w-3/5 lg:w-1/2">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-pink-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.7 }}
            >
              My Journey
            </motion.h3>

            <motion.p className="text-lg text-gray-300 mb-6 leading-relaxed">
              {/* First paragraph with word animation like Hero */}
              {aboutDescriptionArray.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.8 + index * 0.03 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.p
              className="text-lg text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.2 }}
            >
              My approach combines aesthetic design principles with cutting-edge
              technologies to build responsive, accessible, and performant
              applications that leave a lasting impression.
            </motion.p>

            {/* CTA and buttons - similar style to Hero's CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.4 }}
            >
              {/* Primary CTA button - matched with Hero style */}
              <div className="relative w-full sm:w-auto">
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
                  className="relative w-full sm:w-auto bg-white text-gray-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-bold flex items-center justify-center sm:justify-start gap-2 hover:bg-pink-400 transition-colors z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  My Portfolio
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

              {/* Secondary button */}
              <motion.button
                className="px-6 py-3 border border-pink-400 text-pink-400 rounded-md hover:bg-pink-400/10 transition-colors font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Education component */}
      <Education />
    </motion.section>
  );
}
