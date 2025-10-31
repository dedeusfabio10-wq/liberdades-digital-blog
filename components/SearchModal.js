import React, { useState, useMemo, useRef, useEffect } from 'react';
import CloseIcon from './icons/CloseIcon.js';
import SearchIcon from './icons/SearchIcon.js';
import { useModalAccessibility } from '../hooks/useModalAccessibility.js';

const SearchModal = ({ isOpen, onClose, posts, onSelectPost }) => {
  const [query, setQuery] = useState('');
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  
  useModalAccessibility(isOpen, onClose, modalRef);

  useEffect(() => {
      if (isOpen) {
          setTimeout(() => inputRef.current?.focus(), 100);
          setQuery('');
      }
  }, [isOpen]);

  const filteredPosts = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    const lowercasedQuery = query.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(lowercasedQuery) ||
      post.excerpt.toLowerCase().includes(lowercasedQuery) ||
      post.content.toLowerCase().includes(lowercasedQuery)
    );
  }, [query, posts]);

  if (!isOpen) {
    return null;
  }
  
  const handleSelect = (post) => {
    onSelectPost(post);
    onClose();
  }

  return React.createElement('div', { className: "fixed inset-0 bg-black bg-opacity-70 z-[100] flex flex-col p-4", onClick: onClose },
    React.createElement('div', { className: "w-full max-w-3xl mx-auto flex-shrink-0" },
      React.createElement('button', { onClick: onClose, className: "absolute top-4 right-4 text-white hover:text-slate-300" },
        React.createElement(CloseIcon, { className: "w-8 h-8" })
      )
    ),
    React.createElement('div', {
      ref: modalRef,
      className: "w-full max-w-3xl mx-auto flex flex-col flex-grow overflow-y-auto",
      onClick: e => e.stopPropagation(),
      role: "dialog",
      "aria-modal": "true"
    },
      React.createElement('div', { className: "relative mt-12 mb-6" },
        React.createElement('input', {
          ref: inputRef,
          type: "text",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "Digite para pesquisar artigos...",
          className: "w-full p-4 pl-12 text-lg bg-white/10 text-white rounded-lg border border-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-slate-400"
        }),
        React.createElement(SearchIcon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" })
      ),
      query.trim() && React.createElement('div', { className: "bg-slate-50 dark:bg-slate-900 rounded-lg p-4 flex-grow" },
        filteredPosts.length > 0 ? (
          React.createElement('div', { className: "grid gap-6 md:grid-cols-2" },
            filteredPosts.map(post =>
              React.createElement('div', { key: post.id, onClick: () => handleSelect(post), className: "cursor-pointer" },
                React.createElement('h3', { className: "font-bold text-blue-600 dark:text-blue-400 hover:underline" }, post.title),
                React.createElement('p', { className: "text-sm text-slate-600 dark:text-slate-400 mt-1" }, post.excerpt)
              )
            )
          )
        ) : (
          React.createElement('div', { className: "text-center py-12" },
            React.createElement('p', { className: "text-slate-500" }, `Nenhum resultado encontrado para "${query}"`)
          )
        )
      )
    )
  );
};

export default SearchModal;
