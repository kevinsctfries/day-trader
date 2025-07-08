export interface BaseStock {
  symbol: string;
  name: string;
  basePrice: number;
  beta: number;
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
