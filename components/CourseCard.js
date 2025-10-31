import React from 'react';
import PencilIcon from './icons/PencilIcon.js';
import TrashIcon from './icons/TrashIcon.js';

const CourseCard = ({ course, isAdmin = false, onEdit, onDelete }) => {
  const handleClick = (e) => {
    if (course.link === '#') {
      e.preventDefault();
    }
  };
  
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(course);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Tem certeza que deseja excluir o curso "${course.name}"?`)) {
      onDelete(course.id);
    }
  };

  return React.createElement('div', { className: "relative group h-full" },
    isAdmin && React.createElement('div', { className: "absolute top-3 right-3 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" },
      React.createElement('button', { onClick: handleEdit, className: "p-2 bg-white/80 dark:bg-slate-900/80 rounded-full shadow-md hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors" },
        React.createElement(PencilIcon, { className: "w-5 h-5 text-blue-600 dark:text-blue-400" })
      ),
      React.createElement('button', { onClick: handleDelete, className: "p-2 bg-white/80 dark:bg-slate-900/80 rounded-full shadow-md hover:bg-red-100 dark:hover:bg-slate-700 transition-colors" },
        React.createElement(TrashIcon, { className: "w-5 h-5 text-red-600 dark:text-red-400" })
      )
    ),
    React.createElement('a', {
      href: course.link,
      onClick: handleClick,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "flex flex-col h-full bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl dark:shadow-slate-900/50 dark:hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden hover:-translate-y-1"
    },
      React.createElement('div', { className: "overflow-hidden" },
        React.createElement('img', {
          src: course.imageUrl,
          alt: course.name,
          loading: "lazy",
          width: "400",
          height: "300",
          className: "w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        })
      ),
      React.createElement('div', { className: "p-6 flex flex-col flex-grow text-center" },
        React.createElement('h3', { className: "text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2" }, course.name),
        React.createElement('p', { className: "text-slate-600 dark:text-slate-400 flex-grow mb-4" }, course.description),
        React.createElement('div', { className: "mt-auto inline-block rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg group-hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-all transform group-hover:scale-105" },
          course.cta
        )
      )
    )
  );
};

export default CourseCard;
