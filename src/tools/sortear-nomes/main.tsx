import { useMemo, useState } from 'react';
import { ToolLayout } from '../../shared/components/ToolLayout';
import { secureRandomIndex } from '../../shared/random';
import { renderTool } from '../../shared/toolEntry';
import '../sorteios.css';

const initialNames = 'Ana\nBruno\nCarla\nDiego';
function uniqueNames(source: string) { const seen = new Set<string>(); return source.split(/\r?\n/).map(name => name.trim()).filter(name => { const key = name.toLocaleLowerCase('pt-BR'); if (!name || seen.has(key)) return false; seen.add(key); return true; }); }

function App() {
  const [source, setSource] = useState(initialNames);
  const [withoutReplacement, setWithoutReplacement] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const names = useMemo(() => uniqueNames(source), [source]);
  const available = useMemo(() => names.filter(name => !withoutReplacement || !history.some(draw => draw.toLocaleLowerCase('pt-BR') === name.toLocaleLowerCase('pt-BR'))), [names, withoutReplacement, history]);
  function draw() { if (!available.length) return; setHistory(current => [available[secureRandomIndex(available.length)], ...current]); }

  return <ToolLayout name="Sorteador de nomes" title={<>Quem será o <em>próximo?</em></>} description="Insira um nome por linha e faça quantos sorteios precisar.">
    <div className="form-field"><label htmlFor="names">Participantes — um nome por linha</label><textarea id="names" value={source} onChange={event => { setSource(event.target.value); setHistory([]); }} placeholder={'Ana\nBruno\nCarla'} /></div>
    <label className="draw-check"><input type="checkbox" checked={withoutReplacement} onChange={event => setWithoutReplacement(event.target.checked)} /> Não repetir nomes já sorteados</label>
    <div className="draw-stage names"><span>Nome sorteado</span><strong>{history[0] ?? '—'}</strong><small>{withoutReplacement ? `${available.length} de ${names.length} participantes disponíveis` : `${names.length} participantes`}</small></div>
    <div className="button-row"><button className="primary-button" disabled={!available.length} onClick={draw}>{!available.length && names.length ? 'Todos já foram sorteados' : 'Sortear nome'}</button><button className="secondary-button" disabled={!history.length} onClick={() => setHistory([])}>Reiniciar</button></div>
    {!!history.length && <div className="draw-history"><h2>Ordem dos sorteios</h2><ol>{history.map((name, index) => <li key={`${index}-${name}`}><span>{history.length - index}º</span><strong>{name}</strong></li>)}</ol></div>}
  </ToolLayout>;
}
renderTool(<App />);
