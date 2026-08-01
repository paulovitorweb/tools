import { FormEvent, StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppShell } from '../../shared/components/AppShell';
import { RelatedTools } from '../../shared/components/ToolLayout';
import '../../shared/styles/tokens.css';
import './styles.css';
import { explainCron } from './cronParser';

const EXAMPLES = ['*/15 * * * *', '0 9 * * 1-5', '30 2 1 * *'];
const initialCron = new URLSearchParams(window.location.search).get('cron')?.trim() || '0 9 * * 1-5';

function CronTool() {
  const [input, setInput] = useState(initialCron);
  const [submitted, setSubmitted] = useState(initialCron);
  const result = useMemo(() => {
    try { return { explanation: explainCron(submitted), error: '' }; }
    catch (error) { return { explanation: null, error: error instanceof Error ? error.message : 'Expressão inválida.' }; }
  }, [submitted]);

  function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(input);
    const url = new URL(window.location.href);
    url.searchParams.set('cron', input.trim());
    window.history.replaceState({}, '', url);
  }

  return (
    <AppShell toolName="Leitor de crontab">
      <section className="tool-hero">
        <span className="eyebrow">Leitor de crontab</span>
        <h1>Quando este cron<br /><em>vai executar?</em></h1>
        <p>Cole uma expressão cron e receba uma explicação em português.</p>
      </section>

      <div className="workspace">
        <section className="input-panel" aria-labelledby="input-title">
          <div><span className="step">01</span><h2 id="input-title">Digite a expressão</h2></div>
          <form onSubmit={submit}>
            <label htmlFor="cron">Expressão crontab</label>
            <div className="input-row">
              <input id="cron" value={input} onChange={(event) => setInput(event.target.value)} placeholder="*/15 * * * *" spellCheck="false" autoComplete="off" />
              <button type="submit">Interpretar <span aria-hidden="true">→</span></button>
            </div>
            <div className="field-guide" aria-hidden="true"><span>minuto</span><span>hora</span><span>dia</span><span>mês</span><span>semana</span></div>
          </form>
          <div className="examples"><span>Experimente:</span>{EXAMPLES.map((example) => <button key={example} onClick={() => { setInput(example); setSubmitted(example); }}>{example}</button>)}</div>
        </section>

        <section className={`result-panel ${result.error ? 'has-error' : ''}`} aria-live="polite" aria-labelledby="result-title">
          <div className="result-heading"><span className="step">02</span><h2 id="result-title">Em português</h2></div>
          {result.error ? <p className="error-message">{result.error}</p> : result.explanation && <>
            <p className="summary">{result.explanation.summary}</p>
            <dl>{result.explanation.details.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
          </>}
        </section>
      </div>

      <aside className="privacy-note"><span aria-hidden="true">✓</span><p><strong>Privado por natureza.</strong> A expressão é processada somente neste dispositivo.</p></aside>
      <RelatedTools currentSlug="crontab" />
    </AppShell>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><CronTool /></StrictMode>);
