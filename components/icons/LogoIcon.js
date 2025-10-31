import React from 'react';

const LogoIcon = ({ className = "w-8 h-8" }) => (
  React.createElement('svg', {
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
    React.createElement('path', {
      d: "M5 19V5h7l-4 7h7c2.21 0 4 1.79 4 4s-1.79 4-4 4H5z",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  )
);

export default LogoIcon;
