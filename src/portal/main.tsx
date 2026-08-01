import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppShell } from '../shared/components/AppShell';
import { toolHref } from '../shared/siteLinks';
import { TOOL_CATEGORIES, TOOLS } from '../shared/toolsCatalog';
import '../shared/styles/tokens.css';
import './portal.css';

function ToolCard({ tool }: { tool: typeof TOOLS[number] }) {
  return <a className="tool-card" href={toolHref(tool.slug)}>
    <span className="card-icon" aria-hidden="true">{tool.icon}</span>
    <span><strong>{tool.name}</strong><small>{tool.description}</small></span>
    <span className="card-arrow" aria-hidden="true">→</span>
  </a>;
}

function Portal() {
  return <AppShell>
    <section className="portal-hero"><span className="eyebrow">Ferramentas úteis, sem complicação</span><h1>Pequenos utilitários.<br />Grandes atalhos.</h1><p>Tudo funciona localmente no navegador. Sem cadastro, sem enviar seus dados para um servidor.</p></section>
    <section aria-labelledby="tools-title">
      <div className="section-title"><h2 id="tools-title">Ferramentas</h2><span>{TOOLS.length} disponíveis</span></div>
      <div className="category-list">{TOOL_CATEGORIES.map(category => {
        const tools = TOOLS.filter(tool => tool.category === category.id);
        return <section className="tool-category" key={category.id} aria-labelledby={`category-${category.id}`}><div className="category-heading"><div><h3 id={`category-${category.id}`}>{category.name}</h3><p>{category.description}</p></div><span>{tools.length}</span></div><div className="tool-grid">{tools.map(tool => <ToolCard tool={tool} key={tool.slug} />)}</div></section>;
      })}</div>
    </section>
  </AppShell>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><Portal /></StrictMode>);
