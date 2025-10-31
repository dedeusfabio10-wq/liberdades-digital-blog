import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.js';
import ErrorBoundary from './components/ErrorBoundary.js';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  React.createElement(React.StrictMode, null, 
    React.createElement(ErrorBoundary, null,
      React.createElement(App, null)
    )
  )
);
