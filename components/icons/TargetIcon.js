import React from 'react';

const TargetIcon = ({ className = "w-6 h-6" }) => (
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
    React.createElement('circle', { cx: "12", cy: "12", r: "6" }),
    React.createElement('circle', { cx: "12", cy: "12", r: "2" })
  )
);

export default TargetIcon;
