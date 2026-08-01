const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const WEEKDAYS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

type Field = { value: string; min: number; max: number; singular: string; plural: string; names?: string[] };

const isInteger = (value: string) => /^\d+$/.test(value);

function displayValue(value: string, field: Field) {
  const numeric = Number(value);
  if (field.names && isInteger(value)) return field.names[numeric - (field.singular === 'mês' ? 1 : 0)] ?? value;
  return value;
}

function validatePart(part: string, field: Field): boolean {
  const [range, step, extra] = part.split('/');
  if (extra !== undefined || (step !== undefined && (!isInteger(step) || Number(step) < 1))) return false;
  if (range === '*') return true;
  const bounds = range.split('-');
  if (bounds.length > 2 || bounds.some((v) => !isInteger(v))) return false;
  const values = bounds.map(Number);
  return values.every((v) => v >= field.min && v <= field.max) && (values.length === 1 || values[0] <= values[1]);
}

function describeField(field: Field): string {
  const value = field.value;
  if (value === '*') return `todos os ${field.plural}`;
  if (value.startsWith('*/')) return `a cada ${value.slice(2)} ${field.plural}`;
  return value.split(',').map((part) => {
    const [range, step] = part.split('/');
    const [start, end] = range.split('-');
    let result = end
      ? `de ${displayValue(start, field)} até ${displayValue(end, field)}`
      : displayValue(start, field);
    if (step) result += `, a cada ${step} ${field.plural}`;
    return result;
  }).join(', ');
}

export type CronExplanation = { summary: string; details: { label: string; value: string }[] };

export function explainCron(expression: string): CronExplanation {
  const parts = expression.trim().replace(/\s+/g, ' ').split(' ');
  if (parts.length !== 5) throw new Error('Use uma expressão cron com 5 campos: minuto, hora, dia do mês, mês e dia da semana.');

  const fields: Field[] = [
    { value: parts[0], min: 0, max: 59, singular: 'minuto', plural: 'minutos' },
    { value: parts[1], min: 0, max: 23, singular: 'hora', plural: 'horas' },
    { value: parts[2], min: 1, max: 31, singular: 'dia do mês', plural: 'dias do mês' },
    { value: parts[3], min: 1, max: 12, singular: 'mês', plural: 'meses', names: MONTHS },
    { value: parts[4], min: 0, max: 7, singular: 'dia da semana', plural: 'dias da semana', names: [...WEEKDAYS, 'domingo'] },
  ];
  if (fields.some((field) => !field.value.split(',').every((part) => validatePart(part, field)))) {
    throw new Error('Há um valor inválido na expressão. Confira os intervalos e tente novamente.');
  }

  const [minute, hour, day, month, weekday] = fields;
  let timing: string;
  if (minute.value !== '*' && hour.value !== '*' && isInteger(minute.value) && isInteger(hour.value)) {
    timing = `Às ${hour.value.padStart(2, '0')}:${minute.value.padStart(2, '0')}`;
  } else if (minute.value.startsWith('*/') && hour.value === '*') {
    timing = `A cada ${minute.value.slice(2)} minutos`;
  } else {
    timing = `Executa em ${describeField(minute)} e em ${describeField(hour)}`;
  }

  const constraints: string[] = [];
  if (day.value !== '*') constraints.push(`nos dias ${describeField(day)}`);
  if (month.value !== '*') constraints.push(`em ${describeField(month)}`);
  if (weekday.value !== '*') constraints.push(`nos dias da semana: ${describeField(weekday)}`);
  const summary = `${timing}${constraints.length ? `, ${constraints.join(', ')}` : ', todos os dias'}.`;

  return {
    summary,
    details: [
      { label: 'Minuto', value: describeField(minute) },
      { label: 'Hora', value: describeField(hour) },
      { label: 'Dia do mês', value: describeField(day) },
      { label: 'Mês', value: describeField(month) },
      { label: 'Dia da semana', value: describeField(weekday) },
    ],
  };
}
