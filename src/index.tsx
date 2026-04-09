import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App'; // Karena index.tsx dan App.tsx satu level di folder src
import './styles/index.css'; // Sesuaikan path ke folder styles

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Gagal menemukan elemen root.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);