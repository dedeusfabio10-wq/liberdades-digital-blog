import React, { useState, useEffect, useRef } from 'react';
import PlusIcon from './icons/PlusIcon.js';
import TrashIcon from './icons/TrashIcon.js';
import { useModalAccessibility } from '../hooks/useModalAccessibility.js';

const EditQuizzModal = ({ isOpen, onClose, onSave, content, posts }) => {
  const [formData, setFormData] = useState(content);
  const modalRef = useRef(null);

  useModalAccessibility(isOpen, onClose, modalRef);

  useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(content))); 
    }
  }, [content, isOpen]);

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleResultChange = (index, field, value) => {
    setFormData(prev => {
      const newResults = [...prev.results];
      newResults[index] = { ...newResults[index], [field]: value };
      return { ...prev, results: newResults };
    });
  };

  const addResult = () => {
    setFormData(prev => ({
      ...prev,
      results: [...prev.results, { id: `novo-resultado-${Date.now()}`, title: '', description: '' }]
    }));
  };

  const removeResult = (index) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index)
    }));
  };
  
  const handleQuestionChange = (qIndex, value) => {
     setFormData(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[qIndex] = { ...newQuestions[qIndex], questionText: value };
      return { ...prev, questions: newQuestions };
    });
  };
  
  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { id: Date.now(), questionText: '', answers: [] }]
    }));
  };

  const removeQuestion = (qIndex) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== qIndex)
    }));
  };
  
  const handleAnswerChange = (qIndex, aIndex, field, value) => {
    setFormData(prev => {
      const newQuestions = [...prev.questions];
      const newAnswers = [...newQuestions[qIndex].answers];
      newAnswers[aIndex] = { ...newAnswers[aIndex], [field]: value };
      newQuestions[qIndex] = { ...newQuestions[qIndex], answers: newAnswers };
      return { ...prev, questions: newQuestions };
    });
  };
  
  const addAnswer = (qIndex) => {
     setFormData(prev => {
      const newQuestions = [...prev.questions];
      const newAnswers = [...newQuestions[qIndex].answers, { text: '', resultId: formData.results[0]?.id || '' }];
      newQuestions[qIndex] = { ...newQuestions[qIndex], answers: newAnswers };
      return { ...prev, questions: newQuestions };
    });
  };

  const removeAnswer = (qIndex, aIndex) => {
      setFormData(prev => {
      const newQuestions = [...prev.questions];
      const newAnswers = newQuestions[qIndex].answers.filter((_, i) => i !== aIndex);
      newQuestions[qIndex] = { ...newQuestions[qIndex], answers: newAnswers };
      return { ...prev, questions: newQuestions };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  
  if (!isOpen) return null;

  return React.createElement('div', { className: "fixed inset-0 bg-black bg-opacity-50 z-[100] flex justify-center items-center", onClick: onClose },
    React.createElement('div', {
      ref: modalRef,
      className: "bg-white dark:bg-slate-800 rounded-lg p-6 md:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto",
      onClick: e => e.stopPropagation(),
      role: "dialog",
      "aria-modal": "true"
    },
      React.createElement('h2', { className: "text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200" }, "Editar Mini Teste"),
      React.createElement('form', { onSubmit: handleSubmit, className: "space-y-8" },
        // Fieldsets go here...
        React.createElement('fieldset', { className: "border dark:border-slate-700 rounded-md p-4 space-y-4" },
          React.createElement('legend', { className: "px-2 font-semibold text-lg text-slate-700 dark:text-slate-300" }, "Informações Gerais"),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium" }, "Título"),
            React.createElement('input', { name: "title", value: formData.title, onChange: handleGeneralChange, className: "mt-1 w-full p-2 border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md" })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium" }, "Descrição"),
            React.createElement('textarea', { name: "description", value: formData.description, onChange: handleGeneralChange, className: "mt-1 w-full p-2 border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md", rows: 2 })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium" }, "Sub-descrição"),
            React.createElement('textarea', { name: "subDescription", value: formData.subDescription, onChange: handleGeneralChange, className: "mt-1 w-full p-2 border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md", rows: 2 })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: "block text-sm font-medium" }, "Texto do Botão Iniciar"),
            React.createElement('input', { name: "buttonText", value: formData.buttonText, onChange: handleGeneralChange, className: "mt-1 w-full p-2 border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md" })
          )
        ),
        React.createElement('fieldset', { className: "border dark:border-slate-700 rounded-md p-4 space-y-4" },
          React.createElement('legend', { className: "px-2 font-semibold text-lg text-slate-700 dark:text-slate-300" }, "Resultados Possíveis"),
          formData.results.map((result, index) =>
            React.createElement('div', { key: index, className: "p-3 border dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700/50 space-y-3 relative" },
              React.createElement('button', { type: "button", onClick: () => removeResult(index), className: "absolute -top-2 -right-2 p-1 bg-red-100 dark:bg-red-900/50 rounded-full text-red-500 hover:bg-red-200 dark:hover:bg-red-900" }, React.createElement(TrashIcon, { className: "w-4 h-4" })),
              React.createElement('div', null,
                React.createElement('label', { className: "text-sm font-medium" }, "ID do Resultado (único)"),
                React.createElement('input', { value: result.id, onChange: (e) => handleResultChange(index, 'id', e.target.value), className: "mt-1 w-full p-2 border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md", placeholder: "ex: estrategista" })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "text-sm font-medium" }, "Título do Resultado"),
                React.createElement('input', { value: result.title, onChange: (e) => handleResultChange(index, 'title', e.target.value), className: "mt-1 w-full p-2 border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md" })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "text-sm font-medium" }, "Descrição do Resultado"),
                React.createElement('textarea', { value: result.description, onChange: (e) => handleResultChange(index, 'description', e.target.value), className: "mt-1 w-full p-2 border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md", rows: 2 })
              ),
              React.createElement('div', null,
                  React.createElement('label', { className: "text-sm font-medium" }, "Artigo Recomendado (Opcional)"),
                  React.createElement('select', { value: result.recommendedArticleId || '', onChange: (e) => handleResultChange(index, 'recommendedArticleId', Number(e.target.value) || undefined), className: "mt-1 w-full p-2 border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md" },
                      React.createElement('option', { value: "" }, "Nenhum"),
                      posts.map(post => React.createElement('option', { key: post.id, value: post.id }, post.title))
                  )
              )
            )
          ),
          React.createElement('button', { type: "button", onClick: addResult, className: "flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline" }, React.createElement(PlusIcon, { className: "w-4 h-4" }), React.createElement('span', null, "Adicionar Resultado"))
        ),
        React.createElement('fieldset', { className: "border dark:border-slate-700 rounded-md p-4 space-y-4" },
            React.createElement('legend', { className: "px-2 font-semibold text-lg text-slate-700 dark:text-slate-300" }, "Perguntas"),
            formData.questions.map((question, qIndex) =>
                React.createElement('div', { key: qIndex, className: "p-3 border dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700/50 space-y-3 relative" },
                    React.createElement('button', { type: "button", onClick: () => removeQuestion(qIndex), className: "absolute -top-2 -right-2 p-1 bg-red-100 dark:bg-red-900/50 rounded-full text-red-500 hover:bg-red-200 dark:hover:bg-red-900" }, React.createElement(TrashIcon, { className: "w-4 h-4" })),
                    React.createElement('div', null,
                        React.createElement('label', { className: "text-sm font-medium" }, `Texto da Pergunta ${qIndex + 1}`),
                        React.createElement('input', { value: question.questionText, onChange: (e) => handleQuestionChange(qIndex, e.target.value), className: "mt-1 w-full p-2 border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md" })
                    ),
                    React.createElement('div', { className: "pl-4 border-l-2 dark:border-slate-600 space-y-2" },
                        React.createElement('h4', { className: "text-sm font-semibold" }, "Respostas:"),
                        question.answers.map((answer, aIndex) =>
                            React.createElement('div', { key: aIndex, className: "flex items-center space-x-2" },
                                React.createElement('input', { value: answer.text, onChange: (e) => handleAnswerChange(qIndex, aIndex, 'text', e.target.value), placeholder: `Texto da Resposta ${aIndex + 1}`, className: "flex-grow p-2 border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md text-sm" }),
                                React.createElement('select', { value: answer.resultId, onChange: (e) => handleAnswerChange(qIndex, aIndex, 'resultId', e.target.value), className: "p-2 border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md text-sm" },
                                    formData.results.map(r => React.createElement('option', { key: r.id, value: r.id }, r.id))
                                ),
                                React.createElement('button', { type: "button", onClick: () => removeAnswer(qIndex, aIndex), className: "p-1 text-red-500 hover:text-red-700" }, React.createElement(TrashIcon, { className: "w-4 h-4" }))
                            )
                        ),
                        React.createElement('button', { type: "button", onClick: () => addAnswer(qIndex), className: "flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline" }, React.createElement(PlusIcon, { className: "w-3 h-3" }), React.createElement('span', null, "Adicionar Resposta"))
                    )
                )
            ),
            React.createElement('button', { type: "button", onClick: addQuestion, className: "flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline" }, React.createElement(PlusIcon, { className: "w-4 h-4" }), React.createElement('span', null, "Adicionar Pergunta"))
        ),
        React.createElement('div', { className: "mt-8 flex justify-end space-x-4" },
          React.createElement('button', { type: "button", onClick: onClose, className: "px-4 py-2 bg-slate-200 dark:bg-slate-600 rounded-md" }, "Cancelar"),
          React.createElement('button', { type: "submit", className: "px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500" }, "Salvar Alterações")
        )
      )
    )
  );
};

export default EditQuizzModal;
