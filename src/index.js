import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { AuthStateProvider } from './state/AuthState';
import { SocketProvider } from './providers/Socket';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <AuthStateProvider>
          <App/>
        </AuthStateProvider>
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
