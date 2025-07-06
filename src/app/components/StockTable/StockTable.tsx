"use client";

import { getStockPrice } from "@/app/utils/priceGenerator";
import styles from "./StockTable.module.scss";
import { BaseStock } from "@/app/types";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  basePrice: number;
  beta: number;
}

interface Props {
  day: number;
  baseStocks: BaseStock[];
  onSelectStock: (stock: Stock) => void;
}

export default function StockTable({ day, baseStocks, onSelectStock }: Props) {
  const calculatedStocks = baseStocks.map(base => ({
    ...base,
    price: getStockPrice(base.symbol, day, base.basePrice, base.beta),
  }));

  return (
    <div className={styles.main}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {calculatedStocks.map(stock => (
            <tr key={stock.symbol} onClick={() => onSelectStock(stock)}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>${stock.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
