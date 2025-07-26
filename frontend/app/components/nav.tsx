import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaX } from "react-icons/fa6";
import { BiMenu } from "react-icons/bi";
import navVector from "../assets/images/nav-vector.svg";
import testLogo from "../assets/images/test-logo.jpg";

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredMobileItem, setHoveredMobileItem] = useState<string | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false); // Add this state

  const navItems = [
    { name: "Home", href: "#home", badgeText: "H" },
    { name: "About Us", href: "#about", badgeText: "A" },
    { name: "Portfolio", href: "#portfolio", badgeText: "P" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    // Function to determine which section is currently active
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100;

      // Update scroll state for navbar background
      setIsScrolled(window.scrollY > 50);

      // Check if we're at the very top
      if (window.scrollY < 100) {
        setActiveSection("");
        return;
      }

      // Find all sections and determine which one is active
      const sections = navItems
        .map((item) => ({
          id: item.href.substring(1),
          element: document.getElementById(item.href.substring(1)),
        }))
        .filter((section) => section.element !== null);

      let currentSection = "";

      for (const section of sections) {
        const element = section.element!;
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          currentSection = section.id;
          break;
        }
      }

      setActiveSection(currentSection);
    };

    // Initial check
    updateActiveSection();

    // Throttled scroll handler for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Listen for hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setActiveSection(hash);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [navItems]); // Add navItems as dependency

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Calculate offset for fixed navbar
      const navbarHeight = 80; // Adjust based on your navbar height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL hash without jumping
      window.history.pushState(null, "", href);
      setActiveSection(targetId);
    }

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`text-white relative border-b border-[#FEEDEC17] transition-all duration-300 ${
        isScrolled ? " shadow-2xl backdrop-blur-3xl" : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Semantic Header */}
          <header className="flex-shrink-0">
            <h1 className="sr-only">Uthman's Portfolio</h1>
            <button
              onClick={() => handleNavClick("#home")}
              aria-label="Go to homepage"
              className="focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md"
            >
              <picture className="w-fit h-fit">
                <img
                  className="object-contain max-w-[60px] max-h-[40px] h-full hover:scale-110 hover:rotate-12 transition-all duration-300"
                  src={testLogo}
                  alt="Uthman's logo"
                  onError={(e) => {
                    console.warn("Logo failed to load:", e);
                    // Fallback could be set here
                  }}
                />
              </picture>
            </button>
          </header>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center space-x-12" role="menubar">
              {navItems.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                const isHovered = hoveredItem === item.name;

                return (
                  <li key={item.name} role="none">
                    <motion.button
                      className="relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md"
                      role="menuitem"
                      aria-current={isActive ? "page" : undefined}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onClick={() => handleNavClick(item.href)}
                      onHoverStart={() => setHoveredItem(item.name)}
                      onHoverEnd={() => setHoveredItem(null)}
                    >
                      <div
                        className={`
                          relative flex items-center space-x-3 px-4 py-2
                          transition-colors duration-300
                          ${
                            isActive
                              ? "text-white"
                              : "text-gray-300 hover:text-white"
                          }
                        `}
                      >
                        <span
                          className={`
                          text-xs bg-[#042428] flex gap-1.5 items-center px-2 py-1 
                          rounded-lg border-[#424242] border-2 border-b-4
                          transition-all duration-300
                          ${
                            isActive
                              ? "border-teal-400 bg-teal-400/10"
                              : isHovered
                                ? "border-teal-400/50"
                                : ""
                          }
                        `}
                        >
                          <img
                            className="w-3 h-3"
                            src={navVector}
                            alt=""
                            aria-hidden="true"
                            onError={(e) => {
                              console.warn("Nav vector failed to load:", e);
                            }}
                          />
                          <span
                            className={`
                            text-center font-medium leading-5 capitalize
                            ${isActive ? "text-teal-300" : "text-[#D6D6D6]"}
                          `}
                          >
                            {item.badgeText}
                          </span>
                        </span>

                        <span
                          className={`
                          font-medium text-base tracking-wide
                          ${isActive ? "text-white" : ""}
                        `}
                        >
                          {item.name}
                        </span>
                      </div>

                      {/* Underline */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{
                          scaleX: isActive || isHovered ? 1 : 0,
                          opacity: isActive || isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        style={{ transformOrigin: "center" }}
                        aria-hidden="true"
                      />

                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-teal-400/5 rounded-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: isActive || isHovered ? 1 : 0,
                          scale: isActive || isHovered ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                      />
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Button - Desktop */}
          <div className="hidden lg:flex">
            <motion.button
              className="relative cursor-pointer bg-teal-600/30 hover:bg-teal-500 px-6 py-3 rounded-[68px] text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 focus:outline-none focus:ring-2 focus:ring-teal-500"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(45, 212, 191, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              aria-label="Contact us"
              onClick={() => {
                // Add contact functionality here
                console.log("Contact button clicked");
              }}
            >
              <span className="relative z-10 text-white font-normal text-base leading-5 capitalize">
                Contact Us
              </span>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg opacity-0"
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 relative z-50"
              whileTap={{ scale: 0.95 }}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <FaX size={24} /> : <BiMenu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMenu}
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              id="mobile-menu"
              className="fixed top-0 right-0 w-full h-full bg-gradient-to-br from-slate-900/98 to-slate-800/98 backdrop-blur-xl z-50 lg:hidden overflow-y-auto"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              role="menu"
              aria-label="Mobile navigation menu"
            >
              {/* Close Button */}
              <div className="absolute top-6 right-6 z-60">
                <motion.button
                  onClick={toggleMenu}
                  className="p-3 rounded-full text-gray-300 hover:text-white bg-slate-800/50 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  aria-label="Close navigation menu"
                >
                  <FaX size={20} />
                </motion.button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex flex-col justify-center items-center min-h-full px-8 py-20">
                {/* Navigation Items */}
                <div className="w-full max-w-md space-y-6">
                  {navItems.map((item, index) => {
                    const sectionId = item.href.substring(1);
                    const isActive = activeSection === sectionId;
                    const isHovered = hoveredMobileItem === item.name;

                    return (
                      <motion.div
                        key={item.name}
                        className="w-full"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        <motion.button
                          className={`
                            w-full flex items-center justify-between px-6 py-5 rounded-2xl cursor-pointer
                            transition-all duration-300 border-2 group relative overflow-hidden
                            focus:outline-none focus:ring-2 focus:ring-teal-500
                            ${
                              isActive
                                ? "text-white bg-gradient-to-r from-teal-600/30 to-cyan-600/30 border-teal-500/70 shadow-xl shadow-teal-500/20"
                                : isHovered
                                  ? "text-white bg-slate-800/80 border-slate-500 shadow-lg"
                                  : "text-gray-300 hover:text-white bg-slate-800/40 hover:bg-slate-800/80 border-slate-700/60 hover:border-slate-500"
                            }
                          `}
                          onClick={() => handleNavClick(item.href)}
                          onHoverStart={() => setHoveredMobileItem(item.name)}
                          onHoverEnd={() => setHoveredMobileItem(null)}
                          whileTap={{ scale: 0.98 }}
                          whileHover={{ scale: 1.02 }}
                          role="menuitem"
                          aria-current={isActive ? "page" : undefined}
                        >
                          {/* Left side - Badge and Text */}
                          <div className="flex items-center space-x-5">
                            <motion.div
                              className={`
                                text-sm bg-[#042428] flex gap-2 items-center px-4 py-3 
                                rounded-xl border-2 border-b-4 transition-all duration-300 min-w-[60px]
                                ${
                                  isActive
                                    ? "border-teal-400 bg-teal-400/20 shadow-lg shadow-teal-400/30"
                                    : isHovered
                                      ? "border-teal-400/70 bg-teal-400/10"
                                      : "border-slate-600 group-hover:border-teal-400/70"
                                }
                              `}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <img
                                className={`w-4 h-4 transition-all duration-300 ${
                                  isActive
                                    ? "brightness-125 drop-shadow-sm"
                                    : isHovered
                                      ? "brightness-115"
                                      : "group-hover:brightness-115"
                                }`}
                                src={navVector}
                                alt=""
                                aria-hidden="true"
                                onError={(e) => {
                                  console.warn("Nav vector failed to load:", e);
                                }}
                              />
                              <span
                                className={`
                                  text-center font-bold leading-5 capitalize transition-colors duration-300 text-base
                                  ${
                                    isActive
                                      ? "text-teal-200 drop-shadow-sm"
                                      : isHovered
                                        ? "text-teal-300"
                                        : "text-[#D6D6D6] group-hover:text-teal-300"
                                  }
                                `}
                              >
                                {item.badgeText}
                              </span>
                            </motion.div>

                            <span
                              className={`font-semibold text-xl transition-colors duration-300 ${
                                isActive
                                  ? "text-white drop-shadow-sm"
                                  : isHovered
                                    ? "text-white"
                                    : "group-hover:text-white"
                              }`}
                            >
                              {item.name}
                            </span>
                          </div>

                          {/* Right side - Active Indicator */}
                          <motion.div
                            className={`
                              w-3 h-3 rounded-full transition-all duration-300
                              ${
                                isActive
                                  ? "bg-gradient-to-r from-teal-400 to-cyan-400 shadow-lg shadow-teal-400/60"
                                  : isHovered
                                    ? "bg-teal-400/90 shadow-md shadow-teal-400/40"
                                    : "bg-slate-600 group-hover:bg-teal-400/70"
                              }
                            `}
                            animate={{
                              scale: isActive ? [1, 1.4, 1] : 1,
                              boxShadow: isActive
                                ? [
                                    "0 0 10px rgba(45, 212, 191, 0.6)",
                                    "0 0 20px rgba(45, 212, 191, 0.8)",
                                    "0 0 10px rgba(45, 212, 191, 0.6)",
                                  ]
                                : "0 0 0px rgba(45, 212, 191, 0)",
                            }}
                            transition={{
                              duration: 2,
                              repeat: isActive ? Infinity : 0,
                              repeatType: "reverse" as const,
                            }}
                          />

                          {/* Background Glow Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-teal-400/5 to-cyan-400/5 rounded-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            aria-hidden="true"
                          />
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile Contact Button */}
                <motion.div
                  className="w-full max-w-md mt-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.5,
                    delay: navItems.length * 0.1 + 0.2,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <motion.button
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 px-8 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl shadow-teal-600/30 hover:shadow-teal-500/50 border border-teal-500/40 hover:border-teal-400/60 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={() => {
                      toggleMenu();
                      // Add contact functionality here
                      console.log("Mobile contact button clicked");
                    }}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    aria-label="Contact us"
                  >
                    <span className="text-white drop-shadow-sm">
                      Contact Us
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
