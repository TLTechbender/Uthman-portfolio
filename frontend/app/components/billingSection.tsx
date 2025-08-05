import { motion } from "framer-motion";

import ContactForm from "./contactForm";
import WireframeNineBackground from "./effects/wireframeNineBackground";

const BillingSection:React.FC = () => {
  return (
    <div>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          {/* <WireframeNineShapesBackground /> */}
        </motion.div>

        {/* Thank you content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-8 items-center justify-center py-16">
          <h2 className="text-white text-3xl font-bold  capitalize text-center">
            Thank you for your interest
          </h2>
          <h3 className="text-[#FFFFFF99] text-sm text-center capitalize px-2 md:px-4">
            We would love to hear from you and discuss how we can help bring
            your digital ideas to life. Here are the different ways you can get
            in touch with me.
          </h3>
          {/* <button className="px-3 py-2 bg-[#0FB492] hover:scale-150 text-white w-fit mx-auto rounded-lg animate-pulse hover:animate-none transition-all duration-300">
            view more
          </button> */}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <WireframeNineBackground />
        </div>

        {/* Contact Form Section */}
        <div className="relative z-20 ">
          
            <ContactForm />
          
        </div>
      </div>
    </div>
  );
};

export default BillingSection;
