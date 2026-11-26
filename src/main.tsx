import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/foundation.css';
import './styles/typography.css';
import './styles/tokens.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main>Odea Cards Storybook</main>
  </StrictMode>,
);
