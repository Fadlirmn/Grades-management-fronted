import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App'; // Diarahkan ke folder app/App.tsx
import './styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Gagal menemukan elemen root. Pastikan ada <div id="root"></div> di index.html');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);