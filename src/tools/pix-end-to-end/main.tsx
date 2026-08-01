import { useState } from 'react';
import { copyText, ToolLayout } from '../../shared/components/ToolLayout';
import { renderTool } from '../../shared/toolEntry';
import './styles.css';

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function randomText(length: number) {
  const result: string[] = [];
  const bytes = new Uint8Array(length * 2);
  while (result.length < length) {
    crypto.getRandomValues(bytes);
    for (const byte of bytes) {
      if (byte < 248) result.push(alphabet[byte % alphabet.length]);
      if (result.length === length) break;
    }
  }
  return result.join('');
}

function utcTimestamp(date = new Date()) {
  return date.getUTCFullYear().toString()
    + String(date.getUTCMonth() + 1).padStart(2, '0')
    + String(date.getUTCDate()).padStart(2, '0')
    + String(date.getUTCHours()).padStart(2, '0')
    + String(date.getUTCMinutes()).padStart(2, '0');
}

function generate(ispb: string, count: number) {
  const timestamp = utcTimestamp();
  return Array.from({ length: count }, () => `E${ispb}${timestamp}${randomText(11)}`);
}

function Segment({ value }: { value: string }) {
  return <code className="e2e-code"><span className="prefix">{value.slice(0, 1)}</span><span className="ispb">{value.slice(1, 9)}</span><span className="timestamp">{value.slice(9, 21)}</span><span className="random">{value.slice(21)}</span></code>;
}

function App() {
  const initialIspb = new URLSearchParams(window.location.search).get('ispb') ?? '00360305';
  const [ispb, setIspb] = useState(initialIspb);
  const [count, setCount] = useState(5);
  const [values, setValues] = useState<string[]>(() => /^\d{8}$/.test(initialIspb) ? generate(initialIspb, 5) : []);
  const [copied, setCopied] = useState<string | null>(null);
  const valid = /^\d{8}$/.test(ispb);

  function create() {
    if (!valid) return;
    setValues(generate(ispb, count));
    const url = new URL(window.location.href);
    url.searchParams.set('ispb', ispb);
    window.history.replaceState({}, '', url);
  }

  async function copy(value: string) {
    await copyText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(current => current === value ? null : current), 1400);
  }

  return <ToolLayout name="EndToEndId do Pix" title={<>EndToEndId do <em>Pix</em></>} description="Gere identificadores no formato E + ISPB + data/hora UTC + sequência aleatória.">
    <div className="form-grid"><div className="form-field"><label htmlFor="ispb">ISPB do participante (8 dígitos)</label><input className="mono" id="ispb" inputMode="numeric" maxLength={8} value={ispb} onChange={event => setIspb(event.target.value.replace(/\D/g, '').slice(0, 8))} aria-invalid={!valid} /></div><div className="form-field"><label htmlFor="count">Quantidade (1–100)</label><input id="count" type="number" min="1" max="100" value={count} onChange={event => setCount(Math.min(100, Math.max(1, Number(event.target.value))))} /></div></div>
    {!valid && <p className="error-text">O ISPB deve ter exatamente 8 dígitos.</p>}
    <div className="button-row"><button className="primary-button" disabled={!valid} onClick={create}>Gerar EndToEndIds</button><button className="secondary-button" disabled={!values.length} onClick={() => copyText(values.join('\n'))}>Copiar todos</button></div>
    <div className="e2e-legend"><span className="prefix">Tipo</span><span className="ispb">ISPB</span><span className="timestamp">Data/hora UTC</span><span className="random">Aleatório</span></div>
    <div className="e2e-list">{values.map(value => <div key={value}><Segment value={value} /><button className="secondary-button" onClick={() => copy(value)}>{copied === value ? 'Copiado ✓' : 'Copiar'}</button></div>)}</div>
    <div className="e2e-anatomy"><h2>Como é formado</h2><div><strong>E</strong><span>Identifica um EndToEndId</span></div><div><strong>20018183</strong><span>ISPB do participante</span></div><div><strong>202608011430</strong><span>Data e hora UTC: AAAAMMDDHHMM</span></div><div><strong>aB3xY9kLm2Q</strong><span>11 caracteres alfanuméricos</span></div></div>
    <p className="e2e-warning"><strong>Uso recomendado: desenvolvimento e testes.</strong> Em produção, a geração, responsabilidade e unicidade do identificador devem seguir as regras e o fluxo do PSP participante do Pix.</p>
  </ToolLayout>;
}

renderTool(<App />);
