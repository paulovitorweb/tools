import type { ReactElement } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';

export function renderTool(element: ReactElement) {
  createRoot(document.getElementById('root')!).render(<StrictMode>{element}</StrictMode>);
}
