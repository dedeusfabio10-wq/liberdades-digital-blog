
import React from 'react';
import * as ReactDOM from 'react-dom/client';

// Um componente de teste muito simples.
const DiagnosticComponent = () => {
  return React.createElement('div', {
      style: {
          padding: '40px',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          lineHeight: '1.6',
      }
  },
      React.createElement('h1', { style: { color: '#007BFF' } }, '✅ Teste de Renderização do React bem-sucedido!'),
      React.createElement('p', { style: { fontSize: '1.2rem', color: '#333' } }, 'Se você está vendo esta mensagem, a configuração do seu projeto (index.html e React) está funcionando perfeitamente.'),
      React.createElement('p', { style: { marginTop: '20px', padding: '10px', backgroundColor: '#e8f4fd', border: '1px solid #b3d7f3', borderRadius: '5px' } },
          'Isso é uma ótima notícia! Significa que o erro da "tela branca" está em algum lugar dentro do código principal da sua aplicação (o arquivo ',
          React.createElement('code', { style: { background: '#eee', padding: '2px 5px', borderRadius: '3px' } }, 'App.js'),
          ' ou um dos componentes que ele importa).'
      ),
      React.createElement('p', { style: { marginTop: '10px' } }, 'Agora podemos focar em corrigir o código da aplicação com a certeza de que a base está sólida.')
  );
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 50px;">ERRO CRÍTICO: Não foi possível encontrar o elemento com id="root" no seu HTML.</h1>';
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    React.createElement(React.StrictMode, null,
      React.createElement(DiagnosticComponent, null)
    )
  );
} catch (error) {
  console.error("Erro ao renderizar o React:", error);
  rootElement.innerHTML = `<div style="padding: 20px; background-color: #ffdddd; border: 1px solid red; font-family: sans-serif;">
    <h2 style="color: red;">Falha ao Renderizar o Componente de Teste do React!</h2>
    <p>Isso indica um problema fundamental na configuração do 'importmap' no seu index.html ou na forma como o React está sendo carregado.</p>
    <pre style="white-space: pre-wrap; word-wrap: break-word;">${error.stack}</pre>
  </div>`;
}

