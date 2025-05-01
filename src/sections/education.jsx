import { useState } from "react";

export default function Education() {
  // Education timeline data
  const educationData = [
    {
      id: 1,
      years: "2022 - 2025",
      institution: "Institut Teknologi Padang",
      degree: "Bachelor of Computer Science",
      description:
        "Focused on User Interface Design and Front-end Development. Graduated with honors and completed a thesis on interactive web animations.",
    },
    {
      id: 2,
      years: "2019 - 2022",
      institution: "SMA Negeri 2 Sungai Penuh",
      degree: "High School Diploma (Social Sciences Major)",
      description:
        "Studied social sciences with active involvement in multimedia and design-related extracurricular activities. Received an award for creative achievements in digital media.",
    },
    {
      id: 3,
      years: "2016 - 2019",
      institution: "SMP Negeri 16 Kerinci",
      degree: "Junior High School Certificate",
      description:
        "Introduced to basic computing and digital creativity. Participated in school tech projects and developed an early interest in web technologies.",
    },
  ];

  // State for currently active education item
  const [activeItem, setActiveItem] = useState(1);

  return (
    <section
      style={{ fontFamily: "Clash Display, sans-serif" }}
      className="relative flex flex-col items-center py-16 md:py-32 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden "
    >
      {/* Background elements */}
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" />

      {/* Section heading */}
      <div className="w-full max-w-5xl mx-auto relative z-10 mb-16">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-0.5 bg-pink-400 flex-shrink-0 w-8 sm:w-12 md:w-16" />
          <span className="text-pink-400 text-lg md:text-xl font-semibold">
            Education Journey
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white leading-tight">
          My <span className="text-purple-500">Learning</span> Path
        </h2>
      </div>

      {/* Timeline container with grid layout */}
      <div className="w-full max-w-6xl mx-auto relative">
        {/* Main Timeline Line (Center vertical) */}
        <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-400 via-purple-500 to-pink-400 transform sm:-translate-x-px" />

        {/* Timeline items in grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-y-16 relative z-10">
          {educationData.map((item) => (
            <div
              key={item.id}
              className={`relative ${
                item.id % 2 === 1
                  ? "sm:pr-12 sm:text-right" // Odd items (left side)
                  : "sm:pl-12 sm:col-start-2" // Even items (right side)
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-8 sm:left-0 ${
                  item.id % 2 === 1 ? "sm:right-0 sm:left-auto" : "sm:left-0"
                } top-3 w-4 h-4 rounded-full border-2 border-pink-400 ${
                  activeItem === item.id ? "bg-pink-400" : "bg-gray-900"
                }`}
                onMouseEnter={() => setActiveItem(item.id)}
                style={{
                  boxShadow:
                    activeItem === item.id ? "0 0 15px #F472B6" : "none",
                  transition: "all 0.3s ease",
                  transform:
                    item.id % 2 === 1 ? "translateX(50%)" : "translateX(-50%)",
                }}
              />

              {/* Content */}
              <div
                className={`pl-16 sm:pl-0 sm:pr-0 transition-all duration-500 ${
                  activeItem === item.id
                    ? "opacity-100 scale-100"
                    : "opacity-70 scale-95"
                }`}
                onMouseEnter={() => setActiveItem(item.id)}
              >
                <div
                  className="p-6 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:border-pink-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-pink-400/10"
                  style={{
                    boxShadow:
                      activeItem === item.id
                        ? "0 8px 30px rgba(244, 114, 182, 0.1)"
                        : "none",
                  }}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-pink-400 text-sm font-medium mb-4">
                    {item.years}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {item.institution}
                  </h3>
                  <h4 className="text-lg text-pink-400 font-semibold mb-3">
                    {item.degree}
                  </h4>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills gained section */}
      <div className="w-full max-w-5xl mx-auto mt-20 relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
          Skills Gained
        </h3>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {[
            "UI/UX Design",
            "React",
            "JavaScript",
            "CSS/SCSS",
            "Animation",
            "Responsive Design",
            "User Research",
            "Figma",
            "Next.js",
            "HTML5",
            "Git",
            "Design Systems",
          ].map((skill) => (
            <div
              key={skill}
              className="px-4 py-2 rounded-full bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:border-pink-400/70 text-gray-300 hover:text-pink-400 transition-all duration-300"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="w-full max-w-md mx-auto mt-20 flex justify-center">
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
      </div>
    </section>
  );
}
