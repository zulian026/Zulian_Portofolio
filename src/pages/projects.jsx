import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
      imageUrl: "/images/p.jpg", // Using placeholder images
    },
    {
      id: 2,
      title: "Weather Dashboard",
      year: "2022",
      description:
        "Real-time weather application that displays current and forecasted weather data with interactive maps.",
      technologies: ["JavaScript", "OpenWeather API", "Leaflet"],
      imageUrl: "/images/p.jpg", // Using placeholder images
    },
    {
      id: 3,
      title: "Portfolio Website",
      year: "2024",
      description:
        "Personal portfolio built with modern web technologies featuring smooth animations and responsive design.",
      technologies: ["React", "Framer Motion", "Tailwind CSS"],
      imageUrl: "/images/p.jpg", // Using placeholder images
    },
    {
      id: 4,
      title: "Task Management App",
      year: "2023",
      description:
        "Collaborative task management application with real-time updates and team collaboration features.",
      technologies: ["React", "Firebase", "Material UI"],
      imageUrl: "/images/p.jpg", // Using placeholder images
    },
  ];

  // Staggered animation for projects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div
      data-scroll-section
      id="projects"
      style={{ fontFamily: "Clash Display, sans-serif" }}
      className="py-20 md:py-32 px-6 md:px-10 lg:px-16 overflow-hidden "
    >
      {/* Section Title with Icon and Glow Effect - Left Aligned */}
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
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        <motion.h2
          className="text-xl md:text-2xl text-pink-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            textShadow: "0 0 12px rgba(244, 114, 182, 0.8)",
          }}
        >
          Projects
        </motion.h2>
      </motion.div>

      {/* Subtitle Text */}
      <motion.div
        className="ml-4 md:ml-8 mb-16"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
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

      {/* Improved Grid Layout with Staggered Animation */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projectData.map((project, index) => (
          <GalleryProjectCard
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
      <motion.div
        className="flex justify-center mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.a
          href="/projects"
          className="group relative px-10 py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full overflow-hidden shadow-lg shadow-pink-500/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
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
        </motion.a>
      </motion.div>
    </div>
  );
}

// Enhanced Gallery-Style Project Card Component with Improved Image Sizing and Animations
function GalleryProjectCard({
  title,
  year,
  description,
  technologies,
  imageUrl,
  isRightColumn,
  index,
}) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport size for responsive adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Card animation variants
  const cardVariants = {
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
  };

  return (
    <motion.div
      className="group"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      // Add top margin to right column items to position them lower, but only on non-mobile
      style={isRightColumn && !isMobile ? { marginTop: "5rem" } : {}}
    >
      {/* Enhanced Image Container with Better Aspect Ratio and Hover Effects */}
      <div className="overflow-hidden rounded-2xl mb-6 aspect-[16/10] relative shadow-xl">
        {!imageError ? (
          <motion.div className="relative w-full h-full">
            {/* Overlay gradient with dynamic opacity */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-pink-400/30 to-purple-500/30 mix-blend-overlay z-10"
              animate={{
                opacity: isHovered ? 0.9 : 0.4,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Image with enhanced hover animation */}
            <motion.img
              src={imageUrl}
              alt={title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center"
              initial={{ scale: 1 }}
              animate={{
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{
                duration: 0.7,
                ease: [0.19, 1, 0.22, 1], // Custom ease curve for smooth animation
              }}
            />

            {/* Extra hover effect - light beam */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"
              style={{
                backgroundSize: "200% 200%",
                backgroundPosition: "100% 100%",
              }}
              animate={{
                opacity: isHovered ? [0, 0.1, 0] : 0,
                backgroundPosition: isHovered
                  ? ["100% 100%", "0% 0%", "100% 100%"]
                  : "100% 100%",
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ) : (
          <div className="w-full h-full flex items-center justify-center  text-pink-400">
            <span>Image not available</span>
          </div>
        )}

        {/* Call to action button with improved animation */}
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 flex items-center justify-center">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-8 py-3 rounded-full opacity-0 group-hover:opacity-100 shadow-lg shadow-pink-500/30"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
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

      {/* Project Info with enhanced layout */}
      <div className="flex justify-between items-start mb-3">
        <motion.h3
          className="text-2xl md:text-3xl font-medium text-white"
          initial={{ opacity: 0.9 }}
          animate={{
            opacity: isHovered ? 1 : 0.9,
            color: isHovered ? "#f472b6" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <span className="text-pink-400 text-lg font-medium">{year}</span>
      </div>

      {/* Technologies with improved badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <motion.span
            key={index}
            className=" text-pink-400 text-xs px-3 py-1 rounded-full border border-pink-400/30"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(219, 39, 119, 0.2)",
              borderColor: "rgba(244, 114, 182, 0.6)",
            }}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1 * index,
            }}
          >
            {tech}
          </motion.span>
        ))}
      </div>

      {/* Description with improved readability */}
      <motion.p
        className="text-gray-300 text-base leading-relaxed"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export default Projects;
