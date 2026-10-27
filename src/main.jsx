import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

/* Tipografías autoalojadas (sin servicios de terceros, sin salto de fuente):
   Sora para los títulos y Figtree para el texto. */
import '@fontsource-variable/sora';
import '@fontsource-variable/figtree';

import './index.css';
import './styles/layout.css';
import './styles/home.css';
import './styles/paginas.css';
import './styles/forms.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
