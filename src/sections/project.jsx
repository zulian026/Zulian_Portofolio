import { motion } from "framer-motion";
import { useState, useEffect, useMemo, memo } from "react";
import { useNavigate, Link } from "react-router-dom";

function Projects() {
  // Sample project data with updated image paths
  const projectData = [
    {
      id: 1,
      title: "E-Commerce Platform",
      year: "2023",
      description:
        "A full-stack e-commerce application with product management, user authentication, and payment integration.",
      technologies: ["React", "Node.js", "MongoDB"],
      imageUrl: "/images/zulian1.jpg", // Using placeholder images
    },
    {
      id: 2,
      title: "Weather Dashboard",
      year: "2022",
      description:
        "Real-time weather application that displays current and forecasted weather data with interactive maps.",
      technologies: ["JavaScript", "OpenWeather API", "Leaflet"],
      imageUrl: "/images/zulian2.jpg", // Using placeholder images
    },
  ];

  // Memoize animation variants to prevent unnecessary recalculations
  const animations = useMemo(
    () => ({
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      },
      titleLine: {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, delay: 0.3 },
      },
      titleText: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, delay: 0.2 },
      },
      subtitle: {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, delay: 0.3 },
      },
      viewAllButton: {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, delay: 0.2 },
      },
    }),
    []
  );

  return (
    <div
      id="projects"
      className="py-20 md:py-32 px-6 md:px-10 lg:px-16 overflow-hidden font-sans"
    >
      {/* Section header */}
      <SectionHeader animations={animations} />

      {/* Projects grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20"
        variants={animations.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projectData.map((project, index) => (
          <MemoizedProjectCard
            key={project.id}
            title={project.title}
            year={project.year}
            description={project.description}
            technologies={project.technologies}
            imageUrl={project.imageUrl}
            isRightColumn={index % 2 === 1}
            index={index}
          />
        ))}
      </motion.div>

      {/* View All Projects Button */}
      <ViewAllButton animation={animations.viewAllButton} />
    </div>
  );
}

// Separated section header component
const SectionHeader = ({ animations }) => (
  <>
    {/* Section Title with Icon and Glow Effect */}
    <motion.div
      className="flex items-center gap-2 mb-2 ml-4 md:ml-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Glowing background effect */}
      <motion.div
        className="absolute blur-md opacity-0"
        whileInView={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.2, 1],
        }}
        viewport={{ once: true }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="h-0.5 bg-pink-400 flex-shrink-0 w-8 sm:w-16"
        {...animations.titleLine}
      />

      <motion.h2
        className="text-xl md:text-2xl text-pink-400"
        {...animations.titleText}
        style={{
          textShadow: "0 0 12px rgba(244, 114, 182, 0.8)",
        }}
      >
        Projects
      </motion.h2>
    </motion.div>

    {/* Subtitle Text */}
    <motion.div className="ml-4 md:ml-8 mb-16" {...animations.subtitle}>
      <h3 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          Selected
        </span>{" "}
        Projects
      </h3>
      <p className="text-gray-300 max-w-2xl text-lg">
        Here's a curated selection showcasing my expertise and the achieved
        results.
      </p>
    </motion.div>
  </>
);

// Separated View All button component
const ViewAllButton = ({ animation }) => {
  const navigate = useNavigate();

  return (
    <motion.div className="flex justify-center mt-20" {...animation}>
      <motion.div
        className="group relative px-10 py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full overflow-hidden shadow-lg shadow-pink-500/20 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/projects")}
      >
        <motion.span
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 z-10 opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-20 font-bold flex items-center justify-center gap-3 text-lg">
          View All Projects
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </motion.svg>
        </span>
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
          style={{
            boxShadow: "0 0 20px 5px rgba(244, 114, 182, 0.4)",
            zIndex: 5,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Enhanced Gallery-Style Project Card Component with performance optimizations
const ProjectCard = ({
  title,
  year,
  description,
  technologies,
  imageUrl,
  isRightColumn,
  index,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport size with debounced resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    // Debounce resize event
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoize card animations to prevent recalculations
  const cardAnimations = useMemo(
    () => ({
      card: {
        hidden: {
          opacity: 0,
          y: 50,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            ease: "easeOut",
          },
        },
      },
      overlay: {
        opacity: isHovered ? 0.9 : 0.4,
        transition: { duration: 0.3 },
      },
      image: {
        scale: isHovered ? 1.08 : 1,
        transition: {
          duration: 0.7,
          ease: [0.19, 1, 0.22, 1],
        },
      },
      lightBeam: {
        opacity: isHovered ? [0, 0.1, 0] : 0,
        backgroundPosition: isHovered
          ? ["100% 100%", "0% 0%", "100% 100%"]
          : "100% 100%",
        transition: {
          duration: 1.5,
          ease: "easeInOut",
        },
      },
      viewButton: {
        y: isHovered ? 0 : 20,
        opacity: isHovered ? 1 : 0,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
      title: {
        opacity: isHovered ? 1 : 0.9,
        color: isHovered ? "#f472b6" : "#ffffff",
        transition: { duration: 0.3 },
      },
      description: {
        opacity: isHovered ? 1 : 0.7,
        transition: { duration: 0.3 },
      },
    }),
    [isHovered]
  );

  // Memoize tech badge animations to prevent recreating on every render
  const getTechBadgeAnimation = (index) => ({
    initial: { opacity: 0, x: -5 },
    animate: { opacity: 1, x: 0 },
    transition: {
      duration: 0.3,
      delay: 0.1 * index,
    },
  });

  return (
    <motion.div
      className="group"
      variants={cardAnimations.card}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={isRightColumn && !isMobile ? { marginTop: "5rem" } : {}}
    >
      {/* Image Container */}
      <div className="overflow-hidden rounded-2xl mb-6 aspect-[16/10] relative shadow-xl">
        {!imageError ? (
          <motion.div className="relative w-full h-full">
            {/* Overlay gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-pink-400/30 to-purple-500/30 mix-blend-overlay z-10"
              animate={cardAnimations.overlay}
            />

            {/* Image */}
            <motion.img
              src={imageUrl}
              alt={title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1 }}
              animate={cardAnimations.image}
            />

            {/* Light beam effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"
              style={{
                backgroundSize: "200% 200%",
                backgroundPosition: "100% 100%",
              }}
              animate={cardAnimations.lightBeam}
            />
          </motion.div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-pink-400">
            <span>Image not available</span>
          </div>
        )}

        {/* Call to action button */}
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 flex items-center justify-center">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-8 py-3 rounded-full opacity-0 group-hover:opacity-100 shadow-lg shadow-pink-500/30"
            initial={{ y: 20, opacity: 0 }}
            animate={cardAnimations.viewButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              View Project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Project Info */}
      <div className="flex justify-between items-start mb-3">
        <motion.h3
          className="text-2xl md:text-3xl font-medium text-white"
          initial={{ opacity: 0.9 }}
          animate={cardAnimations.title}
        >
          {title}
        </motion.h3>
        <span className="text-pink-400 text-lg font-medium">{year}</span>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, idx) => (
          <motion.span
            key={idx}
            className="text-pink-400 text-xs px-3 py-1 rounded-full border border-pink-400/30"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(219, 39, 119, 0.2)",
              borderColor: "rgba(244, 114, 182, 0.6)",
            }}
            {...getTechBadgeAnimation(idx)}
          >
            {tech}
          </motion.span>
        ))}
      </div>

      {/* Description */}
      <motion.p
        className="text-gray-300 text-base leading-relaxed"
        initial={{ opacity: 0.7 }}
        animate={cardAnimations.description}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

// Memoize the project card to prevent unnecessary re-renders
const MemoizedProjectCard = memo(ProjectCard, (prevProps, nextProps) => {
  // Custom comparison logic to determine if component should update
  return (
    prevProps.title === nextProps.title &&
    prevProps.imageUrl === nextProps.imageUrl &&
    prevProps.isRightColumn === nextProps.isRightColumn
  );
});

export default Projects;
