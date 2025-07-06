// Helper: deterministic pseudo-random number [0, 1)
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Approximate a normal distribution using the Box-Muller transform with two seeded randoms
function seededNormal(seed: number): number {
  const u1 = seededRandom(seed);
  const u2 = seededRandom(seed + 1);
  return Math.sqrt(-2 * Math.log(u1 + 1e-10)) * Math.cos(2 * Math.PI * u2); // mean=0, std=1
}

/**
 * Generate price for a specific day based on previous day price.
 * @param symbol stock symbol (used for seed)
 * @param day current day (integer)
 * @param basePrice initial price on day 0
 * @param beta volatility factor (>0)
 * @param prevPrice price on day-1
 */
export function getStockPrice(
  symbol: string,
  day: number,
  basePrice: number,
  beta: number,
  prevPrice?: number
): number {
  if (day === 0) return basePrice;

  const seed = symbol.charCodeAt(0) * 1000 + day;
  const drift = 0.0005;
  const volatility = beta * 0.01;
  let dailyReturn = drift + volatility * seededNormal(seed);

  // Small chance for spike or crash (2%)
  const spikeChance = 0.02;
  if (seededRandom(seed + 1000) < spikeChance) {
    // Spike or crash: randomly pick up or down factor between 1.5 and 2 (or 0.5 and 0.7)
    const spikeUp = seededRandom(seed + 2000) < 0.5;
    if (spikeUp) {
      dailyReturn += seededRandom(seed + 3000) * 0.7 + 0.8; // big spike (e.g. +80% to +150%)
    } else {
      dailyReturn -= seededRandom(seed + 3000) * 0.5 + 0.5; // big crash (e.g. -50% to -100%)
    }
  }

  const yesterdayPrice = prevPrice ?? basePrice;
  const todayPrice = yesterdayPrice * Math.exp(dailyReturn);
  return Math.max(todayPrice, 0.01);
}
