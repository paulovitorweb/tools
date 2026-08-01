export const TOOL_CATEGORIES = [
  { id: 'dev', name: 'Desenvolvimento', description: 'Conversores e utilitários para o dia a dia técnico.' },
  { id: 'text', name: 'Texto e conteúdo', description: 'Escreva, compare e analise conteúdo.' },
  { id: 'draw', name: 'Geradores e sorteios', description: 'Gere valores seguros ou deixe o acaso escolher.' },
  { id: 'health', name: 'Saúde', description: 'Cálculos de referência para bem-estar.' },
] as const;

export type ToolCategory = typeof TOOL_CATEGORIES[number]['id'];
export type ToolDefinition = { icon: string; name: string; description: string; slug: string; category: ToolCategory };

export const TOOLS: ToolDefinition[] = [
  { icon: '⌁', name: 'Leitor de crontab', description: 'Traduza expressões cron para português claro.', slug: 'crontab', category: 'dev' },
  { icon: '◷', name: 'Timestamp Unix', description: 'Converta timestamps e datas nos dois sentidos.', slug: 'timestamp', category: 'dev' },
  { icon: '{·}', name: 'JWT Decoder', description: 'Inspecione header e payload de tokens JWT.', slug: 'jwt', category: 'dev' },
  { icon: '⌗', name: 'Gerador de hashes', description: 'MD5, SHA-1, SHA-256 e SHA-512 localmente.', slug: 'hashes', category: 'dev' },
  { icon: '{ }', name: 'JSON Prettify', description: 'Valide, formate ou compacte documentos JSON.', slug: 'json', category: 'dev' },
  { icon: '±', name: 'Diff de textos', description: 'Compare dois textos linha a linha.', slug: 'diff', category: 'text' },
  { icon: '¶', name: 'Lorem ipsum', description: 'Gere parágrafos, frases ou palavras de exemplo.', slug: 'lorem', category: 'text' },
  { icon: 'A', name: 'Contador de caracteres', description: 'Conte caracteres, palavras, linhas e bytes.', slug: 'caracteres', category: 'text' },
  { icon: '#', name: 'Gerador de UUID', description: 'Gere UUIDs v4 seguros e prontos para copiar.', slug: 'uuid', category: 'draw' },
  { icon: '✦', name: 'Gerador de senhas', description: 'Crie senhas fortes com opções personalizadas.', slug: 'senhas', category: 'draw' },
  { icon: '123', name: 'Sorteador de números', description: 'Sorteie números em um intervalo, com ou sem repetição.', slug: 'sortear-numeros', category: 'draw' },
  { icon: 'Aa', name: 'Sorteador de nomes', description: 'Cole uma lista e sorteie os participantes.', slug: 'sortear-nomes', category: 'draw' },
  { icon: 'K', name: 'Calculadora Kafka', description: 'Estime tráfego e armazenamento para retenção.', slug: 'kafka', category: 'dev' },
  { icon: 'E2E', name: 'EndToEndId do Pix', description: 'Gere identificadores no formato usado pelo Pix.', slug: 'pix-end-to-end', category: 'dev' },
  { icon: '◒', name: 'Calculadora de IMC', description: 'Calcule o índice e confira a faixa de referência.', slug: 'imc', category: 'health' },
];

export function relatedTools(currentSlug: string, minimum = 3) {
  const current = TOOLS.find(tool => tool.slug === currentSlug);
  if (!current) return [];
  const sameCategory = TOOLS.filter(tool => tool.slug !== currentSlug && tool.category === current.category);
  const currentIndex = TOOLS.indexOf(current);
  const rotated = [...TOOLS.slice(currentIndex + 1), ...TOOLS.slice(0, currentIndex)]
    .filter(tool => tool.slug !== currentSlug && !sameCategory.includes(tool));
  return [...sameCategory, ...rotated].slice(0, minimum);
}
