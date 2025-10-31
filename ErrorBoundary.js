
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', { className: "p-8 font-sans text-red-800 bg-red-50 dark:bg-red-900/20 dark:text-red-300 min-h-screen" },
        React.createElement('h1', { className: "text-2xl font-bold mb-4" }, 'Ocorreu um Erro na Aplicação'),
        React.createElement('p', { className: "mb-2" }, 'Um erro de javascript impediu o blog de carregar. Isso geralmente acontece por um erro de sintaxe ou um problema em um dos componentes.'),
        React.createElement('p', { className: "mb-4" }, 'Por favor, envie a mensagem de erro abaixo para que o problema possa ser corrigido:'),
        React.createElement('div', { className: "bg-white dark:bg-slate-800 p-4 rounded-md border border-red-200 dark:border-red-700" },
          this.state.error && React.createElement('pre', { className: "text-sm text-red-900 dark:text-red-200 whitespace-pre-wrap break-all" },
            `Erro: ${this.state.error.toString()}`
          ),
          this.state.errorInfo && this.state.errorInfo.componentStack && React.createElement('pre', { className: "mt-2 text-sm text-red-900 dark:text-red-200 whitespace-pre-wrap break-all font-mono" },
            `Stack de Componentes: ${this.state.errorInfo.componentStack}`
          )
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
