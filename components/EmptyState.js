import React from 'react';
import FeatherIcon from './icons/FeatherIcon.js';

const EmptyState = ({ title, description, action, icon }) => {
  return React.createElement('div', { className: "text-center bg-slate-100 dark:bg-slate-800/50 p-12 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700" },
    React.createElement('div', { className: "mx-auto h-12 w-12 text-slate-400" },
      icon || React.createElement(FeatherIcon)
    ),
    React.createElement('h3', { className: "mt-2 text-xl font-medium text-slate-900 dark:text-slate-200" }, title),
    React.createElement('p', { className: "mt-1 text-base text-slate-500 dark:text-slate-400" }, description),
    action && React.createElement('div', { className: "mt-6" },
      React.createElement('button', {
        type: "button",
        onClick: action.onClick,
        className: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      },
        action.text
      )
    )
  );
};

export default EmptyState;
