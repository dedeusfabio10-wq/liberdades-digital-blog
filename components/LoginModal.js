import React, { useState, useEffect, useRef } from 'react';
import { useModalAccessibility } from '../hooks/useModalAccessibility.js';

const LoginModal = ({ isOpen, onClose, onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const modalRef = useRef(null);
  
  useModalAccessibility(isOpen, onClose, modalRef);

  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return React.createElement('div', { className: "fixed inset-0 bg-black bg-opacity-60 z-[100] flex justify-center items-center", onClick: onClose },
    React.createElement('div', {
      ref: modalRef,
      className: "bg-white rounded-lg p-8 w-full max-w-sm",
      onClick: e => e.stopPropagation(),
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "login-title"
    },
      React.createElement('h2', { id: "login-title", className: "text-2xl font-bold mb-6 text-center text-slate-800" }, "Acesso Restrito"),
      React.createElement('form', { onSubmit: handleSubmit, className: "space-y-6" },
        React.createElement('div', null,
          React.createElement('label', { htmlFor: "username", className: "block text-sm font-medium text-gray-700" }, "Usuário"),
          React.createElement('input', {
            id: "username",
            name: "username",
            type: "text",
            value: username,
            onChange: e => setUsername(e.target.value),
            required: true,
            className: "mt-1 w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          })
        ),
        React.createElement('div', null,
          React.createElement('label', { htmlFor: "password", className: "block text-sm font-medium text-gray-700" }, "Senha"),
          React.createElement('input', {
            id: "password",
            name: "password",
            type: "password",
            value: password,
            onChange: e => setPassword(e.target.value),
            required: true,
            className: "mt-1 w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          })
        ),
        error && React.createElement('p', { className: "text-sm text-red-600 text-center" }, error),
        React.createElement('div', { className: "flex items-center justify-between pt-2" },
          React.createElement('button', {
            type: "button",
            onClick: onClose,
            className: "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          }, "Cancelar"),
          React.createElement('button', {
            type: "submit",
            className: "px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
          }, "Entrar")
        )
      )
    )
  );
};

export default LoginModal;
