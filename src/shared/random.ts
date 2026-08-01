export function secureRandomIndex(max: number) {
  if (!Number.isSafeInteger(max) || max < 1) throw new Error('O limite do sorteio precisa ser um inteiro positivo.');
  const range = 0x1_0000_0000;
  const limit = range - (range % max);
  const values = new Uint32Array(1);
  do crypto.getRandomValues(values); while (values[0] >= limit);
  return values[0] % max;
}
