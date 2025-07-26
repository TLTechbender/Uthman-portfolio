import { Outlet } from "react-router";
import Footer from "./footer";
import Nav from "./nav";

import { motion } from "framer-motion";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen  bg-[#04070D] mb-12">
   
      <div className="fixed top-0 w-full z-10">
        <Nav />
      </div>

   
      <motion.main
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>

      <Footer />
    </div>
  );
};

export default Layout;
