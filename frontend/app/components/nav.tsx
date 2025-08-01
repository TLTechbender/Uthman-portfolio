import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaX } from "react-icons/fa6";
import { BiMenu } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router";
import navVector from "../assets/images/nav-vector.svg";
import type { Navbar } from "~/sanity/interfaces/siteSettings";
import { urlFor } from "~/sanity/sanityClient";

interface NavProps {
  navbar: Navbar;
}

const Nav: React.FC<NavProps> = ({ navbar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredMobileItem, setHoveredMobileItem] = useState<string | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle body overflow when mobile menu is open
  //Update I don't know why it's not working tho
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    }
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", href: "/", badgeText: "H" },
    { name: "About Us", href: "/about", badgeText: "A" },
    { name: "Portfolio", href: "/portfolio", badgeText: "P" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (href: string) => {
    navigate(href);

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  //Didn't use navLink cos of things around formatting and I wanted more control of styling
  const isActiveRoute = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname === href) return true;
    return false;
  };

  return (
    <nav
      className={`text-white relative border-b border-[#FEEDEC17] transition-all duration-300 font-arial ${
        isScrolled ? " shadow-2xl backdrop-blur-3xl" : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <header className="flex-shrink-0">
            {/*New tailwind style I learned, screen reader only*/}
            <h1 className="sr-only">Uthman's Portfolio</h1>
            <button
              onClick={() => handleNavClick("/")}
              aria-label="Go to homepage"
              className="focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md"
            >
              <picture className="w-fit h-fit">
                <img
                  className="object-contain max-w-[60px] max-h-[40px] h-full hover:scale-110 hover:cursor-none hover:rotate-30 transition-all duration-300"
                  src={urlFor(navbar.logo.asset._id)
                    .width(48)
                    .height(48)
                    .format("webp")
                    .url()}
                  alt="Uthman's logo"
                />
              </picture>
            </button>
          </header>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center space-x-12" role="menubar">
              {navItems.map((item) => {
                const isActive = isActiveRoute(item.href);
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
                            isActive || isHovered
                              ? "text-[#F5F5F599]"
                              : "text-gray-500 hover:text-white"
                          }
                        `}
                      >
                        <span
                          className={`
                          text-xs bg-[#042428] flex gap-1.5 items-center px-2 py-1 
                          rounded-lg border-[#424242] border-2 border-b-4
                          transition-all duration-300
                          ${
                            isActive || isHovered
                              ? "border-teal-400 bg-teal-400/10"
                              : ""
                          }
                        `}
                        >
                          <img
                            className="w-3 h-3"
                            src={navVector}
                            alt=""
                            aria-hidden="true"
                          />
                          <span
                            className={`
                            text-center font-medium leading-5 capitalize
                            ${isActive || isHovered ? "text-teal-300" : "text-[#D6D6D6]"}
                          `}
                          >
                            {item.badgeText}
                          </span>
                        </span>

                        <span
                          className={`
                          font-medium text-base tracking-wide
                          ${isActive || isHovered ? "text-white" : ""}
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

          <div className="hidden lg:flex">
            <motion.a
              className="relative cursor-pointer bg-teal-600/30 hover:bg-teal-500 px-6 py-3 rounded-[68px] text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/25 focus:outline-none focus:ring-2 focus:ring-teal-500"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(45, 212, 191, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              aria-label="Contact us"
              href={navbar.contact || ""}
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
            </motion.a>
          </div>

          <div className="lg:hidden">
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 relative z-50"
              whileTap={{ scale: 0.95 }}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={"Open navigation menu"}
            >
              <BiMenu size={24} />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              id="mobile-menu"
              className="fixed inset-0 w-full h-[115vh] bg-gradient-to-br from-slate-900/98 to-slate-800/98 backdrop-blur-xl z-50 lg:hidden overflow-hidden"
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
                  className="p-3 rounded-full text-[#F5F5F599] hover:text-white bg-slate-800/50 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  aria-label="Close navigation menu"
                >
                  <FaX size={20} />
                </motion.button>
              </div>

              <div className="flex flex-col justify-center items-center h-full px-6 py-20">
                <div className="w-full max-w-md space-y-4">
                  {navItems.map((item, index) => {
                    const isActive = isActiveRoute(item.href);
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
                            w-full flex items-center justify-between px-4 py-4 rounded-xl cursor-pointer
                            transition-all duration-300 border-2 group relative overflow-hidden
                            focus:outline-none focus:ring-2 focus:ring-teal-500
                            ${
                              isActive || isHovered
                                ? "text-[#F5F5F599] bg-gradient-to-r from-teal-600/30 to-cyan-600/30 border-teal-500/70 shadow-xl shadow-teal-500/20"
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
                          <div className="flex items-center space-x-4">
                            <motion.div
                              className={`
                                text-sm bg-[#042428] flex gap-2 items-center px-3 py-2 
                                rounded-lg border-2 border-b-4 transition-all duration-300 min-w-[50px]
                                ${
                                  isActive || isHovered
                                    ? "border-teal-400 bg-teal-400/20 shadow-lg shadow-teal-400/30"
                                    : "border-slate-600 group-hover:border-teal-400/70"
                                }
                              `}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <img
                                className={`w-3 h-3 transition-all duration-300 ${
                                  isActive || isHovered
                                    ? "brightness-125 drop-shadow-sm"
                                    : "group-hover:brightness-115"
                                }`}
                                src={navVector}
                                alt=""
                                aria-hidden="true"
                              />
                              <span
                                className={`
                                  text-center font-bold leading-5 capitalize transition-colors duration-300 text-sm
                                  ${
                                    isActive || isHovered
                                      ? "text-teal-200 drop-shadow-sm"
                                      : "text-[#D6D6D6] group-hover:text-teal-300"
                                  }
                                `}
                              >
                                {item.badgeText}
                              </span>
                            </motion.div>

                            <span
                              className={`font-semibold text-lg transition-colors duration-300 ${
                                isActive || isHovered
                                  ? "text-white drop-shadow-sm"
                                  : "group-hover:text-white"
                              }`}
                            >
                              {item.name}
                            </span>
                          </div>

                          <motion.div
                            className={`
                              w-3 h-3 rounded-full transition-all duration-300
                              ${
                                isActive || isHovered
                                  ? "bg-gradient-to-r from-teal-400 to-cyan-400 shadow-lg shadow-teal-400/60"
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
                            className="absolute inset-0 bg-gradient-to-r from-teal-400/5 to-cyan-400/5 rounded-xl"
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

                <motion.div
                  className="w-full max-w-md mt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.5,
                    delay: navItems.length * 0.1 + 0.2,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <motion.a
                    className="w-full block text-center bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 px-6 py-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-xl shadow-teal-600/30 hover:shadow-teal-500/50 border border-teal-500/40 hover:border-teal-400/60 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={() => {
                      toggleMenu();
                    }}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    aria-label="Contact us"
                    href={navbar.contact || ""}
                  >
                    <span className="text-white drop-shadow-sm">
                      Contact Us
                    </span>
                  </motion.a>
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
