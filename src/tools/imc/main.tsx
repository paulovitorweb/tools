import { useMemo, useState } from 'react';
import { ToolLayout } from '../../shared/components/ToolLayout';
import { renderTool } from '../../shared/toolEntry';
import './styles.css';

const ranges = [
  { label: 'Abaixo do peso', min: 0, max: 18.5 },
  { label: 'Peso adequado', min: 18.5, max: 25 },
  { label: 'Sobrepeso (pré-obesidade)', min: 25, max: 30 },
  { label: 'Obesidade grau I', min: 30, max: 35 },
  { label: 'Obesidade grau II', min: 35, max: 40 },
  { label: 'Obesidade grau III', min: 40, max: Infinity },
];

const kg = (value: number) => value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function App() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('1.75');
  const result = useMemo(() => {
    const w = Number(weight.replace(',', '.'));
    const h = Number(height.replace(',', '.'));
    if (!w || !h || w <= 0 || h <= 0) return null;
    const value = w / h ** 2;
    return { value, heightSquared: h ** 2, current: ranges.findIndex(range => value >= range.min && value < range.max) };
  }, [weight, height]);

  return <ToolLayout name="Calculadora de IMC" title={<>Calcule seu <em>IMC</em></>} description="Uma referência rápida da relação entre peso e altura para adultos.">
    <div className="form-grid"><div className="form-field"><label htmlFor="weight">Peso (kg)</label><input id="weight" inputMode="decimal" value={weight} onChange={e => setWeight(e.target.value)} /></div><div className="form-field"><label htmlFor="height">Altura (m)</label><input id="height" inputMode="decimal" value={height} onChange={e => setHeight(e.target.value)} /></div></div>
    {result ? <>
      <div className="imc-overview"><div className="result-box"><span>Seu IMC</span><strong className="big">{result.value.toFixed(1)}</strong><p>{ranges[result.current].label}</p></div><div className="result-box ideal"><span>Faixa de peso adequada para sua altura</span><strong className="big">{kg(18.5 * result.heightSquared)}–{kg(24.9 * result.heightSquared)} kg</strong><p>Correspondente a IMC de 18,5 a 24,9.</p></div></div>
      <h2 className="ranges-title">Faixas de peso para sua altura</h2>
      <div className="weight-table" role="table" aria-label="Faixas de peso calculadas"><div className="table-head" role="row"><span>Classificação</span><span>IMC</span><span>Peso</span></div>{ranges.map((range, index) => <div className={index === result.current ? 'current' : ''} role="row" key={range.label}><strong>{range.label}{index === result.current && <small>Você está aqui</small>}</strong><span>{range.max === Infinity ? '≥ 40,0' : range.min === 0 ? '< 18,5' : `${range.min.toFixed(1).replace('.', ',')}–${(range.max - .1).toFixed(1).replace('.', ',')}`}</span><span>{range.max === Infinity ? `≥ ${kg(40 * result.heightSquared)} kg` : range.min === 0 ? `< ${kg(18.5 * result.heightSquared)} kg` : `${kg(range.min * result.heightSquared)}–${kg((range.max - .1) * result.heightSquared)} kg`}</span></div>)}</div>
    </> : <p className="error-text">Informe peso e altura válidos.</p>}
    <div className="imc-reference"><strong>Referência</strong><p>Classificação para adultos da Organização Mundial da Saúde (OMS). O IMC é um indicador de triagem e não mede diretamente a gordura corporal.</p><a href="https://www.who.int/europe/news-room/fact-sheets/item/nutrition---maintaining-a-healthy-lifestyle" target="_blank" rel="noreferrer">Consultar referência da OMS ↗</a></div>
    <p className="imc-disclaimer">Não se aplica da mesma forma a crianças e adolescentes. O resultado não substitui avaliação de um profissional de saúde.</p>
  </ToolLayout>;
}
renderTool(<App />);
