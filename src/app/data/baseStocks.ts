import { BaseStock } from "../types";

// generate random numbers in a range
function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// pick a random trend
function getRandomTrend(): "upward" | "downward" | "neutral" {
  const trends: ("upward" | "downward" | "neutral")[] = [
    "upward",
    "downward",
    "neutral",
  ];
  return trends[Math.floor(Math.random() * trends.length)];
}

// baseStock data with fixed symbols and names
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

// generate randomized baseStocks
export const baseStocks: BaseStock[] = stockTemplates.map(stock => ({
  ...stock,
  basePrice: Number(getRandomInRange(50, 500).toFixed(2)),
  beta: Number(getRandomInRange(0.5, 2.0).toFixed(2)),
  trend: getRandomTrend(),
}));
