import "../../assets/styles/wireramesSixbackground.css";
import wireframeSix from '../../assets/images/wireframeSix.png';

const WireframeSixBackground:React.FC = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full glow-animation"
      style={{
        backgroundImage: `url(${wireframeSix})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        willChange: "transform, filter, opacity",
        transformOrigin: "center",
        // Initial values matching your SVG approach
        transform: "translate3d(0px, 0px, 0) scale(1)",
        filter: "brightness(0.8) contrast(1) hue-rotate(0deg) saturate(1)",
        opacity: "0.6",
      }}
    />
  );
};

export default WireframeSixBackground;
