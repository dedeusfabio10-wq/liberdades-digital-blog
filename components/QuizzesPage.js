import React, { useState, useMemo } from 'react';
import TargetIcon from './icons/TargetIcon.js';
import PostCard from './PostCard.js';
import PencilIcon from './icons/PencilIcon.js';
import EditQuizzModal from './EditQuizzModal.js';

const QuizzesPage = ({ content, onSelectPost, isAdmin = false, onSaveContent = (_content) => {}, allPosts = [] }) => {
  const [quizState, setQuizState] = useState('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finalResult, setFinalResult] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFinalResult(null);
    setQuizState('playing');
  };

  const handleAnswer = (resultId) => {
    const newAnswers = { ...answers };
    newAnswers[resultId] = (newAnswers[resultId] || 0) + 1;
    setAnswers(newAnswers);

    if (currentQuestionIndex < content.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newAnswers);
      setQuizState('finished');
    }
  };

  const calculateResult = (finalAnswers) => {
    if (Object.keys(finalAnswers).length === 0) {
        setFinalResult(content.results[0]);
        return;
    }
    const resultId = Object.keys(finalAnswers).reduce((a, b) => (finalAnswers[a] > finalAnswers[b] ? a : b));
    const result = content.results.find(r => r.id === resultId);
    setFinalResult(result || null);
  };

  const handleRestart = () => {
    setQuizState('start');
  };
  
  const recommendedPost = useMemo(() => {
    if (!finalResult || !finalResult.recommendedArticleId) return null;
    return allPosts.find(post => post.id === finalResult.recommendedArticleId);
  }, [finalResult, allPosts]);

  const renderContent = () => {
    switch (quizState) {
      case 'start':
        return React.createElement('div', { className: "text-center relative" },
          isAdmin && React.createElement('div', { className: "absolute -top-16 right-0 md:-top-8 md:-right-8" },
            React.createElement('button', {
              onClick: () => setIsEditModalOpen(true),
              className: "flex items-center space-x-2 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg shadow-md hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border border-blue-200 dark:border-slate-700 z-10"
            },
              React.createElement(PencilIcon, { className: "w-5 h-5" }),
              React.createElement('span', null, "Editar Teste")
            )
          ),
          React.createElement(TargetIcon, { className: "w-16 h-16 text-blue-500 mx-auto mb-6" }),
          React.createElement('h1', { className: "text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl" }, content.title),
          React.createElement('p', { className: "mt-6 text-xl text-slate-600 dark:text-slate-400" }, content.description),
          React.createElement('p', { className: "mt-4 text-lg text-slate-600 dark:text-slate-400" }, content.subDescription),
          React.createElement('div', { className: "mt-10" },
            React.createElement('button', {
              onClick: handleStartQuiz,
              className: "inline-block rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-all transform hover:scale-105"
            }, content.buttonText)
          )
        );
      
      case 'playing':
        const question = content.questions[currentQuestionIndex];
        const progress = ((currentQuestionIndex + 1) / content.questions.length) * 100;
        return React.createElement('div', { className: "bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 w-full" },
          React.createElement('div', { className: "w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-6" },
            React.createElement('div', { className: "bg-blue-600 h-2.5 rounded-full", style: { width: `${progress}%` } })
          ),
          React.createElement('h2', { className: "text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center" }, question.questionText),
          React.createElement('div', { className: "grid grid-cols-1 gap-4" },
            question.answers.map((answer, index) =>
              React.createElement('button', {
                key: index,
                onClick: () => handleAnswer(answer.resultId),
                className: "w-full text-left p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 transform hover:scale-105"
              },
                React.createElement('span', { className: "text-lg text-slate-700 dark:text-slate-300" }, answer.text)
              )
            )
          )
        );

      case 'finished':
        if (!finalResult) return React.createElement('p', null, "Calculando resultado...");
        return React.createElement('div', { className: "text-center" },
          React.createElement('h1', { className: "text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4" }, finalResult.title),
          React.createElement('p', { className: "text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto" }, finalResult.description),
          recommendedPost && React.createElement('div', { className: "mt-12 text-left" },
            React.createElement('h3', { className: "text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 text-center" }, "Recomendamos este artigo para você:"),
            React.createElement('div', { className: "max-w-md mx-auto" },
              React.createElement(PostCard, { post: recommendedPost, onSelect: onSelectPost, isAdmin: false, onEdit: () => {}, onDelete: () => {} })
            )
          ),
          React.createElement('button', {
            onClick: handleRestart,
            className: "mt-10 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          }, "← Fazer o teste novamente")
        );
      default:
        return null;
    }
  };

  return React.createElement('div', { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-[60vh]" },
    renderContent(),
    isAdmin && React.createElement(EditQuizzModal, {
      isOpen: isEditModalOpen,
      onClose: () => setIsEditModalOpen(false),
      content: content,
      onSave: onSaveContent,
      posts: allPosts
    })
  );
};

export default QuizzesPage;
