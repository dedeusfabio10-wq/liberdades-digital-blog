import React from 'react';
import LogoIcon from './icons/LogoIcon.js';

const Footer = () => {
  return React.createElement('footer', { className: "bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" },
    React.createElement('div', { className: "max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8" },
      React.createElement('div', { className: "flex flex-col items-center justify-center text-center" },
        React.createElement('a', { href: "#", className: "flex items-center space-x-2 text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tight transition-opacity hover:opacity-80" },
          React.createElement(LogoIcon, { className: "w-8 h-8 text-blue-600" }),
          React.createElement('span', null, "Liberdade Digital")
        ),
        React.createElement('p', { className: "mt-4 text-base text-slate-500 dark:text-slate-400 max-w-md" },
          "Ensinando a vender na internet e conquistar liberdade financeira através de marketing digital, produtividade e renda online."
        )
      ),
      React.createElement('div', { className: "mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 text-center" },
        React.createElement('p', { className: "text-sm text-slate-500 dark:text-slate-400" },
          `© ${new Date().getFullYear()} Liberdade Digital. Todos os direitos reservados.`
        )
      )
    )
  );
};

export default Footer;
