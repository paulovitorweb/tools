import type { PropsWithChildren, ReactNode } from 'react';
import { AppShell } from './AppShell';
import { toolHref } from '../siteLinks';
import { relatedTools, TOOL_CATEGORIES, TOOLS } from '../toolsCatalog';
import './ToolLayout.css';

type Props = PropsWithChildren<{ name: string; title: ReactNode; description: string }>;

export function ToolLayout({ name, title, description, children }: Props) {
  const current = TOOLS.find(tool => window.location.pathname.includes(`/tools/${tool.slug}/`));
  return <AppShell toolName={name}>
    <section className="calculator-hero"><span>Ferramenta local</span><h1>{title}</h1><p>{description}</p></section>
    <section className="calculator-card">{children}</section>
    <aside className="local-note">✓ Tudo é processado localmente neste dispositivo.</aside>
    {current && <RelatedTools currentSlug={current.slug} />}
  </AppShell>;
}

export function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const current = TOOLS.find(tool => tool.slug === currentSlug);
  const suggestions = relatedTools(currentSlug);
  const category = TOOL_CATEGORIES.find(item => item.id === current?.category);
  if (!current || !suggestions.length) return null;
  return <section className="related-tools" aria-labelledby="related-tools-title">
    <div className="related-heading"><div><span>Continue explorando</span><h2 id="related-tools-title">Outras ferramentas para você</h2></div></div>
    <div className="related-grid">{suggestions.map(tool => <a href={toolHref(tool.slug)} key={tool.slug}><span className="related-icon" aria-hidden="true">{tool.icon}</span><span><strong>{tool.name}</strong><small>{tool.description}</small></span><b aria-hidden="true">→</b></a>)}</div>
  </section>;
}

export async function copyText(text: string) { await navigator.clipboard.writeText(text); }
