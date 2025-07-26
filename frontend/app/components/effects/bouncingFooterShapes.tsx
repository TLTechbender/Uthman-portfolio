import React from "react";
import { motion, type Variants } from "framer-motion";
import footerImageOne from "../../assets/images/footerImg1.svg";
import footerImageTwo from "../../assets/images/footerImg2.svg";
import footerImageThree from "../../assets/images/footerImg3.svg";
import footerImageFour from "../../assets/images/footerImg4.svg";
import footerImageFive from "../../assets/images/footerImg5.svg";
import footerImageSix from "../../assets/images/footerImg6.svg";
import footerImageSeven from "../../assets/images/footerImg7.svg";
import footerImageEight from "../../assets/images/footerImg8.svg";
import footerImageNine from "../../assets/images/footerImg9.svg";

const BouncingFooterShapes = () => {
  // 8 different SVG shapes with colors
  const shapes = [
    {
      id: 1,
      svg: footerImageOne,
    },
    {
      id: 2,
      svg: footerImageTwo,
    },
    {
      id: 3,
      svg: footerImageThree,
    },
    {
      id: 4,
      svg: footerImageFour,
    },
    {
      id: 5,
      svg: footerImageFive,
    },
    {
      id: 6,
      svg: footerImageSix,
    },
    {
      id: 7,
      svg: footerImageSeven,
    },
    {
      id: 8,
      svg: footerImageEight,
    },
    {
      id: 9,
      svg: footerImageNine,
    },
  ];

  const shapeVariants: Variants = {
    animate: (i) => ({
      y: [0, -40, 0],
      rotateY: [0, 180, 360],
      transition: {
        y: {
          duration: 2.5,
          repeat: Infinity,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: i * 0.15,
        },
        rotateY: {
          duration: 2.5,
          repeat: Infinity,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: i * 0.15,
        },
      },
    }),
  };

  return (
    <div className="flex items-center justify-start py-24">
      <div className="flex justify-start space-x-4">
        {shapes.map((shape, index) => (
          <motion.div
            key={shape.id}
            className="flex items-center justify-start"
            variants={shapeVariants}
            animate="animate"
            custom={index}
          >
            <img src={shape.svg} alt="bouncing logos" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BouncingFooterShapes;
