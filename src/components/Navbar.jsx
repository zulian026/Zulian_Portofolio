import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Tutup menu mobile otomatis saat pindah halaman
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const MenuItem = ({ name, path }) => {
    // Highlight active menu item
    const isActive = location.pathname === path;

    return (
      <div style={{ fontFamily: "Satoshi, sans-serif" }}>
        <Link
          to={path}
          className={`relative font-satoshi transition-colors ${
            isActive
              ? "text-pink-400 font-semibold"
              : "text-gray-400 hover:text-pink-300"
          }`}
        >
          {name}
          <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-pink-300 hover:w-full transition-all duration-200" />
        </Link>
      </div>
    );
  };

  return (
    <div className="fixed top-0 w-full px-4 z-50 backdrop-blur-sm bg-opacity-50">
      <nav className="relative flex items-center justify-between py-3 font-inter">
        {/* Logo kiri */}
        <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent cursor-pointer">
          <Link to="/">ZY</Link>
        </span>

        {/* Menu tengah */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-6">
          {menuItems.map((item) => (
            <MenuItem
              key={item.name}
              name={item.name}
              path={item.path}
            />
          ))}
        </div>

        {/* Mobile menu button kanan */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu without animations */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800/90 backdrop-blur-sm rounded-lg py-2 mt-2 text-center border border-gray-700">
          <div className="flex flex-col space-y-2 px-2">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="hover:bg-blue-500/10 hover:scale-[1.03] rounded transition-all"
              >
                <Link
                  to={item.path}
                  className="hover:text-pink-400 transition-all py-2 text-xs block w-full"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;