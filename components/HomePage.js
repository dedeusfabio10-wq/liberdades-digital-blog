import React, { useState } from 'react';
import NewsletterSignup from './NewsletterSignup.js';
import PostCard from './PostCard.js';
import PencilIcon from './icons/PencilIcon.js';
import EditHomePageModal from './EditHomePageModal.js';

const HomePage = ({ content, onSaveContent, posts, isAdmin, onEditPost, onDeletePost, onSelectPost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuredPosts = posts.slice(0, 3);

  const renderTitle = (title) => {
    const match = title.match(/^(.*)\[(.*)\](.*)$/);
    if (match) {
      const [, prefix, highlight, suffix] = match;
      return React.createElement(React.Fragment, null,
        prefix,
        React.createElement('span', { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600" }, highlight),
        suffix
      );
    }
    return title;
  };

  const heroStyle = {
    backgroundColor: content.backgroundColor,
    backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return React.createElement(React.Fragment, null,
    React.createElement('div', { style: heroStyle, className: "relative transition-colors duration-300 dark:!bg-slate-900" },
      React.createElement('div', { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" },
        isAdmin && React.createElement('button', {
          onClick: () => setIsModalOpen(true),
          className: "absolute top-4 right-4 flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-50 transition-colors border border-blue-200 z-10"
        },
          React.createElement(PencilIcon, { className: "w-5 h-5" }),
          React.createElement('span', null, "Editar Seção")
        ),
        React.createElement('div', { className: "text-center" },
          React.createElement('h1', {
            className: "text-4xl font-bold tracking-tight sm:text-6xl",
            style: { color: content.titleColor }
          },
            renderTitle(content.title)
          ),
          React.createElement('p', {
            className: "mt-6 text-lg max-w-2xl mx-auto",
            style: { color: content.subtitleColor }
          },
            content.subtitle
          )
        )
      )
    ),
    React.createElement('div', { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" },
      React.createElement('h2', { className: "text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8" }, "Últimos Posts"),
      React.createElement('div', { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3" },
        featuredPosts.map((post) =>
          React.createElement(PostCard, { key: post.id, post: post, isAdmin: isAdmin, onEdit: onEditPost, onDelete: onDeletePost, onSelect: onSelectPost })
        )
      ),
      React.createElement(NewsletterSignup, { isAdmin: isAdmin })
    ),
    React.createElement(EditHomePageModal, {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false),
      content: content,
      onSave: onSaveContent
    })
  );
};

export default HomePage;
