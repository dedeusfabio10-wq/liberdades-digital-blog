import React, { useState, useEffect, useRef } from 'react';
import { useModalAccessibility } from '../hooks/useModalAccessibility.js';

const emptyForm = {
    title: '',
    excerpt: '',
    imageUrl: 'https://picsum.photos/seed/newpost/600/400',
    videoUrl: '',
    category: '',
    link: '#',
    content: '',
    affiliateImageUrl: '',
    affiliateTitle: '',
    affiliateDescription: '',
    affiliateLink: '',
    affiliateButtonText: '',
};

const EditPostModal = ({ isOpen, onClose, onSave, post }) => {
  const [formData, setFormData] = useState(emptyForm);
  const modalRef = useRef(null);
  
  useModalAccessibility(isOpen, onClose, modalRef);

  useEffect(() => {
    if (post) {
      setFormData({ 
          title: post.title, 
          excerpt: post.excerpt, 
          imageUrl: post.imageUrl, 
          videoUrl: post.videoUrl || '',
          category: post.category, 
          link: post.link, 
          content: post.content,
          affiliateImageUrl: post.affiliateProduct?.imageUrl || '',
          affiliateTitle: post.affiliateProduct?.title || '',
          affiliateDescription: post.affiliateProduct?.description || '',
          affiliateLink: post.affiliateProduct?.link || '',
          affiliateButtonText: post.affiliateProduct?.buttonText || '',
      });
    } else {
      setFormData(emptyForm);
    }
  }, [post, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleMediaChange = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [fieldName]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAffiliateFields = () => {
      setFormData(prev => ({
          ...prev,
          affiliateImageUrl: '',
          affiliateTitle: '',
          affiliateDescription: '',
          affiliateLink: '',
          affiliateButtonText: '',
      }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let affiliateProduct = undefined;
    if(formData.affiliateTitle && formData.affiliateLink && formData.affiliateImageUrl) {
        affiliateProduct = {
            imageUrl: formData.affiliateImageUrl,
            title: formData.affiliateTitle,
            description: formData.affiliateDescription,
            link: formData.affiliateLink,
            buttonText: formData.affiliateButtonText,
        }
    }

    const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        imageUrl: formData.imageUrl,
        videoUrl: formData.videoUrl || undefined,
        category: formData.category,
        link: formData.link,
        content: formData.content,
        affiliateProduct,
    };

    if (post) {
      onSave({ ...post, ...postData });
    } else {
      onSave(postData);
    }
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
      React.createElement('h2', { className: "text-2xl font-bold mb-4" }, post ? 'Editar Artigo' : 'Novo Artigo'),
      React.createElement('form', { onSubmit: handleSubmit, className: "space-y-6" },
        React.createElement('div', { className: "space-y-4 p-4 border rounded-md" },
          React.createElement('h3', { className: "text-lg font-semibold text-gray-800" }, "Conteúdo Principal"),
          // Fields go here...
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium text-gray-700" }, "Título"),
            React.createElement('input', { name: "title", value: formData.title, onChange: handleChange, placeholder: "Título do Artigo", className: "mt-1 w-full p-2 border rounded-md", required: true })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium text-gray-700" }, "Categoria"),
            React.createElement('input', { name: "category", value: formData.category, onChange: handleChange, placeholder: "Ex: Marketing Digital", className: "mt-1 w-full p-2 border rounded-md", required: true })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium text-gray-700" }, "Imagem de Destaque (Miniatura)"),
            React.createElement('div', { className: "mt-1 flex items-center space-x-4 p-2 border rounded-md" },
              formData.imageUrl && React.createElement('img', { src: formData.imageUrl, alt: "Pré-visualização", className: "h-20 w-32 object-cover rounded" }),
              React.createElement('div', { className: "flex-grow" },
                React.createElement('input', { type: "file", accept: "image/*", onChange: (e) => handleMediaChange(e, 'imageUrl'), className: "block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file-font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" }),
                React.createElement('p', { className: "text-xs text-gray-500 mt-1" }, "Sempre visível no card. Tamanho: 600x400.")
              )
            )
          ),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium text-gray-700" }, "Vídeo de Destaque (Opcional)"),
            React.createElement('p', { className: "text-xs text-gray-500 mb-1" }, "Se um vídeo for adicionado, ele substituirá a imagem na página do artigo."),
            React.createElement('div', { className: "mt-1 flex items-center space-x-4 p-2 border rounded-md" },
              formData.videoUrl && React.createElement('video', { src: formData.videoUrl, className: "h-20 w-32 object-cover rounded bg-black" }),
              React.createElement('div', { className: "flex-grow" },
                React.createElement('input', { type: "file", accept: "video/*", onChange: (e) => handleMediaChange(e, 'videoUrl'), className: "block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file-font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" })
              ),
              formData.videoUrl && React.createElement('button', { type: "button", onClick: () => setFormData({ ...formData, videoUrl: '' }), className: "text-sm text-red-600 hover:underline" }, "Remover")
            )
          ),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium text-gray-700" }, "Resumo (Chamada)"),
            React.createElement('textarea', { name: "excerpt", value: formData.excerpt, onChange: handleChange, placeholder: "Um resumo curto e cativante para a lista de artigos.", className: "mt-1 w-full p-2 border rounded-md", required: true, rows: 3 })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium text-gray-700" }, "Conteúdo Completo"),
            React.createElement('textarea', { name: "content", value: formData.content, onChange: handleChange, placeholder: "Escreva o artigo completo aqui.", className: "mt-1 w-full p-2 border rounded-md", required: true, rows: 10 }),
            React.createElement('p', { className: "mt-2 text-xs text-gray-500" },
              "Dica: Use ", React.createElement('code', { className: "font-mono bg-gray-200 p-1 rounded" }, "**negrito**"), ", ",
              React.createElement('code', { className: "font-mono bg-gray-200 p-1 rounded" }, "*itálico*"), ", ",
              React.createElement('code', { className: "font-mono bg-gray-200 p-1 rounded" }, "[links](https://...)"), " e listas (iniciando a linha com ",
              React.createElement('code', { className: "font-mono bg-gray-200 p-1 rounded" }, "-"), ")."
            )
          )
        ),
        React.createElement('details', { className: "border rounded-md" },
          React.createElement('summary', { className: "cursor-pointer p-4 text-lg font-semibold text-gray-800 list-none" }, "Produto Recomendado (Opcional)"),
          React.createElement('div', { className: "p-4 border-t space-y-4" },
            // Affiliate fields go here...
            React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-700" }, "Imagem do Produto"),
                React.createElement('div', { className: "mt-1 flex items-center space-x-4 p-2 border rounded-md" },
                    formData.affiliateImageUrl && React.createElement('img', { src: formData.affiliateImageUrl, alt: "Pré-visualização do produto", className: "h-20 w-20 object-cover rounded" }),
                    React.createElement('div', { className: "flex-grow" },
                        React.createElement('input', { type: "file", accept: "image/*", onChange: (e) => handleMediaChange(e, 'affiliateImageUrl'), className: "block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" }),
                        React.createElement('p', { className: "text-xs text-gray-500 mt-1" }, "Tamanho recomendado: 400x400 pixels.")
                    )
                )
            ),
            React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-700" }, "Título do Produto"),
                React.createElement('input', { name: "affiliateTitle", value: formData.affiliateTitle, onChange: handleChange, placeholder: "Nome do Produto Recomendado", className: "mt-1 w-full p-2 border rounded-md" })
            ),
            React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-700" }, "Descrição do Produto"),
                React.createElement('textarea', { name: "affiliateDescription", value: formData.affiliateDescription, onChange: handleChange, placeholder: "Breve descrição do produto.", className: "mt-1 w-full p-2 border rounded-md", rows: 2 })
            ),
            React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-700" }, "Link de Afiliado"),
                React.createElement('input', { name: "affiliateLink", value: formData.affiliateLink, onChange: handleChange, placeholder: "https://...", className: "mt-1 w-full p-2 border rounded-md" })
            ),
            React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-medium text-gray-700" }, "Texto do Botão"),
                React.createElement('input', { name: "affiliateButtonText", value: formData.affiliateButtonText, onChange: handleChange, placeholder: "Ex: Comprar Agora", className: "mt-1 w-full p-2 border rounded-md" })
            ),
            React.createElement('div', { className: "text-right" },
                React.createElement('button', { type: "button", onClick: clearAffiliateFields, className: "text-sm text-red-600 hover:underline" }, "Remover Produto")
            )
          )
        ),
        React.createElement('div', { className: "mt-6 flex justify-end space-x-4" },
          React.createElement('button', { type: "button", onClick: onClose, className: "px-4 py-2 bg-gray-200 rounded-md" }, "Cancelar"),
          React.createElement('button', { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded-md" }, "Salvar")
        )
      )
    )
  );
};

export default EditPostModal;
