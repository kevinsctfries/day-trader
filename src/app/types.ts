export interface BaseStock {
  symbol: string;
  name: string;
  basePrice: number;
  beta: number;
  trend: "upward" | "downward" | "neutral";
}

export interface Stock extends BaseStock {
  price: number;
}

export interface Holding {
  symbol: string;
  shares: number;
}

export interface PortfolioState {
  cash: number;
  holdings: Holding[];
}
