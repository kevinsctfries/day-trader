import { BaseStock } from "../types";
import { getStockPrice } from "./priceGenerator";

export function stockPrice(baseStocks: BaseStock[], day: number) {
  return baseStocks.map(base => ({
    ...base,
    price: getStockPrice(base.symbol, day, base.basePrice, base.beta),
  }));
}
