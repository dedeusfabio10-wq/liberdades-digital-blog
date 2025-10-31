import React, { useState } from 'react';

const NewsletterSignup = ({ isAdmin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, subject: 'Nova inscrição na Newsletter - Liberdade Digital' }),
      });
      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        setError('Ocorreu um erro ao enviar. Por favor, tente novamente mais tarde.');
      }
    } catch (err) {
      setError('Ocorreu um erro de rede. Por favor, verifique sua conexão.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderForm = () => {
    return React.createElement(React.Fragment, null,
      React.createElement('h2', { className: "text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-200 sm:text-4xl" }, "Junte-se à nossa comunidade"),
      React.createElement('p', { className: "mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400" }, "Receba dicas exclusivas, estratégias e ferramentas direto no seu e-mail para acelerar sua jornada."),
      React.createElement('form', { onSubmit: handleSubmit, className: "mt-6" },
        React.createElement('div', { className: "flex max-w-md mx-auto gap-x-4" },
          React.createElement('label', { htmlFor: "email-address", className: "sr-only" }, "Endereço de e-mail"),
          React.createElement('input', {
            id: "email-address",
            name: "email",
            type: "email",
            autoComplete: "email",
            required: true,
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "min-w-0 flex-auto rounded-md border-0 bg-white dark:bg-slate-700/50 px-3.5 py-2 text-slate-800 dark:text-slate-200 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 sm:text-sm sm:leading-6",
            placeholder: "Digite seu melhor e-mail"
          }),
          React.createElement('button', {
            type: "submit",
            disabled: submitting,
            className: "flex-none rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-all transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none"
          }, submitting ? 'Enviando...' : 'Inscrever')
        ),
        error && React.createElement('p', { className: "mt-4 text-sm text-red-600 dark:text-red-400" }, error),
        FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID') && isAdmin && React.createElement('p', { className: "mt-4 text-xs text-slate-500 bg-yellow-100 border border-yellow-300 p-2 rounded-md max-w-md mx-auto" },
            React.createElement('b', null, "Atenção Admin: "), "A funcionalidade de envio de e-mail está desativada. Configure o `FORMSPREE_ENDPOINT` em `components/NewsletterSignup.js` para ativá-la."
        )
      )
    );
  };

  const renderSuccess = () => {
    return React.createElement('div', null,
      React.createElement('h2', { className: "text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-200 sm:text-4xl" }, "Obrigado por se inscrever!"),
      React.createElement('p', { className: "mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400" }, "Fique de olho na sua caixa de entrada para receber nossas melhores dicas.")
    );
  };

  return React.createElement('div', { className: "bg-slate-100 dark:bg-slate-800/50 rounded-lg p-8 my-12 border border-slate-200 dark:border-slate-800" },
    React.createElement('div', { className: "max-w-2xl mx-auto text-center" },
      submitted ? renderSuccess() : renderForm()
    )
  );
};

export default NewsletterSignup;
