import React from "react";

//Ai assist bro, the css only method no work so I exported the svg out and alongside svgviewer.dev and claude (helped make it responsive)
const NoiseOverlay: React.FC = () => {
  return (
    <>
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              baseFrequency="0.85"
              numOctaves="3"
              type="fractalNoise"
              seed="2"
            />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 0.08" />
            </feComponentTransfer>
            <feComposite operator="over" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ filter: "url(#noise)" }}
      />
    </>
  );
};

export default NoiseOverlay;
