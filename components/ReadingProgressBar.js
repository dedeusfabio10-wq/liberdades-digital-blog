import React, { useState, useEffect } from 'react';

const ReadingProgressBar = () => {
  const [width, setWidth] = useState(0);

  const scrollListener = () => {
    const element = document.documentElement;
    const totalHeight = element.scrollHeight - element.clientHeight;
    const windowScroll = element.scrollTop;
    
    if (totalHeight > 0) {
      const scrolled = (windowScroll / totalHeight) * 100;
      setWidth(scrolled);
    } else {
      setWidth(0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return React.createElement('div', { className: "fixed top-16 left-0 w-full h-1 z-50 bg-slate-200 dark:bg-slate-700" },
    React.createElement('div', {
      className: "h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-75 ease-out",
      style: { width: `${width}%` }
    })
  );
};

export default ReadingProgressBar;
