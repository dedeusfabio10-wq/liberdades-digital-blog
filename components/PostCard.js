import React from 'react';
import PencilIcon from './icons/PencilIcon.js';
import TrashIcon from './icons/TrashIcon.js';
import PlayIcon from './icons/PlayIcon.js';

const PostCard = ({ post, isAdmin = false, onEdit, onDelete, onSelect }) => {
  const handleSelect = (e) => {
    e.preventDefault();
    onSelect(post);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(post);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Tem certeza que deseja excluir o post "${post.title}"?`)) {
      onDelete(post.id);
    }
  };

  return React.createElement('div', { className: "relative group" },
    isAdmin && React.createElement('div', { className: "absolute top-3 right-3 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" },
      React.createElement('button', { onClick: handleEdit, className: "p-2 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-md hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors" },
        React.createElement(PencilIcon, { className: "w-5 h-5 text-blue-600 dark:text-blue-400" })
      ),
      React.createElement('button', { onClick: handleDelete, className: "p-2 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-md hover:bg-red-100 dark:hover:bg-slate-700 transition-colors" },
        React.createElement(TrashIcon, { className: "w-5 h-5 text-red-600 dark:text-red-400" })
      )
    ),
    React.createElement('a', { href: "#", onClick: handleSelect, className: "block bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl dark:shadow-slate-900/50 dark:hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden h-full flex flex-col hover:-translate-y-1" },
      React.createElement('div', { className: "relative overflow-hidden" },
        React.createElement('img', {
          src: post.imageUrl,
          alt: post.title,
          loading: "lazy",
          width: "600",
          height: "400",
          className: "w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        }),
        post.videoUrl && React.createElement('div', { className: "absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity opacity-0 group-hover:opacity-100" },
          React.createElement(PlayIcon, { className: "w-16 h-16 text-white opacity-90" })
        )
      ),
      React.createElement('div', { className: "p-6 flex flex-col flex-grow" },
        React.createElement('p', { className: "text-sm font-medium text-blue-600 dark:text-blue-400" }, post.category),
        React.createElement('h3', { className: "mt-2 text-xl font-semibold text-slate-800 dark:text-slate-200" }, post.title),
        React.createElement('p', { className: "mt-3 text-base text-slate-600 dark:text-slate-400 flex-grow" }, post.excerpt)
      )
    )
  );
};

export default PostCard;
