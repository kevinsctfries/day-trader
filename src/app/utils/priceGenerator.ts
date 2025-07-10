import { BaseStock } from "../types";

// generates a random session ID when the module loads
const GAME_SESSION_ID = Math.floor(Math.random() * 1000000);

const priceHistory = new Map<string, number[]>();

// generates psuedo-random number
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// approximate a normal distribution using the Box-Muller transform with two seeded randoms
function seededNormal(seed: number): number {
  const u1 = seededRandom(seed);
  const u2 = seededRandom(seed + 1);
  return Math.sqrt(-2 * Math.log(u1 + 1e-10)) * Math.cos(2 * Math.PI * u2);
}

export function getStockPrice(
  symbol: string,
  day: number,
  basePrice: number,
  beta: number,
  prevPrice?: number,
  trend: "upward" | "downward" | "neutral" = "neutral"
): number {
  if (day === 0) return basePrice;

  // include session ID to make each game session unique
  const seed = GAME_SESSION_ID + symbol.charCodeAt(0) * 1000 + day;
  const volatility = beta * 0.01;

  // adjust drift based on trend
  let drift = 0.0005;
  if (trend === "upward") drift += 0.002;
  else if (trend === "downward") drift -= 0.002;

  let dailyReturn = drift + volatility * seededNormal(seed);

  // small chance for spike or crash (2%)
  const spikeChance = 0.02;
  if (seededRandom(seed + 1000) < spikeChance) {
    // randomly pick up or down factor between 1.5 and 2 (or 0.5 and 0.7)
    const spikeUp = seededRandom(seed + 2000) < 0.5;
    if (spikeUp) {
      dailyReturn += seededRandom(seed + 3000) * 0.7 + 0.8; // big spike (e.g. +80% to +150%)
    } else {
      dailyReturn -= seededRandom(seed + 3000) * 0.5 + 0.5; // big crash (e.g. -50% to -100%)
    }
  }

  const yesterdayPrice = prevPrice ?? basePrice;
  const todayPrice = yesterdayPrice * Math.exp(dailyReturn);
  return parseFloat(Math.max(todayPrice, 0.01).toFixed(2));
}

export function getStockPriceForDay(
  symbol: string,
  day: number,
  basePrice: number,
  beta: number,
  trend: "upward" | "downward" | "neutral" = "neutral"
): number {
  if (!priceHistory.has(symbol)) {
    priceHistory.set(symbol, [basePrice]);
  }

  const history = priceHistory.get(symbol)!;

  while (history.length <= day) {
    const currentDay = history.length;
    const prevPrice = history[currentDay - 1];
    const price = getStockPrice(
      symbol,
      currentDay,
      basePrice,
      beta,
      prevPrice,
      trend
    );
    history.push(price);
  }

  return history[day];
}

export function getStockPriceHistory(
  symbol: string,
  currentDay: number,
  basePrice: number,
  beta: number,
  trend: "upward" | "downward" | "neutral" = "neutral"
): number[] {
  getStockPriceForDay(symbol, currentDay, basePrice, beta, trend);

  const history = priceHistory.get(symbol)!;
  return history.slice(0, currentDay + 1);
}

export function stockPrice(baseStocks: BaseStock[], day: number) {
  return baseStocks.map(base => ({
    ...base,
    price: getStockPriceForDay(
      base.symbol,
      day,
      base.basePrice,
      base.beta,
      base.trend ?? "neutral"
    ),
  }));
}
