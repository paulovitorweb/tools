import { useMemo, useState } from 'react';
import { ToolLayout } from '../../shared/components/ToolLayout';
import { secureRandomIndex } from '../../shared/random';
import { renderTool } from '../../shared/toolEntry';
import '../sorteios.css';

function App() {
  const [minimum, setMinimum] = useState('1');
  const [maximum, setMaximum] = useState('100');
  const [withoutReplacement, setWithoutReplacement] = useState(true);
  const [history, setHistory] = useState<number[]>([]);
  const min = Number(minimum); const max = Number(maximum);
  const valid = Number.isSafeInteger(min) && Number.isSafeInteger(max) && min <= max && max - min < 1_000_000;
  const available = useMemo(() => valid ? Array.from({ length: max - min + 1 }, (_, index) => min + index).filter(value => !withoutReplacement || !history.includes(value)) : [], [valid, min, max, withoutReplacement, history]);

  function draw() { if (!available.length) return; setHistory(current => [available[secureRandomIndex(available.length)], ...current]); }
  function update(setter: (value: string) => void, value: string) { setter(value); setHistory([]); }

  return <ToolLayout name="Sorteador de números" title={<>Deixe o acaso <em>escolher</em></>} description="Sorteie números inteiros dentro de um intervalo configurável.">
    <div className="form-grid"><div className="form-field"><label htmlFor="minimum">De</label><input id="minimum" type="number" value={minimum} onChange={event => update(setMinimum, event.target.value)} /></div><div className="form-field"><label htmlFor="maximum">Até</label><input id="maximum" type="number" value={maximum} onChange={event => update(setMaximum, event.target.value)} /></div></div>
    <label className="draw-check"><input type="checkbox" checked={withoutReplacement} onChange={event => setWithoutReplacement(event.target.checked)} /> Não repetir números já sorteados</label>
    {!valid && <p className="error-text">Use números inteiros, com o primeiro menor ou igual ao segundo. O intervalo máximo é de 1.000.000 de números.</p>}
    <div className="draw-stage"><span>Resultado</span><strong>{history[0] ?? '—'}</strong><small>{valid && withoutReplacement ? `${available.length} de ${max - min + 1} disponíveis` : valid ? `${max - min + 1} possibilidades` : 'Configure o intervalo'}</small></div>
    <div className="button-row"><button className="primary-button" disabled={!valid || !available.length} onClick={draw}>{!available.length && valid ? 'Todos já foram sorteados' : 'Sortear número'}</button><button className="secondary-button" disabled={!history.length} onClick={() => setHistory([])}>Reiniciar</button></div>
    {!!history.length && <div className="draw-history"><h2>Histórico</h2><div>{history.map((value, index) => <span key={`${index}-${value}`}>{value}</span>)}</div></div>}
  </ToolLayout>;
}
renderTool(<App />);
