import React from 'react';

const XCircleIcon = ({ className = "w-6 h-6" }) => (
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
    React.createElement('circle', { cx: "12", cy: "12", r: "10" }),
    React.createElement('line', { x1: "15", y1: "9", x2: "9", y2: "15" }),
    React.createElement('line', { x1: "9", y1: "9", x2: "15", y2: "15" })
  )
);

export default XCircleIcon;
