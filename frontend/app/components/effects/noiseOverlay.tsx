import React from "react";

import noiseOverlay from "../../assets/images/noiseBackground.png";

const NoiseOverlay: React.FC = () => {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
      style={{
        backgroundImage: `url(${noiseOverlay})`,
        backgroundAttachment: 'no-repeat',
        backgroundSize: 'cover'
      }}
    />
  );
};

export default NoiseOverlay;
