import React, { useState, useRef, useEffect } from 'react';
import ChatIcon from './icons/ChatIcon.js';
import CloseIcon from './icons/CloseIcon.js';
import SendIcon from './icons/SendIcon.js';
import LogoIcon from './icons/LogoIcon.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useModalAccessibility } from '../hooks/useModalAccessibility.js';

const Chatbot = ({ messages, onSendMessage, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  useModalAccessibility(isOpen, () => setIsOpen(false), chatWindowRef);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const renderLoadingIndicator = () => {
    return React.createElement('div', { className: "flex justify-start" },
      React.createElement('div', { className: "max-w-xs md:max-w-sm px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800" },
        React.createElement('div', { className: "flex items-center space-x-2" },
          React.createElement('div', { className: "w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" }),
          React.createElement('div', { className: "w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" }),
          React.createElement('div', { className: "w-2 h-2 bg-blue-500 rounded-full animate-bounce" })
        )
      )
    );
  };

  const renderMessage = (msg, index) => {
    return React.createElement('div', { key: index, className: `flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}` },
      React.createElement('div', { className: `max-w-xs md:max-w-sm px-4 py-2 rounded-xl ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'}` },
        React.createElement('div', { className: "prose prose-sm dark:prose-invert max-w-none" },
          React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, msg.content)
        )
      )
    );
  };

  return React.createElement(React.Fragment, null,
    React.createElement('div', { className: `fixed bottom-0 right-0 m-6 transition-transform duration-300 ${isOpen ? 'translate-x-full' : 'translate-x-0'}` },
      React.createElement('button', {
        onClick: () => setIsOpen(true),
        className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform",
        "aria-label": "Abrir assistente de IA"
      },
        React.createElement(ChatIcon, { className: "w-8 h-8" })
      )
    ),
    React.createElement('div', {
      className: `fixed inset-0 bg-black bg-opacity-50 z-[90] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`,
      onClick: () => setIsOpen(false)
    }),
    React.createElement('div', {
      ref: chatWindowRef,
      className: `fixed bottom-0 right-0 md:m-6 bg-white dark:bg-slate-900 shadow-2xl rounded-t-lg md:rounded-lg w-full md:max-w-md h-[80vh] md:h-[70vh] flex flex-col z-[100] transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "chatbot-title"
    },
      React.createElement('header', { className: "flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0" },
        React.createElement('div', { className: "flex items-center space-x-2" },
          React.createElement(LogoIcon, { className: "w-7 h-7 text-blue-600" }),
          React.createElement('h3', { id: "chatbot-title", className: "font-bold text-lg text-slate-800 dark:text-slate-200" }, "Pergunte ao Blog")
        ),
        React.createElement('button', { onClick: () => setIsOpen(false), className: "p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full" },
          React.createElement(CloseIcon, { className: "w-6 h-6" })
        )
      ),
      React.createElement('div', { className: "flex-grow p-4 overflow-y-auto" },
        React.createElement('div', { className: "space-y-4" },
          messages.map(renderMessage),
          isLoading && renderLoadingIndicator(),
          React.createElement('div', { ref: messagesEndRef })
        )
      ),
      React.createElement('div', { className: "p-4 border-t border-slate-200 dark:border-slate-800 flex-shrink-0" },
        React.createElement('form', { onSubmit: handleSubmit, className: "flex items-center space-x-2" },
          React.createElement('input', {
            type: "text",
            value: input,
            onChange: (e) => setInput(e.target.value),
            placeholder: "Como posso te ajudar?",
            className: "flex-grow p-3 border border-slate-300 dark:border-slate-700 rounded-full bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none",
            disabled: isLoading
          }),
          React.createElement('button', {
            type: "submit",
            disabled: isLoading || !input.trim(),
            className: "w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full transition-colors hover:bg-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
          },
            React.createElement(SendIcon, { className: "w-6 h-6" })
          )
        )
      )
    )
  );
};

export default Chatbot;
