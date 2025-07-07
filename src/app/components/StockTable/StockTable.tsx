"use client";

import styles from "./StockTable.module.scss";
import { BaseStock, Stock } from "@/app/types";
import { stockPrice } from "@/app/utils/stocks";
import { getStockPrice } from "@/app/utils/priceGenerator";
import { TrendingUp, TrendingDown } from "lucide-react";

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
          {calculatedStocks.map(stock => {
            const todayPrice = stock.price;
            const yesterdayPrice =
              day > 0
                ? getStockPrice(
                    stock.symbol,
                    day - 1,
                    stock.basePrice,
                    stock.beta
                  )
                : todayPrice;
            const wentUp = todayPrice > yesterdayPrice;
            const wentDown = todayPrice < yesterdayPrice;

            return (
              <tr key={stock.symbol} onClick={() => onSelectStock(stock)}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>
                  {wentUp && <TrendingUp className={styles.up} />}
                  {wentDown && <TrendingDown className={styles.down} />}$
                  {todayPrice.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
