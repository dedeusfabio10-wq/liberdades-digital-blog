import React, { useState, useEffect, useRef } from 'react';
import { useModalAccessibility } from '../hooks/useModalAccessibility.js';

const EditHomePageModal = ({ isOpen, onClose, onSave, content }) => {
  const [formData, setFormData] = useState(content);
  const modalRef = useRef(null);
  
  useModalAccessibility(isOpen, onClose, modalRef);

  useEffect(() => {
    if (isOpen) {
      setFormData(content);
    }
  }, [content, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, backgroundImage: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return React.createElement('div', { className: "fixed inset-0 bg-black bg-opacity-50 z-[100] flex justify-center items-center", onClick: onClose },
    React.createElement('div', {
      ref: modalRef,
      className: "bg-white rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto",
      onClick: e => e.stopPropagation(),
      role: "dialog",
      "aria-modal": "true"
    },
      React.createElement('h2', { className: "text-2xl font-bold mb-6" }, "Editar Página Inicial"),
      React.createElement('form', { onSubmit: handleSubmit, className: "space-y-6" },
        React.createElement('div', { className: "p-4 border rounded-md space-y-4" },
          React.createElement('h3', { className: "text-lg font-semibold text-gray-800" }, "Conteúdo do Título"),
          React.createElement('div', null,
            React.createElement('label', { htmlFor: "title", className: "block text-sm font-medium text-gray-700" }, "Título Principal"),
            React.createElement('input', { type: "text", name: "title", id: "title", value: formData.title, onChange: handleChange, className: "mt-1 w-full p-2 border rounded-md" }),
            React.createElement('p', { className: "text-xs text-gray-500 mt-1" }, "Use colchetes para destacar uma parte, ex: Conquiste sua [Liberdade Digital]")
          ),
          React.createElement('div', null,
            React.createElement('label', { htmlFor: "subtitle", className: "block text-sm font-medium text-gray-700" }, "Subtítulo"),
            React.createElement('textarea', { name: "subtitle", id: "subtitle", value: formData.subtitle, onChange: handleChange, className: "mt-1 w-full p-2 border rounded-md", rows: 3 })
          )
        ),
        React.createElement('div', { className: "p-4 border rounded-md space-y-4" },
          React.createElement('h3', { className: "text-lg font-semibold text-gray-800" }, "Estilo e Cores"),
          React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-4" },
            React.createElement('div', null,
              React.createElement('label', { htmlFor: "titleColor", className: "block text-sm font-medium text-gray-700" }, "Cor do Título"),
              React.createElement('input', { type: "color", name: "titleColor", id: "titleColor", value: formData.titleColor, onChange: handleChange, className: "mt-1 w-full h-10 p-1 border rounded-md" })
            ),
            React.createElement('div', null,
              React.createElement('label', { htmlFor: "subtitleColor", className: "block text-sm font-medium text-gray-700" }, "Cor do Subtítulo"),
              React.createElement('input', { type: "color", name: "subtitleColor", id: "subtitleColor", value: formData.subtitleColor, onChange: handleChange, className: "mt-1 w-full h-10 p-1 border rounded-md" })
            ),
            React.createElement('div', null,
              React.createElement('label', { htmlFor: "backgroundColor", className: "block text-sm font-medium text-gray-700" }, "Cor de Fundo (Seção)"),
              React.createElement('input', { type: "color", name: "backgroundColor", id: "backgroundColor", value: formData.backgroundColor, onChange: handleChange, className: "mt-1 w-full h-10 p-1 border rounded-md" })
            )
          ),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium text-gray-700" }, "Imagem de Fundo (Seção)"),
            React.createElement('div', { className: "mt-1 flex items-center space-x-4 p-2 border rounded-md" },
              formData.backgroundImage && React.createElement('img', { src: formData.backgroundImage, alt: "Pré-visualização", className: "h-20 w-32 object-cover rounded" }),
              React.createElement('div', { className: "flex-grow" },
                React.createElement('input', { type: "file", accept: "image/*", onChange: handleImageChange, className: "block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" })
              ),
              formData.backgroundImage && React.createElement('button', { type: "button", onClick: () => setFormData({ ...formData, backgroundImage: '' }), className: "text-sm text-red-600 hover:underline" }, "Remover")
            )
          )
        ),
        React.createElement('div', { className: "mt-6 flex justify-end space-x-4" },
          React.createElement('button', { type: "button", onClick: onClose, className: "px-4 py-2 bg-gray-200 rounded-md" }, "Cancelar"),
          React.createElement('button', { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded-md" }, "Salvar Alterações")
        )
      )
    )
  );
};

export default EditHomePageModal;
