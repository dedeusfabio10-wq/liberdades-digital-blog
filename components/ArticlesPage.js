import React, { useState, useMemo } from 'react';
import PostCard from './PostCard.js';
import PlusIcon from './icons/PlusIcon.js';
import EmptyState from './EmptyState.js';

const ArticlesPage = ({ posts, isAdmin, onEditPost, onDeletePost, onAddPost, onSelectPost }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const uniqueCategories = new Set((posts || []).map(p => p.category));
    return ['all', ...Array.from(uniqueCategories)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') {
      return posts;
    }
    return posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);
  
  return React.createElement('div', { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" },
    React.createElement('div', { className: "flex justify-between items-center mb-8" },
      React.createElement('div', null,
        React.createElement('h1', { className: "text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl" },
          "Todos os Artigos"
        ),
        React.createElement('p', { className: "mt-4 text-lg text-slate-600 dark:text-slate-400" },
          "Explore nosso conteúdo e encontre as estratégias que você precisa para decolar."
        )
      ),
      isAdmin && React.createElement('button', { onClick: onAddPost, className: "flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition-colors" },
        React.createElement(PlusIcon, { className: "w-5 h-5" }),
        React.createElement('span', null, "Novo Artigo")
      )
    ),
    React.createElement('div', { className: "mb-12 flex flex-wrap gap-3 justify-center" },
      categories.map(category =>
        React.createElement('button', {
          key: category,
          onClick: () => setSelectedCategory(category),
          className: `px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 transform hover:scale-105 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`
        }, category === 'all' ? 'Todos' : category)
      )
    ),
    filteredPosts.length > 0 ? (
      React.createElement('div', { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3" },
        filteredPosts.map(post =>
          React.createElement(PostCard, { key: post.id, post: post, isAdmin: isAdmin, onEdit: onEditPost, onDelete: onDeletePost, onSelect: onSelectPost })
        )
      )
    ) : (
      React.createElement(EmptyState, {
        title: "Nenhum artigo encontrado",
        description: selectedCategory === 'all' ? "Parece que ainda não há nada por aqui." : `Não encontramos artigos na categoria "${selectedCategory}".`,
        action: isAdmin && selectedCategory === 'all' ? { text: 'Criar Novo Artigo', onClick: onAddPost } : undefined
      })
    )
  );
};

export default ArticlesPage;
