const WireframeNineBackground: React.FC = () => {

  //Shares classname with wireframesixbackground.css so just note "glow-animation" is used
  return (
    <div className="absolute w-full h-full pointer-events-none z-0">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 1774"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none"
      >
        <defs>
          <filter
            id="filter0_f_8_23"
            x="-34.2615"
            y="230.83"
            width="1601.78"
            height="1396.74"
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
              stdDeviation={250}
              result="effect1_foregroundBlur_8_23"
            />
          </filter>
          <clipPath id="clip0_8_23">
            <rect width={1440} height={1774} fill="white" />
          </clipPath>
        </defs>

        <g clipPath="url(#clip0_8_23)">
          <rect width={1440} height={1774} fill="#04070D" />

          <g
            opacity={0.4}
            className="glow-animation"
            filter="url(#filter0_f_8_23)"
          >
            <path
              d="M576.254 730.83L475.254 926.275L465.739 1036.17L612.114 1127.57L741.627 1007.65L832.684 1088.47L1006 970.918L1067.51 851.874L812.279 740.237L703.944 814.826L576.254 730.83Z"
              fill="#00D5BE"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
export default WireframeNineBackground;