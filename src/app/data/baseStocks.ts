import { BaseStock } from "../types";

// generate a deterministic seed based on day
const DAILY_SEED = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
function getSeededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// generate random numbers in a range with a seed
function getRandomInRange(min: number, max: number, seed: number): number {
  return getSeededRandom(seed) * (max - min) + min;
}

// pick a random trend with a seed
function getRandomTrend(seed: number): "upward" | "downward" | "neutral" {
  const trends: ("upward" | "downward" | "neutral")[] = [
    "upward",
    "downward",
    "neutral",
  ];
  return trends[Math.floor(getSeededRandom(seed) * trends.length)];
}

// base stock data with fixed symbols and names
const stockTemplates: Pick<BaseStock, "symbol" | "name">[] = [
  { symbol: "AMAZ", name: "Amazoom Inc." },
  { symbol: "APPL", name: "Pineapple Technologies" },
  { symbol: "TSLA", name: "Tessela Motors" },
  { symbol: "GOGL", name: "Googolplex Ltd." },
  { symbol: "MSFT", name: "Macrosoft Corporation" },
  { symbol: "META", name: "Metagram Inc." },
  { symbol: "NFLX", name: "Netflux Media" },
  { symbol: "DISN", name: "Diznee Entertainment" },
  { symbol: "NVID", name: "Envidia Chips" },
  { symbol: "BRKB", name: "Brickshire Hathaway" },
];

// generate randomized baseStocks with a seed
function generateBaseStocksWithSeed(seed: number): BaseStock[] {
  return stockTemplates.map((stock, index) => ({
    ...stock,
    basePrice: Number(getRandomInRange(50, 500, seed + index).toFixed(2)),
    beta: Number(getRandomInRange(0.5, 2.0, seed + index + 1000).toFixed(2)),
    trend: getRandomTrend(seed + index + 2000),
  }));
}

// generate randomized baseStocks for resets (using Math.random)
export function generateBaseStocks(): BaseStock[] {
  return stockTemplates.map(stock => ({
    ...stock,
    basePrice: Number((Math.random() * (500 - 50) + 50).toFixed(2)),
    beta: Number((Math.random() * (2.0 - 0.5) + 0.5).toFixed(2)),
    trend: ["upward", "downward", "neutral"][Math.floor(Math.random() * 3)] as
      | "upward"
      | "downward"
      | "neutral",
  }));
}

// init baseStocks with deterministic seed
export const baseStocks: BaseStock[] = generateBaseStocksWithSeed(DAILY_SEED);
