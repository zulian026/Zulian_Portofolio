import { motion } from "framer-motion";

function Speciality() {
  // Define your expertise areas
  const expertiseAreas = [
    {
      icon: "M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
      title: "Web Development",
      description:
        "Creating responsive, accessible and high-performance websites with modern frameworks.",
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      icon: "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25",
      title: "UI/UX Design",
      description:
        "Crafting intuitive and beautiful user interfaces that enhance the user experience.",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    },
    {
      icon: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
      title: "Mobile Development",
      description:
        "Building cross-platform mobile applications with optimal performance and native feel.",
      skills: ["React Native", "Flutter", "iOS", "Android"],
    },
  ];

  return (
    <div
      id="speciality"
      style={{ fontFamily: "Clash Display, sans-serif" }}
      className="py-20 md:py-25 px-6 md:px-5 overflow-hidden"
    >
      {/* Section Title with Icon and Glow Effect - Left Aligned */}
      <motion.div
        className="flex items-center gap-2 mb-2 ml-4 md:ml-8"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
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
          className="h-0.5 bg-pink-400 flex-shrink-0 w-8 sm:w-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        <motion.h2
          className="text-xl md:text-xl text-pink-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            textShadow: "0 0 8px rgba(244, 114, 182, 0.6)",
          }}
        >
          Speciality
        </motion.h2>
      </motion.div>

      {/* Subtitle Text */}
      <motion.div
        className="ml-4 md:ml-8 mb-12"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-3xl md:text-5xl font-semibold text-white mb-2">
          <span className="text-purple-500">My</span> Expertise
        </h3>
        <p className="text-gray-300 max-w-2xl">
          Areas where I excel and deliver exceptional results through focused
          expertise and continuous learning.
        </p>
      </motion.div>

      {/* Expertise Cards - Updated to match Projects style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4 md:px-8">
        {expertiseAreas.map((area, index) => (
          <motion.div
            key={index}
            className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 shadow-lg hover:shadow-pink-400/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 * index }}
            whileHover={{ y: -5 }}
          >
            {/* Icon with pink background */}
            <div className="bg-pink-400/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-pink-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={area.icon}
                />
              </svg>
            </div>

            <h4 className="text-xl font-semibold text-white mb-2">
              {area.title}
            </h4>
            <p className="text-gray-300 mb-4">{area.description}</p>

            {/* Skills tags styled like Projects */}
            <div className="flex flex-wrap gap-2">
              {area.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-900 text-pink-400 text-xs px-3 py-1 rounded-full border border-pink-400/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Added CTA button to match Projects section */}
      <motion.div
        className="flex justify-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      ></motion.div>
    </div>
  );
}

export default Speciality;
