import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './styles/reset.css';
import './styles/variables.css';
import './styles/typography.css';
import './styles/animations.css';
import './styles/utilities.css';
import './styles/globals.css';
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);