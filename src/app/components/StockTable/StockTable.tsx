"use client";

import styles from "./StockTable.module.scss";
import { BaseStock, Stock } from "@/app/types";
import { stockPrice } from "@/app/utils/stocks";

interface Props {
  day: number;
  baseStocks: BaseStock[];
  onSelectStock: (stock: Stock) => void;
}

export default function StockTable({ day, baseStocks, onSelectStock }: Props) {
  const calculatedStocks = stockPrice(baseStocks, day);

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
