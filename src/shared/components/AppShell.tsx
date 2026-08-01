import type { PropsWithChildren } from 'react';
import './AppShell.css';
import { siteHref } from '../siteLinks';

type AppShellProps = PropsWithChildren<{ toolName?: string }>;

export function AppShell({ children, toolName }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href={siteHref('index.html')} aria-label="Ir para a página inicial">
          <span className="brand-mark" aria-hidden="true">↗</span>
          <span className="brand-name"><span className="brand-owner">paulovitorweb</span><span className="brand-product">tools<span className="brand-dot">.</span></span></span>
        </a>
        {toolName && <span className="tool-label">{toolName}</span>}
      </header>
      <main>{children}</main>
      <footer>Feito para resolver rápido — seus dados não saem do navegador.</footer>
    </div>
  );
}
