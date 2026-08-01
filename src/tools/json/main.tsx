import { useMemo, useState } from 'react';
import { copyText, ToolLayout } from '../../shared/components/ToolLayout';
import { renderTool } from '../../shared/toolEntry';
import './styles.css';

const example = '{"projeto":"utilitários","ativo":true,"ferramentas":["cron","json"],"config":{"tema":"claro","idioma":"pt-BR"}}';

function parseJson(source: string) {
  try {
    return { value: JSON.parse(source) as unknown, error: '' };
  } catch (error) {
    return { value: null, error: error instanceof SyntaxError ? error.message : 'JSON inválido.' };
  }
}

function App() {
  const [source, setSource] = useState(example);
  const [result, setResult] = useState(() => JSON.stringify(JSON.parse(example), null, 2));
  const [indent, setIndent] = useState('2');
  const [copied, setCopied] = useState(false);
  const validation = useMemo(() => parseJson(source), [source]);

  function transform(compact = false) {
    const parsed = parseJson(source);
    if (parsed.error) return;
    const spacing = compact ? undefined : indent === 'tab' ? '\t' : Number(indent);
    setResult(JSON.stringify(parsed.value, null, spacing));
  }

  async function copy() {
    await copyText(result);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return <ToolLayout name="JSON Prettify" title={<>JSON claro e <em>organizado</em></>} description="Valide, formate e compacte documentos JSON sem enviar os dados para fora do navegador.">
    <div className="json-toolbar">
      <div className="form-field indent-field"><label htmlFor="indent">Indentação</label><select id="indent" value={indent} onChange={event => setIndent(event.target.value)}><option value="2">2 espaços</option><option value="4">4 espaços</option><option value="tab">Tabulação</option></select></div>
      <div className="button-row"><button className="primary-button" onClick={() => transform()}>Formatar</button><button className="secondary-button" onClick={() => transform(true)}>Compactar</button><button className="secondary-button" onClick={() => { setSource(''); setResult(''); }}>Limpar</button></div>
    </div>
    <div className="json-status" aria-live="polite">{source.trim() === '' ? <span>Insira um documento JSON.</span> : validation.error ? <span className="invalid">× Inválido: {validation.error}</span> : <span className="valid">✓ JSON válido</span>}</div>
    <div className="json-editors">
      <div className="form-field"><label htmlFor="json-source">JSON original</label><textarea className="mono" id="json-source" value={source} onChange={event => setSource(event.target.value)} spellCheck="false" placeholder='{"chave":"valor"}' /></div>
      <div className="form-field result-editor"><div className="result-label"><label htmlFor="json-result">Resultado</label><button onClick={copy} disabled={!result}>{copied ? 'Copiado ✓' : 'Copiar'}</button></div><textarea className="mono" id="json-result" value={result} readOnly spellCheck="false" /></div>
    </div>
    <p className="json-note">A transformação usa o parser JSON nativo. Números inteiros maiores que <code>Number.MAX_SAFE_INTEGER</code> podem perder precisão; represente-os como texto quando a exatidão for essencial.</p>
  </ToolLayout>;
}

renderTool(<App />);
