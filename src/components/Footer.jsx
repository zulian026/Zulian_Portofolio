import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
      },
    },
  };

  // Set animation state saat komponen dimount
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <motion.footer
      data-scroll-section
      className="w-full py-12 px-4 md:px-8  border-t border-gray-800 mt-20"
      initial="hidden"
      animate="visible" // Gunakan animate bukan whileInView
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Logo & About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Zulian Alhisyam</h2>
            <p className="text-gray-400 max-w-md">
              Creating digital experiences with a focus on performance,
              accessibility, and beautiful designs.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/home"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Connect</h3>
            <div className="space-y-2">
              <p className="text-gray-400">
                <a
                  href="https://github.com/zulian026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition duration-300"
                >
                  GitHub
                </a>
              </p>
              <p className="text-gray-400">
                <a
                  href="https://linkedin.com/in/zulian-alhisyam-175414363"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition duration-300"
                >
                  LinkedIn
                </a>
              </p>
              <p className="text-gray-400">
                <a
                  href="https://www.instagram.com/zyanx_04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition duration-300"
                >
                  Instagram
                </a>
              </p>
              <p className="text-gray-400">
                <a
                  href="mailto:zulianalhisyam.com"
                  className="hover:text-white transition duration-300"
                >
                  Zulianalhisyam@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            © {currentYear} Zulian Alhisyam. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Designed and built with passion
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;