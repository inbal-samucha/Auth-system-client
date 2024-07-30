import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Routes>
          <Route path="/*" element={<App />} />
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  //</React.StrictMode> 
);


