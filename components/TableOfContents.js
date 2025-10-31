import React, { useState, useEffect, useRef } from 'react';

const TableOfContents = ({ headings }) => {
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef(null);

  useEffect(() => {
    const handleObserver = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '-20% 0px -80% 0px',
    });

    const elements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      elements.forEach(el => observerRef.current?.unobserve(el));
    };
  }, [headings]);

  const scrollToHeading = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setActiveId(id);
  };

  return React.createElement('div', { className: "hidden lg:block p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800" },
    React.createElement('h3', { className: "text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4" }, "Neste Artigo"),
    React.createElement('nav', null,
      React.createElement('ul', { className: "space-y-2" },
        headings.map((heading) =>
          React.createElement('li', { key: heading.id },
            React.createElement('a', {
              href: `#${heading.id}`,
              onClick: (e) => scrollToHeading(e, heading.id),
              className: `transition-colors duration-200 text-sm ${
                activeId === heading.id
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`
            },
              heading.text
            )
          )
        )
      )
    )
  );
};

export default TableOfContents;
