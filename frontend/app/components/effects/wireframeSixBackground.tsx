import "../../assets/styles/wireramesSixbackground.css";

const WireframeSixBackground:React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 457"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter
            id="glowFilter"
            x={-38.9224}
            y={-148.268}
            width={1533.99}
            height={1016.37}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation={200}
              result="effect1_foregroundBlur"
            />
          </filter>
          <clipPath id="mainClip">
            <rect width={1440} height={457} fill="white" />
          </clipPath>
        </defs>

        <g clipPath="url(#mainClip)">
          <rect width={1440} height={457} fill="#04070D" />

          <g className="glow-animation" filter="url(#glowFilter)">
            <path
              d="M867.96 468.104L523.945 385.464L368.082 332.016L361.078 264.782L625.846 305.519L589.149 251.732L885.526 284.817L1095.06 335.153L1042.85 428.56L856.097 407.326L867.96 468.104Z"
              fill="#615FFF"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default WireframeSixBackground;
