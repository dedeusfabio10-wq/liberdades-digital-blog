import React, { useState, useEffect, useRef } from 'react';
import CourseCard from './CourseCard.js';
import PlusIcon from './icons/PlusIcon.js';
import EmptyState from './EmptyState.js';
import ToolIcon from './icons/ToolIcon.js';
import { useModalAccessibility } from '../hooks/useModalAccessibility.js';

const EditCourseModal = ({ isOpen, onClose, onSave, course }) => {
  const [formData, setFormData] = useState({ name: '', description: '', link: '#', cta: '', imageUrl: 'https://picsum.photos/seed/newcourse/400/300' });
  const modalRef = useRef(null);

  useModalAccessibility(isOpen, onClose, modalRef);

  useEffect(() => {
    if (course) {
      setFormData({ name: course.name, description: course.description, link: course.link, cta: course.cta, imageUrl: course.imageUrl });
    } else {
      setFormData({ name: '', description: '', link: '#', cta: 'Saber Mais', imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300` });
    }
  }, [course, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (course) {
      onSave({ ...course, ...formData });
    } else {
      onSave(formData);
    }
    onClose();
  };
  
  return React.createElement('div', { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center", onClick: onClose },
    React.createElement('div', {
      ref: modalRef,
      className: "bg-white dark:bg-slate-800 rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto",
      onClick: e => e.stopPropagation(),
      role: "dialog",
      "aria-modal": "true"
    },
      React.createElement('h2', { className: "text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200" }, course ? 'Editar Curso' : 'Adicionar Novo Curso'),
      React.createElement('form', { onSubmit: handleSubmit, className: "space-y-6" },
        React.createElement('div', null,
          React.createElement('label', { htmlFor: "course-name", className: "block text-sm font-medium text-slate-700 dark:text-slate-300" }, "Nome do Curso"),
          React.createElement('input', { id: "course-name", name: "name", value: formData.name, onChange: handleChange, placeholder: "Ex: Formação em Tráfego Pago", className: "mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm", required: true })
        ),
        React.createElement('div', null,
          React.createElement('label', { htmlFor: "course-description", className: "block text-sm font-medium text-slate-700 dark:text-slate-300" }, "Descrição"),
          React.createElement('textarea', { id: "course-description", name: "description", value: formData.description, onChange: handleChange, placeholder: "Uma breve descrição sobre o curso.", className: "mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm", required: true, rows: 3 })
        ),
        React.createElement('div', null,
          React.createElement('label', { className: "block text-sm font-medium text-slate-700 dark:text-slate-300" }, "Imagem do Curso"),
          React.createElement('div', { className: "mt-1 flex items-center space-x-4 p-3 border border-slate-300 dark:border-slate-600 rounded-md" },
            formData.imageUrl && React.createElement('img', { src: formData.imageUrl, alt: "Pré-visualização", className: "h-20 w-32 object-cover rounded" }),
            React.createElement('div', { className: "flex-grow" },
              React.createElement('input', { type: "file", accept: "image/*", onChange: handleImageChange, className: "block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/50 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900" }),
              React.createElement('p', { className: "text-xs text-slate-500 dark:text-slate-400 mt-1" }, "Tamanho recomendado: 400x300 pixels.")
            )
          )
        ),
        React.createElement('div', null,
          React.createElement('label', { htmlFor: "course-cta", className: "block text-sm font-medium text-slate-700 dark:text-slate-300" }, "Texto do Botão (CTA)"),
          React.createElement('input', { id: "course-cta", name: "cta", value: formData.cta, onChange: handleChange, placeholder: "Ex: Quero Me Inscrever", className: "mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm", required: true })
        ),
        React.createElement('div', null,
          React.createElement('label', { htmlFor: "course-link", className: "block text-sm font-medium text-slate-700 dark:text-slate-300" }, "Link da Página de Vendas"),
          React.createElement('input', { id: "course-link", name: "link", value: formData.link, onChange: handleChange, placeholder: "https://...", className: "mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md shadow-sm", required: true })
        ),
        React.createElement('div', { className: "mt-8 flex justify-end space-x-4" },
          React.createElement('button', { type: "button", onClick: onClose, className: "px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" }, "Cancelar"),
          React.createElement('button', { type: "submit", className: "px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500 transition-colors" }, "Salvar")
        )
      )
    )
  );
};


const CoursesPage = ({ courses, isAdmin, onUpdateCourse, onDeleteCourse, onAddCourse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleSave = (courseData) => {
    if ('id' in courseData) {
      onUpdateCourse(courseData);
    } else {
      onAddCourse(courseData);
    }
  };

  return React.createElement('div', { className: "max-w-7xl mx-auto px-4 sm-px-6 lg:px-8 py-12" },
    React.createElement('div', { className: "flex justify-between items-center mb-12" },
      React.createElement('div', null,
        React.createElement('h1', { className: "text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl" }, "Cursos Recomendados"),
        React.createElement('p', { className: "mt-4 text-lg text-slate-600 dark:text-slate-400" }, "Nossos melhores cursos para te ajudar a construir e escalar seu negócio online.")
      ),
      isAdmin && React.createElement('button', { onClick: handleAdd, className: "flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition-colors" },
        React.createElement(PlusIcon, { className: "w-5 h-5" }),
        React.createElement('span', null, "Novo Curso")
      )
    ),
    courses.length > 0 ? (
      React.createElement('div', { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3" },
        courses.map((course) => React.createElement(CourseCard, { key: course.id, course: course, isAdmin: isAdmin, onEdit: handleEdit, onDelete: onDeleteCourse }))
      )
    ) : (
      React.createElement(EmptyState, {
        title: "Nenhum curso recomendado",
        description: "Adicione cursos e ferramentas para ajudar sua audiência a ter sucesso.",
        action: isAdmin ? { text: 'Adicionar Novo Curso', onClick: handleAdd } : undefined,
        icon: React.createElement(ToolIcon)
      })
    ),
    React.createElement(EditCourseModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onSave: handleSave, course: editingCourse })
  );
};

export default CoursesPage;
