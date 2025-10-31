import React from 'react';

const PlayIcon = ({ className = "w-6 h-6" }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    viewBox: "0 0 24 24",
    fill: "currentColor"
  },
    React.createElement('path', { d: "M8 5v14l11-7z" })
  )
);

export default PlayIcon;
