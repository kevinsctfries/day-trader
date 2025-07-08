import { PortfolioState } from "../types";

export function buyShares(
  state: PortfolioState,
  symbol: string,
  price: number,
  quantity: number
): PortfolioState {
  const cost = price * quantity;
  if (cost > state.cash) throw new Error("Insufficient cash");

  const newCash = state.cash - cost;
  const existing = state.holdings.find(h => h.symbol === symbol);
  const newHoldings = existing
    ? state.holdings.map(h =>
        h.symbol === symbol ? { ...h, shares: h.shares + quantity } : h
      )
    : [...state.holdings, { symbol, shares: quantity }];
  return { cash: newCash, holdings: newHoldings };
}

export function sellShares(
  state: PortfolioState,
  symbol: string,
  price: number,
  quantity: number
): PortfolioState {
  const earnings = price * quantity;
  const newCash = state.cash + earnings;

  const newHoldings = state.holdings
    .map(h => (h.symbol === symbol ? { ...h, shares: h.shares - quantity } : h))
    .filter(h => h.shares > 0);

  return { cash: newCash, holdings: newHoldings };
}

export function netWorth(
  state: PortfolioState,
  currentPrices: Record<string, number>
): number {
  return (
    state.cash +
    state.holdings.reduce(
      (sum, h) => sum + (currentPrices[h.symbol] || 0) * h.shares,
      0
    )
  );
}
