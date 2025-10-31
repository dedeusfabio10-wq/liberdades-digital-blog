import React, { useEffect } from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon.js';
import XCircleIcon from './icons/XCircleIcon.js';

const toastConfig = {
  success: {
    icon: React.createElement(CheckCircleIcon, { className: "w-6 h-6 text-green-500" }),
    style: 'bg-white border-green-500',
    textStyle: 'text-slate-800'
  },
  error: {
    icon: React.createElement(XCircleIcon, { className: "w-6 h-6 text-red-500" }),
    style: 'bg-white border-red-500',
    textStyle: 'text-slate-800'
  },
};

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const config = toastConfig[type];

  return React.createElement('div', { className: "fixed top-20 right-4 z-[200] animate-fade-in-down" },
    React.createElement('div', { className: `flex items-center p-4 rounded-lg shadow-lg border-l-4 ${config.style}` },
      React.createElement('div', { className: "flex-shrink-0" },
        config.icon
      ),
      React.createElement('div', { className: `ml-3 text-sm font-medium ${config.textStyle}` },
        message
      ),
      React.createElement('button', { onClick: onClose, className: "ml-4 -mr-1 p-1 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400" },
        React.createElement('svg', { className: "w-4 h-4 text-slate-500", fill: "currentColor", viewBox: "0 0 20 20" },
          React.createElement('path', { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" })
        )
      )
    ),
    React.createElement('style', null, `
      @keyframes fade-in-down {
        0% {
          opacity: 0;
          transform: translateY(-20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fade-in-down {
        animation: fade-in-down 0.3s ease-out forwards;
      }
    `)
  );
};

export default Toast;
