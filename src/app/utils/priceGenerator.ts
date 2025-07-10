import { BaseStock } from "../types";

// generates a random session ID when the module loads
const GAME_SESSION_ID = Math.floor(Math.random() * 1000000);

const priceHistory = new Map<string, number[]>();

// generates a pseudo-random number between 0 and 1 using a seed
function generateRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// generates a normally distributed random number using Box-Muller transform
function generateNormalRandom(seed: number): number {
  const u1 = generateRandom(seed);
  const u2 = generateRandom(seed + 1);
  return Math.sqrt(-2 * Math.log(u1 + 1e-10)) * Math.cos(2 * Math.PI * u2);
}

// converts a stock symbol to a unique seed value
function hashSymbol(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0x7fffffff;
  }
  return hash;
}

// computes the stock price for a specific day, storing it in priceHistory
export function computeStockPrice(
  symbol: string,
  day: number,
  basePrice: number,
  beta: number,
  trend: "upward" | "downward" | "neutral" = "neutral"
): number {
  // init price history if not present
  if (!priceHistory.has(symbol)) {
    priceHistory.set(symbol, [basePrice]);
  }

  const history = priceHistory.get(symbol)!;

  // compute prices up to the requested day if necessary
  while (history.length <= day) {
    const currentDay = history.length;
    const prevPrice = history[currentDay - 1];

    if (currentDay === 0) {
      history.push(basePrice);
      continue;
    }

    const seed = GAME_SESSION_ID + hashSymbol(symbol) + currentDay;
    const volatility = beta * 0.01;

    // change drift based on trend
    let drift = 0.0005;
    if (trend === "upward") drift += 0.01;
    else if (trend === "downward") drift -= 0.01;

    let dailyReturn = drift + volatility * generateNormalRandom(seed);

    // 2% chance for spike/crash to occur
    const spikeChance = 0.02;
    if (generateRandom(seed + 1000) < spikeChance) {
      const spikeUp = generateRandom(seed + 2000) < 0.5;
      if (spikeUp) {
        dailyReturn += generateRandom(seed + 3000) * 0.7 + 0.8; // Big spike (+80% to +150%)
      } else {
        dailyReturn -= generateRandom(seed + 3000) * 0.5 + 0.5; // Big crash (-50% to -100%)
      }
    }

    const yesterdayPrice = prevPrice;
    const todayPrice = yesterdayPrice * Math.exp(dailyReturn);
    history.push(parseFloat(Math.max(todayPrice, 0.01).toFixed(2)));
  }

  return history[day];
}

// returns the price history for a stock up to the specified day
export function getPriceHistory(
  symbol: string,
  currentDay: number,
  basePrice: number,
  beta: number,
  trend: "upward" | "downward" | "neutral" = "neutral"
): number[] {
  computeStockPrice(symbol, currentDay, basePrice, beta, trend);
  return priceHistory.get(symbol)!.slice(0, currentDay + 1);
}

// computes prices for multiple stocks on a specific day
export function computeStocksPrices(baseStocks: BaseStock[], day: number) {
  return baseStocks.map(base => ({
    ...base,
    price: computeStockPrice(
      base.symbol,
      day,
      base.basePrice,
      base.beta,
      base.trend ?? "neutral"
    ),
  }));
}
