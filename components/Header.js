import React, { useState, useRef } from 'react';
import { NAV_LINKS } from '../constants.js';
import LogoIcon from './icons/LogoIcon.js';
import SearchIcon from './icons/SearchIcon.js';

const AdminToggle = ({ isAdmin, setIsAdmin }) => (
    React.createElement('div', { className: "flex items-center space-x-2" },
        React.createElement('span', { className: `text-sm font-medium ${isAdmin ? 'text-blue-400' : 'text-slate-500'}` }, "Modo Edição"),
        React.createElement('button', {
            onClick: () => setIsAdmin(!isAdmin),
            className: `relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isAdmin ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`
        },
            React.createElement('span', {
                "aria-hidden": "true",
                className: `inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${isAdmin ? 'translate-x-5' : 'translate-x-0'}`
            })
        )
    )
);

const ThemeToggle = ({ theme, toggleTheme }) => (
  React.createElement('button', {
    onClick: toggleTheme,
    className: "p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
    "aria-label": theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
  },
    theme === 'light' ?
      React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" })) :
      React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }))
  )
);

const Header = ({ currentPage, setCurrentPage, isAdmin, setIsAdmin, onShowLogin, onSearchClick, theme, toggleTheme }) => {
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const clickTimeoutRef = useRef(null);

  const handleNavClick = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    
    if (currentPage !== 'home') {
       setCurrentPage('home');
       setLogoClickCount(0);
       if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
       return;
    }

    if (isAdmin) return;

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    const newClickCount = logoClickCount + 1;
    setLogoClickCount(newClickCount);

    if (newClickCount >= 5) {
      onShowLogin();
      setLogoClickCount(0);
    } else {
      clickTimeoutRef.current = window.setTimeout(() => {
        setLogoClickCount(0);
      }, 1500);
    }
  };

  return React.createElement('header', { className: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80" },
    React.createElement('div', { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
      React.createElement('div', { className: "flex justify-between items-center h-16" },
        React.createElement('div', { className: "flex-shrink-0" },
          React.createElement('a', { href: "#", onClick: handleLogoClick, className: "flex items-center space-x-2 text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tight transition-opacity hover:opacity-80" },
            React.createElement(LogoIcon, { className: "w-8 h-8 text-blue-600" }),
            React.createElement('span', null, "Liberdade Digital")
          )
        ),
        React.createElement('div', { className: "hidden md:flex items-center space-x-8" },
          React.createElement('nav', { className: "flex space-x-8" },
            NAV_LINKS.map(link =>
              React.createElement('a', {
                key: link.name,
                href: "#",
                onClick: (e) => handleNavClick(e, link.page),
                className: `text-base font-medium transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-600 after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                  currentPage === link.page
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`
              }, link.name)
            )
          ),
          React.createElement('div', { className: "flex items-center space-x-4" },
            React.createElement('button', {
              onClick: onSearchClick,
              className: "p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
              "aria-label": "Pesquisar artigos"
            },
              React.createElement(SearchIcon, { className: "h-6 w-6" })
            ),
            React.createElement(ThemeToggle, { theme: theme, toggleTheme: toggleTheme }),
            isAdmin && React.createElement(AdminToggle, { isAdmin: isAdmin, setIsAdmin: setIsAdmin })
          )
        ),
        React.createElement('div', { className: "md:hidden flex items-center" },
          React.createElement('button', {
            onClick: onSearchClick,
            className: "p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
            "aria-label": "Pesquisar artigos"
          },
            React.createElement(SearchIcon, { className: "h-6 w-6" })
          ),
          React.createElement(ThemeToggle, { theme: theme, toggleTheme: toggleTheme }),
          React.createElement('button', {
            onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
            className: "ml-2 p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none",
            "aria-label": "Abrir menu de navegação"
          },
            React.createElement('svg', { className: "h-6 w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
              React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16m-7 6h7" })
            )
          )
        )
      )
    ),
    isMobileMenuOpen && React.createElement('div', { className: "md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800" },
      React.createElement('div', { className: "px-2 pt-2 pb-3 space-y-1 sm:px-3" },
        NAV_LINKS.map(link =>
          React.createElement('a', {
            key: link.name,
            href: "#",
            onClick: (e) => handleNavClick(e, link.page),
            className: `block px-3 py-2 rounded-md text-base font-medium ${
              currentPage === link.page
                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`
          }, link.name)
        ),
        isAdmin && React.createElement('div', { className: "px-3 pt-4 pb-2 border-t border-slate-200 dark:border-slate-800" },
          React.createElement(AdminToggle, { isAdmin: isAdmin, setIsAdmin: setIsAdmin })
        )
      )
    )
  );
};

export default Header;
