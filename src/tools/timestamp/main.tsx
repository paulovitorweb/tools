import { useMemo, useState } from 'react';
import { ToolLayout } from '../../shared/components/ToolLayout'; import { renderTool } from '../../shared/toolEntry';

function localValue(date: Date) { const offset = date.getTimezoneOffset() * 60000; return new Date(date.getTime() - offset).toISOString().slice(0, 19); }
function App() {
  const now = new Date(); const [timestamp, setTimestamp] = useState(String(Math.floor(now.getTime()/1000))); const [date, setDate] = useState(localValue(now));
  const fromTimestamp = useMemo(() => { const n = Number(timestamp); if (!Number.isFinite(n)) return null; const d = new Date(n * (Math.abs(n) < 1e12 ? 1000 : 1)); return Number.isNaN(d.getTime()) ? null : d; }, [timestamp]);
  const fromDate = useMemo(() => { const d = new Date(date); return Number.isNaN(d.getTime()) ? null : d; }, [date]);
  return <ToolLayout name="Timestamp Unix" title={<>Timestamp <em>↔</em> data</>} description="Converta segundos ou milissegundos Unix e datas no seu fuso local.">
    <div className="form-grid"><div><div className="form-field"><label htmlFor="ts">Timestamp Unix</label><input className="mono" id="ts" value={timestamp} onChange={e=>setTimestamp(e.target.value)} /></div>{fromTimestamp && <div className="result-box"><strong>{fromTimestamp.toLocaleString('pt-BR')}</strong><p className="mono">{fromTimestamp.toISOString()}</p></div>}</div><div><div className="form-field"><label htmlFor="date">Data e hora local</label><input id="date" type="datetime-local" step="1" value={date} onChange={e=>setDate(e.target.value)} /></div>{fromDate && <div className="result-box"><strong className="big">{Math.floor(fromDate.getTime()/1000)}</strong><p>segundos · {fromDate.getTime()} ms</p></div>}</div></div>
    <div className="button-row"><button className="secondary-button" onClick={()=>{const d=new Date();setTimestamp(String(Math.floor(d.getTime()/1000)));setDate(localValue(d));}}>Usar agora</button></div>
  </ToolLayout>;
} renderTool(<App />);
