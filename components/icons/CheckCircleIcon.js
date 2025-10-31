import React from 'react';

const CheckCircleIcon = ({ className = "w-6 h-6" }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  },
    React.createElement('path', { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
    React.createElement('polyline', { points: "22 4 12 14.01 9 11.01" })
  )
);

export default CheckCircleIcon;
