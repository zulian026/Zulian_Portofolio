import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../sections/Hero";
import AboutMeSection from "../sections/aboutme";
import { useLocomotiveScroll } from "../providers/LocomotiveScrollProvider";
import Projects from "../sections/project";
import Speciality from "../sections/speciality";

function Home() {
  const { scroll, isReady } = useLocomotiveScroll();
  const homeRef = useRef(null);
  const [sectionsLoaded, setSectionsLoaded] = useState({
    hero: false,
    about: false,
    projects: false,
    speciality: false
  });

  // Update locomotive scroll after components are rendered
  useEffect(() => {
    if (isReady && scroll) {
      // Update the scroll instance to recognize new elements
      scroll.update();

      // Add scroll event listener for additional animations
      scroll.on("scroll", (args) => {
        // You can add additional animations based on scroll position here
        // console.log('Scroll position:', args.scroll.y);
      });

      // Cleanup event listener when component unmounts
      return () => {
        scroll.off("scroll");
      };
    }
  }, [scroll, isReady]);

  // Update scroll instance when all sections are loaded
  useEffect(() => {
    if (isReady && scroll && Object.values(sectionsLoaded).every(Boolean)) {
      const timeout = setTimeout(() => {
        scroll.update();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isReady, scroll, sectionsLoaded]);

  // Mark sections as loaded
  const handleSectionLoad = (section) => {
    setSectionsLoaded(prev => ({ ...prev, [section]: true }));
  };

  // Add resize observer to update scroll when main content resizes
  useEffect(() => {
    if (!scroll || !homeRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      // Debounce the update to prevent performance issues
      const timeout = setTimeout(() => {
        if (scroll) {
          scroll.update();
        }
      }, 300);

      return () => clearTimeout(timeout);
    });

    resizeObserver.observe(homeRef.current);

    return () => {
      if (homeRef.current) {
        resizeObserver.unobserve(homeRef.current);
      }
    };
  }, [scroll]);

  return (
    <motion.main
      ref={homeRef}
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Add spacer to ensure proper spacing between sections */}
      <div data-scroll-section className="relative">
        <Hero onLoad={() => handleSectionLoad('hero')} />
      </div>
      
      {/* About Me Section with explicit height */}
      <div data-scroll-section className="relative">
        <AboutMeSection onLoad={() => handleSectionLoad('about')} />
      </div>
      
      {/* Projects Section with explicit height */}
      <div data-scroll-section className="relative">
        <Projects onLoad={() => handleSectionLoad('projects')} />
      </div>

      {/* Speciality Section */}
      <div data-scroll-section className="relative">
        <Speciality onLoad={() => handleSectionLoad('speciality')} />
      </div>
    </motion.main>
  );
}

export default Home;