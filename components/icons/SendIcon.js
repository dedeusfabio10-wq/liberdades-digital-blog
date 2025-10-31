import React from 'react';

const SendIcon = ({ className = "w-6 h-6" }) => (
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
        React.createElement('line', { x1: "22", y1: "2", x2: "11", y2: "13" }),
        React.createElement('polygon', { points: "22 2 15 22 11 13 2 9 22 2" })
    )
);

export default SendIcon;
