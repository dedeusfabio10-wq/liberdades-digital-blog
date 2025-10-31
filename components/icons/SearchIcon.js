import React from 'react';

const SearchIcon = ({ className = "w-6 h-6" }) => (
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
    React.createElement('circle', { cx: "11", cy: "11", r: "8" }),
    React.createElement('line', { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
  )
);

export default SearchIcon;
