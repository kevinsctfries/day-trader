export function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getStockPrice(
  symbol: string,
  day: number,
  basePrice: number,
  beta: number
) {
  const seed = symbol.charCodeAt(0) * 1000 + day;
  const r1 = seededRandom(seed);
  const r2 = seededRandom(seed + 1);
  const r3 = seededRandom(seed + 2);
  const volatility = beta * 0.02;
  const change =
    (r1 - 0.5) * 2 * volatility +
    (r2 - 0.5) * 0.5 * volatility +
    (r3 - 0.5) * 0.1 * volatility;
  const longTermTrend = 0.0001 * day;
  const totalChange = 1 + change + longTermTrend;
  const newPrice = basePrice * Math.pow(totalChange, day);
  return Math.max(newPrice, 0.01);
}
